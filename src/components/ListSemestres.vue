
<template>
  <v-container>
    <v-hover
      v-for="semestre in semestres"
      :key="semestre.id"
      v-slot="{ hover }"
    >
      <v-card
        :elevation="hover ? 12 : 2"
        v-on:click="() => $emit('change-semestre', semestre)"
      >
        {{ semestre.name }}</v-card
      >
    </v-hover>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    semestres: (state) => state.semestres.semestres,
  }),
  data: () => ({
    selectedSemestre: {},
  }),
  created() {
    this.$store.dispatch("semestres/getAllSemestres");
  },
};
</script>

<style>
</style>