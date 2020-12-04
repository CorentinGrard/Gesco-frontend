<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-autocomplete
          :items="promotions"
          label="Promotion"
          outlined
        ></v-autocomplete>
        <v-expansion-panels>
          <v-expansion-panel v-for="semestre in semestres" :key="semestre.name">
            <v-expansion-panel-header>
              {{ semestre.name }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list dense>
                <v-list-item-group>
                  <v-list-item
                    v-for="matiere in semestre.matieres"
                    :key="matiere.name"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="matiere.name"
                      ></v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      {{ matiere.nombreHeuresPlace }} /
                      {{ matiere.nombreHeuresTotal }}
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-divider></v-divider>
        <v-autocomplete
          :items="salles"
          label="Salle"
          outlined
        ></v-autocomplete>
      </v-col>
      <v-col>
        <Planning />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Planning from "../components/Planning";

export default {
  data: () => ({
    promotions: ["INFRES11", "INFRES12", "MKX20", "MKX21"],
    semestres: [
      {
        name: "S1",
        matieres: [
          {
            name: "Maths",
            nombreHeuresTotal: 150,
            nombreHeuresPlace: 50,
          },
          {
            name: "IA",
            nombreHeuresTotal: 30,
            nombreHeuresPlace: 10,
          },
          {
            name: "Projet",
            nombreHeuresTotal: 40,
            nombreHeuresPlace: 0,
          },
        ],
      },
      {
        name: "S2",
        matieres: [
          {
            name: "Maths",
            nombreHeuresTotal: 10,
            nombreHeuresPlace: 0,
          },
          {
            name: "Informatique",
            nombreHeuresTotal: 60,
            nombreHeuresPlace: 10,
          },
          {
            name: "Big Data",
            nombreHeuresTotal: 12,
            nombreHeuresPlace: 5,
          },
        ],
      },
    ],
    salles: ["M105","M107","M165","M102","M145",]
  }),
  components: {
    Planning,
  },
};
</script>

<style>
</style>