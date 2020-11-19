<template>
  <v-container>
    <Promotion
      v-for="promotion in promotions"
      :key="promotion.name"
      :promotion="promotion"
      @select-promotion="
        (promotion) => {
          selectedPromotion = promotion;
          $emit('change-promotion', selectedPromotion);
        }
      "
    />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Promotion from "../components/Promotion";

export default {
  components: {
    Promotion,
  },
  computed: mapState({
    promotions: (state) => state.promotions.promotions,
  }),
  data: () => ({
    selectedPromotion: {},
  }),
  created() {
    this.$store.dispatch("promotions/getAllPromotions");
  },
};
</script>

<style>
</style>