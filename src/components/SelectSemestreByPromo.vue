<template>
<div>
    <v-select
    :items="semestres"
    item-text="nom"
    item-value="id"
    label="Semestre"
    v-model="selectedSemestre"
    outlined
  ></v-select>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    selectedSemestre: {
      get() {
        this.$emit("updateSelectedSemestre", this.$store.state.semestres.selectedSemestre)
        return this.$store.state.semestres.selectedSemestre;
      },
      set(selectedSemestre) {
        this.$store.dispatch(
          "semestres/setSelectedSemestre",
          selectedSemestre
        );
      },
    },
    ...mapState({
      semestres: (state) => state.semestres.semestres,
      promotion: (state) => state.promotions.selectedPromotion
    }),
  },
  watch: {
    promotion(newPromotion){
      this.$store.dispatch("semestres/fetch", newPromotion);
    }
  }
};
</script>
<style>
</style>