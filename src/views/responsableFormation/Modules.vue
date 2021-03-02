<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="modules"
      class="elevation-1"
      hide-default-footer
      disable-pagination
    >
      <template v-slot:top>
        <br />
        <SelectPromo @updateSelectedPromotion="fetchModules" />
        <v-toolbar flat>
          <v-toolbar-title>Modules</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nouveau module
              </v-btn>
            </template>
            <v-card>
              <v-form ref="form" v-model="valid">
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.nom"
                          label="Nom"
                          :rules="[(v) => !!v || 'Champ obligatoire']"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-select
                          v-model="editedItem.semestre"
                          label="Semestre"
                          :items="semestres"
                          item-text="nom"
                          item-value="id"
                          :rules="[(v) => !!v || 'Champ obligatoire']"
                          return-object
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.ects"
                          label="ECTS"
                          :rules="[
                            (v) => !!v || 'Champ obligatoire',
                            (v) => (v >= 0 && v <= 999) || 'Nombre seulement',
                          ]"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4"> </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Annuler
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                    :disabled="!valid"
                  >
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Etes vous sur de vouloir supprimer ce module ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary"> Reset </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SelectPromo from "../../components/SelectPromo";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nom module",
        align: "start",
        sortable: false,
        value: "nom",
      },
      { text: "Semestre", value: "semestre.name" },
      { text: "ECTS", value: "ects" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nom: "",
      semestre: "",
      ects: "",
    },
    defaultItem: {},
    valid: true,
  }),
  components: {
    SelectPromo,
  },
  computed: {
    ...mapGetters({
      modules: "UeMatieres/getModulesForDisplaying",
    }),
    ...mapState({
      semestres: (state) => state.semestres.semestres,
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Nouveau module" : "Edition module";
    },
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.modules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.modules.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("UeMatieres/deleteModule", {
        editedIndex: this.editedIndex,
        editedId: this.editedItem.id,
      });
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.$refs.form.validate();
      if (this.editedIndex > -1) {
        this.$store.dispatch("UeMatieres/editModule", {
          moduleIndex: this.editedIndex,
          module: this.editedItem,
        });
      } else {
        this.$store.dispatch("UeMatieres/addModule", this.editedItem);
      }
      this.close();
    },
    fetchModules: function (selectedPromotion) {
      if (Number.isInteger(selectedPromotion) && selectedPromotion != -1) {
        this.$store.dispatch(
          "UeMatieres/getModuleByPromotion",
          selectedPromotion
        );
        this.$store.dispatch("semestres/fetch", selectedPromotion);
      }
    },
  },
};
</script>
