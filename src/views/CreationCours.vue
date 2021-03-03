<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <span v-if="selectedPromotion">
          <v-autocomplete
            :items="semestres"
            item-text="nomSemestre"
            label="Selectionnez un semestre"
            v-model="selectedSemestre"
            return-object
            outlined
          ></v-autocomplete>
          <v-autocomplete
            v-if="selectedSemestre"
            :items="selectedSemestre.matieres"
            item-text="nomMatiere"
            item-value="idMatiere"
            label="Selectionnez une matiere"
            v-model="selectedMatiere"
            outlined
          ></v-autocomplete>
          <span v-if="selectedMatiere">
            <SelectSalle />
            <v-textarea
              :value="details"
              @input="updateDetails"
              solo
              name="details"
              label="Details"
            ></v-textarea>
            <v-text-field
              :value="duree"
              @input="updateDuree"
              label="Durée"
              type="time"
              suffix="hh:mm"
            ></v-text-field>
            <v-select
              :value="type"
              @input="updateType"
              :items="typeSession"
              label="Type"
              outlined
            ></v-select>
            <v-switch
              :input-value="obligatoire"
              @change="updateObligatoire"
              :label="`Obligatoire: ${obligatoire ? 'Oui' : 'Non'}`"
            ></v-switch>
          </span>
        </span>
      </v-col>
      <v-col>
        <Planning :edition="true"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Planning from "@/components/Planning";
import SelectSalle from "@/components/SelectSalle";
import typesSession from "@/typesSession";

export default {
  data: () => ({
    typeSession: typesSession,
    selectedSemestre: null,
    selectedMatiere: null,
  }),
  components: {
    Planning,
    SelectSalle,
  },
  computed: {
    ...mapGetters({
      semestres: "matieres/getForCreationCours",
    }),
    ...mapState({
      selectedPromotion: (state) => state.promotions.selectedPromotion,
      obligatoire: (state) => state.planning.obligatoire,
      type: (state) => state.planning.type,
      duree: (state) => state.planning.duree,
      details: (state) => state.planning.details,
    }),
  },
  watch: {
    selectedPromotion() {
      this.fetchMatieres();
    },
    selectedMatiere(idMatiere) {
      console.log(idMatiere)
      this.$store.dispatch("matieres/setSelectedMatiere", idMatiere);
    },
  },
  methods: {
    updateObligatoire(obligatoire) {
      this.$store.commit("planning/SET_OBLIGATOIRE", obligatoire);
    },
    updateType(type) {
      this.$store.commit("planning/SET_TYPE", type);
    },
    updateDuree(duree) {
      this.$store.commit("planning/SET_DUREE", duree);
    },
    updateDetails(details) {
      this.$store.commit("planning/SET_DETAILS", details);
    },
    pickColor: (nombreHeuresPlace, nombreHeuresTotal) => {
      let pourcentageNbHeures = nombreHeuresPlace / nombreHeuresTotal;
      if (pourcentageNbHeures == 0) {
        return "red";
      } else if (pourcentageNbHeures == 1) {
        return "green";
      } else return "orange";
    },
    fetchMatieres: function () {
      if (this.selectedPromotion !== null) {
        this.$store.dispatch("matieres/fetch", this.selectedPromotion);
      }
    },
  },
};
</script>

<style>
</style>