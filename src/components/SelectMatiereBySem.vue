<template>
  <div>
    <v-select
      :items="matieres"
      item-text="nom"
      item-value="id"
      label="Matiere"
      v-model="selectedMatiere"
      outlined
    ></v-select>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    selectedMatiere: {
      get() {
        return this.$store.state.matieres.selectedMatiere;
      },
      set(selectedMatiere) {
        this.$store.dispatch("matieres/setSelectedMatiere", selectedMatiere);
      },
    },
    ...mapState({
      semestre: (state) => state.semestres.selectedSemestre,
      matieres: (state) => state.matieres.matieresAjoutNote,
    }),
  },
  watch: {
    semestre(newSemestre) {
      this.$store.dispatch("matieres/fetchBySemestre", newSemestre);
    },
  },
};
</script>
<style>
</style>