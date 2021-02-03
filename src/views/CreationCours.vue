<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <SelectPromo />
        <v-divider></v-divider>
        <v-expansion-panels>
          <v-expansion-panel v-for="semestre in semestres" :key="semestre.id">
            <v-expansion-panel-header>
              {{ semestre.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list rounded>
                <v-list-item-group>
                  <v-list-item
                    v-for="matiere in semestre.matieres"
                    :key="matiere.id"
                    @click="selectMatiere(matiere.id)"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="matiere.name"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-chip
                        class="ma-2"
                        :color="
                          pickColor(
                            matiere.nombreHeuresPlace,
                            matiere.nombreHeuresTotal
                          )
                        "
                        text-color="white"
                      >
                        {{ matiere.nombreHeuresPlace }}/{{
                          matiere.nombreHeuresTotal
                        }}h</v-chip
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider></v-divider>
        <v-autocomplete :items="salles" label="Salle" outlined></v-autocomplete>
      </v-col>
      <v-col>
        <Planning :selectedMatiere="selectedMatiere" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Planning from "../components/Planning";
import SelectPromo from "../components/SelectPromo";

export default {
  data: () => ({
    selectedMatiere: null,
    semestres: [
      {
        id: 1,
        name: "S1",
        matieres: [
          {
            id: 1,
            name: "Maths",
            nombreHeuresTotal: 150,
            nombreHeuresPlace: 150,
          },
          {
            id: 2,
            name: "IA",
            nombreHeuresTotal: 30,
            nombreHeuresPlace: 10,
          },
          {
            id: 3,
            name: "Projet",
            nombreHeuresTotal: 40,
            nombreHeuresPlace: 0,
          },
        ],
      },
      {
        id: 2,
        name: "S2",
        matieres: [
          {
            id: 4,
            name: "Maths",
            nombreHeuresTotal: 10,
            nombreHeuresPlace: 0,
          },
          {
            id: 5,
            name: "Informatique",
            nombreHeuresTotal: 60,
            nombreHeuresPlace: 10,
          },
          {
            id: 6,
            name: "Big Data",
            nombreHeuresTotal: 12,
            nombreHeuresPlace: 5,
          },
        ],
      },
    ],
    salles: ["M105", "M107", "M165", "M102", "M145"],
  }),
  components: {
    Planning,
    SelectPromo,
  },
  methods: {
    pickColor: (nombreHeuresPlace, nombreHeuresTotal) => {
      let pourcentageNbHeures = nombreHeuresPlace / nombreHeuresTotal;
      if (pourcentageNbHeures == 0) {
        return "red";
      } else if (pourcentageNbHeures == 1) {
        return "green";
      } else return "orange";
    },
    selectMatiere: function (matiere) {
      this.selectedMatiere = matiere;
    },
  },
};
</script>

<style>
</style>