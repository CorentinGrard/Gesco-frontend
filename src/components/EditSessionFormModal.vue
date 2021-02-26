<template>
  <v-container>
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
                  v-model="matiere.nom"
                  hint="Matière de la session"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-select
                  :items="typesSession"
                  label="Type"
                  v-model="type"
                  hint="Type de la session"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="Detail"
                  v-model="detail"
                  hint="Détail de la session"
                  
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-checkbox
                  v-model="obligatoire"
                  label="Session obligatoire"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-datetime-picker label="Date début" v-model="dateDebut"
                  ><template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                  </template>
                </v-datetime-picker>
                <v-datetime-picker label="Date fin" v-model="dateFin"
                  ><template slot="dateIcon">
                    <v-icon>mdi-calendar</v-icon>
                  </template>
                  <template slot="timeIcon">
                    <v-icon>mdi-clock</v-icon>
                  </template>
                </v-datetime-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm()">
            Fermer
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveForm()">
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import typesSession from "@/typesSession"

export default {
  data: () => ({
    editFormOpenLocal: false,
    typesSession: typesSession,
  }),
  props: {
    editFormOpen: Boolean,
  },
  watch: {
    editFormOpen: function(val) {
      this.editFormOpenLocal = val;
    },
  },
  computed: {
    matiere: {
      get() {
        return this.$store.state.planning.selectedSession.matiere;
      },
      set(matiere) {
        this.$store.commit("planning/updateSelectedSessionMatiere", matiere);
      },
    },
    type: {
      get() {
        return this.$store.state.planning.selectedSession.type;
      },
      set(type) {
        this.$store.commit("planning/updateSelectedSessionType", type);
      },
    },
    obligatoire: {
      get() {
        return this.$store.state.planning.selectedSession.obligatoire;
      },
      set(obligatoire) {
        this.$store.commit(
          "planning/updateSelectedSessionObligatoire",
          obligatoire
        );
      },
    },
    detail: {
      get() {
        return this.$store.state.planning.selectedSession.detail;
      },
      set(detail) {
        this.$store.commit("planning/updateSelectedSessionDetail", detail);
      },
    },
    dateFin: {
      get() {
        return this.$store.state.planning.selectedSession.dateFin;
      },
      set(dateFin) {
        this.$store.commit("planning/updateSelectedSessionDateFin", dateFin);
      },
    },
    dateDebut: {
      get() {
        return this.$store.state.planning.selectedSession.dateDebut;
      },
      set(dateDebut) {
        this.$store.commit(
          "planning/updateSelectedSessionDateDebut",
          dateDebut
        );
      },
    },
  },
  methods: {
    closeForm() {
      this.editFormOpenLocal = false;
      this.$emit("closeFormMessage");
    },
    saveForm() {
      this.$store.dispatch("planning/updateSessionBySelectedSession");
      this.editFormOpenLocal = false;
      this.$emit("closeFormMessage");
    },
  },
};
</script>
