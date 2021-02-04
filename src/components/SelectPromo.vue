<template>
  <v-autocomplete
    :items="promotions"
    item-text="nomPromotion"
    item-value="id"
    label="Promotion"
    v-model="selectedPromotion"
    outlined
  ></v-autocomplete>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    selectedPromotion: {
      get() {
        return this.$store.state.promotions.selectedPromotion;
      },
      set(selectedPromotion) {
        this.$store.dispatch(
          "promotions/setSelectedPromotion",
          selectedPromotion
        );
      },
    },
    ...mapState({
      promotions: (state) => state.promotions.promotions,
    }),
  },
  created() {
    this.$store.dispatch("promotions/fetchPromotions");
  },
};
</script>
<style>
</style>