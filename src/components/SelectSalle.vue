<template>
  <v-autocomplete
    :items="salles"
    item-text="nomSalle"
    item-value="id"
    label="Salle"
    v-model="selectedSalle"
    outlined
  ></v-autocomplete>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    selectedSalle: {
      get() {
        return this.$store.state.salles.selectedSalle;
      },
      set(selectedSalle) {
        this.$store.dispatch(
          "salles/setSelectedSalle",
          selectedSalle
        );
      },
    },
    ...mapState({
      salles: (state) => state.salles.salles,
    }),
  },
  created() {
    this.$store.dispatch("salles/fetch");
  },
};
</script>