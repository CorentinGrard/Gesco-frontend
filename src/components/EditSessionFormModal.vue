<template>
  <v-container>
      {{ session }}
    <v-dialog v-model="editFormOpenLocal" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Modification de session</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                label="Matière" 
                v-model="this.sessionLocal.matiere" 
                hint="Matière de la session"
                required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Type"
                  v-model="this.sessionLocal.type"
                  hint="Type de la session"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-checkbox 
                v-model="this.sessionLocal.obligatoire" 
                label="Session obligatoire"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-datetime-picker
                label="Date début"
                v-model="this.sessionLocal.dateDebut"
                ><template slot="dateIcon">
                    <v-icon>fas fa-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>fas fa-clock</v-icon>
                  </template> </v-datetime-picker>
                <v-datetime-picker
                label="Date fin"
                v-model="this.sessionLocal.dateFin"
                ><template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                  </template> </v-datetime-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click=closeform()>
            Fermer
          </v-btn>
          <v-btn color="blue darken-1" text @click=closeform()>
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>

export default {
  data: ()=> ({
    sessionLocal: {},
    editFormOpenLocal: false,
  }),
  props: {
    session: Object,
    editFormOpen: Boolean
  },
  watch:{
    session : function (val){
      this.sessionLocal = val
    },
    editFormOpen : function (val){
      this.editFormOpenLocal = val
    },
  },
  methods:{
    closeform(){
      this.editFormOpenLocal = false
      this.$emit('closeFormMessage');
    }
  }
};
</script>