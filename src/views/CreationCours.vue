<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <SelectPromo @updateSelectedPromotion="fetchMatieres" />
        <v-divider></v-divider>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="semestre in semestres"
            :key="semestre.idSemestre"
          >
            <v-expansion-panel-header>
              {{ semestre.nomSemestre }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list rounded>
                <v-list-item-group>
                  <v-list-item
                    v-for="matiere in semestre.matieres"
                    :key="matiere.idMatiere"
                    @click="selectMatiere(matiere.idMatiere)"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="matiere.nomMatiere"
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
import { mapGetters } from "vuex";
import Planning from "../components/Planning";
import SelectPromo from "../components/SelectPromo";

export default {
  data: () => ({
    selectedMatiere: null,
    salles: ["M105", "M107", "M165", "M102", "M145"],
  }),
  components: {
    Planning,
    SelectPromo,
  },
  computed: {
    ...mapGetters({
      semestres: "matieres/getForCreationCours",
    }),
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
    fetchMatieres: function (selectedPromotion) {
      if (Number.isInteger(selectedPromotion)) {
        this.$store.dispatch("matieres/fetch", selectedPromotion);
      }
    },
  },
};
</script>

<style>
</style>