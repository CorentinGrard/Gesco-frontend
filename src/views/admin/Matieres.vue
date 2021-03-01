<template>
  <v-data-table
    :headers="headers"
    :items="matieres"
    class="elevation-1"
    hide-default-footer
    disable-pagination
  >
    <template v-slot:top>
      <br />
      <SelectPromo @updateSelectedPromotion="fetchMatieres" />
      <v-toolbar flat>
        <v-toolbar-title>Matières</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>

        <v-spacer></v-spacer>

        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Nouvelle matière
            </v-btn>
          </template>
          <v-card>
            <v-form
              ref="form"
              v-model="valid"
              >
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
                      :rules="[v => !!v || 'Champ obligatoire']"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.module"
                      label="Module"
                      :items="module"
                      item-text="nom"
                      item-value="id"
                      :rules="[v => !!v || 'Champ obligatoire']"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.coefficient"
                      label="Coefficient"
                      :rules="[v => !!v || 'Champ obligatoire',v => v >= 0 && v <= 999|| 'Nombre seulement',]"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.intervenant"
                      label="Intervenant"
                      :rules="[v => !!v || 'Champ obligatoire']"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.nombreHeuresAPlacer"
                      label="Nombre d'heures de cours"
                      :rules="[v => !!v || 'Champ obligatoire',v => v >= 0 && v <= 999|| 'Nombre seulement',]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Annuler
              </v-btn>
              <v-btn color="blue darken-1" text @click="save" :disabled="!valid">
                Sauvegarder
              </v-btn>
            </v-card-actions>
            </v-form>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Etes vous sur de vouloir supprimer cette matière ?</v-card-title
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
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters } from "vuex";
import SelectPromo from "../../components/SelectPromo";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Nom matière",
        align: "start",
        sortable: false,
        value: "nom",
      },
      { text: "Module", value: "module.name" },
      { text: "Coefficient", value: "coefficient" },
      { text: "Intervenant", value: "intervenant" },
      { text: "Nombre heure de cours", value: "nombreHeuresAPlacer" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      module: "",
      coefficient: "",
      intervenant: "",
    },
    defaultItem: {
      name: "",
      module: "",
      coefficient: "",
      intervenant: "",
    },
  }),
      valid: true,

  components: {
    SelectPromo,
  },
  computed: {
    ...mapGetters({
      matieres: "UeMatieres/getMatieresForDisplaying",
      module: "UeMatieres/getModulesForDisplaying",
    }),
    formTitle() {
      return this.editedIndex === -1 ? "Nouvelle matière" : "Edition matière";
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
      this.editedIndex = this.matieres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.matieres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("UeMatieres/deleteMatiere", {editedId : this.editedItem.id, editedIndex: this.editedIndex});
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
      if (this.editedIndex > -1) {
        this.$store.dispatch("UeMatieres/editMatiere", {
          matiereIndex: this.editedIndex,
          matiere: this.editedItem,
        });
      } else {
        this.$store.dispatch("UeMatieres/addMatiere", this.editedItem);
      }
      this.close();
    },
    fetchMatieres: function(selectedPromotion) {
      if (Number.isInteger(selectedPromotion) && selectedPromotion >=0) {
        this.$store.dispatch(
          "UeMatieres/getMatiereByPromotion",
          selectedPromotion
        );
        this.$store.dispatch(
          "UeMatieres/getModuleByPromotion",
          selectedPromotion
        );
      }
    },
  },
};
</script>
