<template>
  <v-container>
    <v-stepper v-model="etape">
      <v-stepper-header>
        <v-stepper-step :complete="etape > 1" step="1">
          <span v-if="typeof(selectedPromotion.id) === 'undefined'">Selectionner la promotion</span>
          <span v-else>{{selectedPromotion.name}}</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="etape > 2" step="2">
          Selectionner la matière
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> Entrer les notes des élèves </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <ListPromotions
            @change-promotion="
              (promotion) => {
                selectedPromotion = promotion;
                etape++;
              }
            "
          />
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="etape = 3"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="etape = 1"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import ListPromotions from "../components/ListPromotions";

export default {
  data: () => ({
    etape: 1,
    selectedPromotion: {},
  }),
  components: {
    ListPromotions,
  },
};
</script>

<style>
</style>