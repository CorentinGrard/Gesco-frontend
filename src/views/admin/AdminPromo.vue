<template>
  <v-container>
    <v-card>
      <v-data-table
              :headers="headers"
              :items="eleves"
              show-group-by
              :search="search"
              group-by="promotion"
              hide-default-footer
              disable-pagination
      >
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
          <td :colspan="headers.length">
            <v-btn @click="toggle" x-small icon :ref="group">
              <v-icon v-if="isOpen">mdi-minus</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
            <span class="mx-5 font-weight-bold">{{ group }}</span>
          </td>
        </template>
        <template v-slot:top>
          <v-toolbar
                  flat
          >
            <v-toolbar-title><span class="font-weight-bold">Eleves</span></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog
                    v-model="dialog"
                    max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        v-bind="attrs"
                        v-on="on"
                >
                  Nouvel élève
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                              cols="12"
                              sm="6"
                              md="4"
                      >
                        <v-text-field
                                v-model="editedItem.eleve_lastname"
                                label="Nom"
                        ></v-text-field>
                      </v-col>
                      <v-col
                              cols="12"
                              sm="6"
                              md="4"
                      >
                        <v-text-field
                                v-model="editedItem.eleve_firstname"
                                label="Prénom"
                        ></v-text-field>
                      </v-col>
                      <v-col
                              cols="12"
                              sm="6"
                              md="4"
                      >
                        <v-select
                                v-model="editedItem.promotion"
                                :items="promotions"
                                label="Promotion"
                        ></v-select>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                          color="blue darken-1"
                          text
                          @click="close"
                  >
                    Annuler
                  </v-btn>
                  <v-btn
                          color="blue darken-1"
                          text
                          @click="save"
                  >
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Êtes-vous sûr de supprimer cet élève?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
          <v-select
                  v-model="search"
                  :items="promotions"
                  label="Promotion"
                  clearable
          ></v-select>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
                  small
                  @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      search: "",
      headers: [
        { text: "Prénom", value: "eleve_firstname", align: "left", groupable: false },
        { text: "Nom", value: "eleve_lastname", align: "left", groupable: false },
        { text: "Promotion", value: "promotion", align: "left", groupable: true },
        { text: 'Actions', value: 'actions', align: "right", sortable: false, groupable: false },
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        eleve_firstname: 'test',
        eleve_lastname: 'test',
        promotion: 'test',
      },
      defaultItem: {
        eleve_firstname: 'test',
        eleve_lastname: 'test',
        promotion: 'test',
      },
    }),


    computed: {
      ...mapGetters({
                   eleves: "promotions/getElevesByPromotionForDisplaying",
                   promotions: "promotions/getPromotions",
                 }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nouvel élève' : 'Modifier élève'
    },
    },

    created() {
      this.$store.dispatch("promotions/getAllPromotions");
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.eleves.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.eleves.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.eleves.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.eleves[this.editedIndex], this.editedItem)
        } else {
          this.eleves.push(this.editedItem)
        }
        this.close()
      },
    },
  };
</script>

<style>
</style>