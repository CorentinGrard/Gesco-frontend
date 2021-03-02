<template>
  <v-container fluid>
    <v-stepper v-model="etape">
      <v-stepper-header>
        <v-stepper-step :complete="etape > 1" step="1">
          <span v-if="typeof selectedPromotion.id === 'undefined'"
            >Selectionner la promotion</span
          >
          <span v-else>{{ selectedPromotion.name }}</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="etape > 2" step="2">
          <span v-if="typeof selectedSemestre.id === 'undefined'"
            >Selectionner le semestre</span
          >
          <span v-else>{{ selectedSemestre.name }}</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="etape > 3" step="3">
          <span v-if="typeof selectedMatiere.id === 'undefined'"
            >Selectionner la matière</span
          >
          <span v-else>{{ selectedMatiere.name }}</span>
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="4"> Entrer les notes des élèves </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
       <SelectPromo/>

        <v-btn @click="etape++">
          Valider
        </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
        <SelectSemestreByPromo/>

         <v-btn @click="etape++">
          Valider
        </v-btn>
          <v-btn
            @click="
              () => {
                etape--;
                selectedSemestre = {};
              }
            "
          >
            Retour
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <SelectMatiereBySem/>
          <v-btn
            @click="
              () => {
                etape--;
                selectedSemestre = {};
              }
            "
          >
            Retour
          </v-btn>
        </v-stepper-content>

        <v-stepper-content step="4">
          <ListElevesNotes />

          <v-btn color="primary" @click="etape = 1"> Valider </v-btn>

          <v-btn
            @click="
              () => {
                etape--;
                selectedMatiere = {};
              }
            "
          >
            Retour
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script>
import SelectPromo from "../components/SelectPromo";
import SelectMatiereBySem from "../components/SelectMatiereBySem";
import ListElevesNotes from "../components/ListElevesNotes";
import SelectSemestreByPromo from "../components/SelectSemestreByPromo";

export default {
  data: () => ({
    etape: 1,
    selectedPromotion: -1,
    selectedSemestre: -1,
    selectedMatiere: {},
  }),
  components: {
    SelectPromo,
    SelectMatiereBySem,
    ListElevesNotes,
    SelectSemestreByPromo,
  },
};
</script>

<style>
</style>