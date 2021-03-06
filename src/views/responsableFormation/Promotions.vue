<template>
  <v-container>
    <v-card>
      <v-data-table
              :headers="headers"
              :items="promotions"
              show-group-by
              :search="search"
              group-by="formation"
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
            <v-toolbar-title><span class="font-weight-bold">Promotions</span></v-toolbar-title>
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
                  Nouvelle promotion
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
                                v-model="editedItem.nom"
                                :rules="rules.nom"
                                label="Nom"
                                required
                        ></v-text-field>
                      </v-col>
                      <v-col
                              cols="12"
                              sm="6"
                              md="4"
                      >
                        <v-autocomplete
                                v-model="editedItem.idFormation"
                                :rules="rules.formation"
                                :items="formations"
                                item-text="name"
                                item-value="id"
                                label="Formation"
                                required
                        ></v-autocomplete>
                      </v-col>
                      <v-col
                              cols="12"
                              sm="6"
                              md="4"
                      >
                        <v-autocomplete
                                v-model="editedItem.idAssistant"
                                :rules="rules.assistant"
                                :items="assistants"
                                item-text="nom_assistant"
                                item-value="id"
                                label="Assistant"
                                required
                        ></v-autocomplete>
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
                          :disabled="!formIsValid"
                          @click="save"
                  >
                    Sauvegarder
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline">Êtes-vous sûr de supprimer cette promotion?</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Annuler</v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>

          <v-autocomplete
                  v-model="search"
                  :items="formations"
                  item-text="name"
                  item-value="name"
                  label="Formation"
                  clearable
          ></v-autocomplete>
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
    <br>
    <v-card>
      <v-list nav dense>
        <v-list-item
                :key="eleveLink.title"
                link
                :to="eleveLink.link"
        >
          <v-list-item-icon>
            <v-icon>{{ eleveLink.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ eleveLink.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
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
        { text: "Nom", value: "nomPromotion", align: "left", groupable: false },
        { text: "Formation", value: "formation", align: "left", groupable: false },
        { text: "Assistant", value: "assistant", align: "left", groupable: true },
        { text: 'Actions', value: 'actions', align: "right", sortable: false, groupable: false },
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        id: 'test',
        nom: 'test',
        nomPromotion: 'test',
        assistant: '',
        idAssistant: '',
        formation: '',
        idFormation: ''
      },
      defaultItem: {
        id: 'test',
        nom: 'test',
        nomPromotion: 'test',
        assistant: '',
        idAssistant: '',
        formation: '',
        idFormation: ''
      },
      rules: {
        nom: [val => (val || '').length > 0 || 'Ce champ est requis'],
        formation: [val => val > 0 || 'Ce champ est requis'],
        assistant: [val => val > 0 || 'Ce champ est requis'],
      },
      eleveLink : { title: "Ajouter et modifier des élèves", icon: "mdi-arrow-left-thick", link: { name: "ResponsableFormationEleve" }  }
    }),


    computed: {
      ...mapGetters({
        promotions: "promotions/getPromotions",
        formations: "formations/getFormations",
        assistants: "assistants/getAssistant"
                 }),
      formTitle () {
        return this.editedIndex === -1 ? 'Nouvelle promotion' : 'Modifier promotion'
    },
    formIsValid () {
      return this.editedItem.nom.length > 0 && this.editedItem.idAssistant > 0 && this.editedItem.idFormation > 0
    },
    },

    created() {
      this.$store.dispatch("promotions/initPromotions");
      this.$store.dispatch("formations/initFormations");
      this.$store.dispatch("assistants/initAssistants");
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.promotions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.promotions.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.$store.dispatch("promotions/removePromotion", {editedIndex: this.editedIndex, editedItem: this.editedItem});
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
          this.$store.dispatch("promotions/editPromotion", {editedIndex: this.editedIndex, editedItem: this.editedItem});
        } else {
          this.$store.dispatch("promotions/addPromotion", this.editedItem);
        }
        this.close()
      },
    },
  };
</script>

<style>
</style>