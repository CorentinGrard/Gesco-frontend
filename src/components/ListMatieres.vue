<template>
  <v-container>
    <Matiere
      v-for="matiere in matieres"
      :key="matiere.name"
      :matiere="matiere"
      @select-matiere="
        (matiere) => {
          selectedMatiere = matiere;
          $emit('change-matiere', selectedMatiere);
        }
      "
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Matiere from "../components/Matiere";

export default {
  components: {
    Matiere,
  },
  computed: mapState({
    matieres: (state) => state.matieres.matieres,
  }),
  data: () => ({
    selectedMatiere: {},
  }),
  created() {
    this.$store.dispatch("matieres/getAllMatieres");
  },
};
</script>

<style>
</style>