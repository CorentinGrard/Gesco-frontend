<template>
  <v-container>
    <v-card>
      <SelectPromo />
      {{ editedItem.id }}
      <v-data-table
        :headers="headers"
        :items="semestres"
        hide-default-footer
        disable-pagination
        v-if="selectedPromotion !== null"
      >
        <!-- Les elements liés à la data table -->
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Semestres</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <!-- Une structure regroupant le bouton de nouvel item et son pop up -->
            <v-dialog v-model="dialog" max-width="500px">
              <!-- Le boutton pour créer un nouvel item -->
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nouveau Semestre
                </v-btn>
              </template>
              <!-- 
                Le pop-up qui sert pour la création et l'édition d'items.
                Ici, on définit le titre, le formulaire et les bouttons de validation et d'annulation du formulaire
              -->
              <v-card>
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
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- Le pop-up qui sert pour la supression d'items. -->
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Êtes-vous sûr de supprimer ce semestre ?</v-card-title
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
        <!--
          Rajoute le contenu de la colonne 'action' a chaque item. 
          Ce contenu est en faite un visuel avec deux bouttons (et pas du texte simple comme les autres)
        -->
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import SelectPromo from "@/components/SelectPromo";

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nom", value: "nom", align: "left" },
      { text: "Actions", value: "actions", align: "right", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      nom: "",
    },
    defaultItem: {
      nom: "",
    },
  }),
  components: {
    SelectPromo,
  },
  computed: {
    ...mapState({
      semestres: (state) => state.semestres.semestres,
      selectedPromotion: (state) => state.promotions.selectedPromotion,
    }),

    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    selectedPromotion(val) {
      this.$store.dispatch("semestres/fetch", val);
    },
  },

  methods: {
    nomResponsable(item) {
      return item.prenom + " " + item.nom;
    },

    editItem(item) {
      this.editedIndex = this.semestres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.semestres.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.$store.dispatch("semestres/delete", this.editedItem.id);
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
        this.$store.dispatch("semestres/update", {
          id: this.editedItem.id,
          semestre: this.editedItem,
        });
      } else {
        this.$store.dispatch("semestres/add", {
          id: this.selectedPromotion,
          semestre: this.editedItem,
        });
      }
      this.close();
    },
  },
};
</script>
