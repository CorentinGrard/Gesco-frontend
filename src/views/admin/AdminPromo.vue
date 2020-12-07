<template>
  <v-container>
    <v-card>
      <v-card-title> Notes </v-card-title>
      <v-select
              v-model="search"
              :items="promotions"
              label="Promotions"
              clearable
      ></v-select>
      <v-data-table
              :headers="headers"
              :items="eleves"
              show-group-by
              :search="search"
              group-by="promotion"
              hide-default-footer
              disable-pagination
      >
        <template v-slot:group.header="{ group, headers, toggle, isOpen }">
          <td :colspan="headers.length">
            <v-btn @click="toggle" x-small icon :ref="group">
              <v-icon v-if="isOpen">mdi-minus</v-icon>
              <v-icon v-else>mdi-plus</v-icon>
            </v-btn>
            <span class="mx-5 font-weight-bold">{{ group }}</span>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data: () => ({
      search: "",
      headers: [
        { text: "Prénom", value: "eleve_firstname", align: "left", groupable: false },
        { text: "Nom", value: "eleve_lastname", align: "left", groupable: false },
        { text: "Promotion", value: "promotion", align: "left", groupable: true },
      ],
      events: [],
    }),
    computed: mapGetters({
      eleves: "promotions/getElevesByPromotionForDisplaying",
      promotions: "promotions/getPromotions",
    }),
    created() {
      this.$store.dispatch("promotions/getAllPromotions");
    },
  };
</script>

<style>
</style>