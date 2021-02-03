<template>
  <v-container>
   <!-- <Promotion
      v-for="promotion in promotions"
      :key="promotion.name"
      :promotion="promotion"
      @select-promotion="
        (promotion) => {
          selectedPromotion = promotion;
          $emit('change-promotion', selectedPromotion);
        }
      "
    />-->

    <v-data-table
    :headers="headers"
    :items="promotions"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
  >
   <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Search (UPPER CASE ONLY)"
          class="mx-4"
        ></v-text-field>
      </template>
      </v-data-table>
  </v-container>
</template>
<script>
import { mapState } from "vuex";

export default {
  components: {
  },
  computed: mapState({
    promotions: (state) => state.promotions.promotions,
  }),
  data: () => ({
    selectedPromotion: {},
    headers:[
          {
            text: 'Promotion',
            align: 'start',
            sortable: false,
            value: 'name',
          }]
  }),
  created() {
    this.$store.dispatch("promotions/getAllPromotions");
  },
  search:"",
};
</script>

<style>
</style>