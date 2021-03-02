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
        this.$emit("updateSelectedMatiere", this.$store.state.matieres.selectedMatiere)
        console.log(this.$store.state.matieres.selectedMatiere)
        return this.$store.state.matieres.selectedMatiere;
      },
      set(selectedMatiere) {
        this.$store.dispatch(
          "matieres/setSelectedMatiere",
          selectedMatiere
        );
      },
    },
    ...mapState({
      matieres: (state) => state.matieres.matieres,
      promotion: (state) => state.promotions.selectedPromotion
    }),
  },
  watch: {
    promotion(newPromotion){
      this.$store.dispatch("matieres/fetch", newPromotion);
    }
  }
};
</script>
<style>
</style>