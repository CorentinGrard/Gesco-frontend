<template>
  <v-autocomplete
    :items="semestres"
    item-text="nomSemestre"
    item-value="id"
    label="Semestre"
    v-model="selectedSemestre"
    outlined
  ></v-autocomplete>
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
    }),
  },
  created() {
    this.$store.dispatch("semestres/fetchSemestres");
  },
};
</script>
<style>
</style>