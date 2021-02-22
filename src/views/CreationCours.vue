<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <v-expansion-panels class="mb-5">
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
        <SelectSalle />
        <v-textarea solo name="details" label="Details"></v-textarea>
        <v-text-field
          label="Durée"
          value="02:00"
          type="time"
          suffix="hh:mm"
        ></v-text-field>
      </v-col>
      <v-col>
        <Planning />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Planning from "@/components/Planning";
import SelectSalle from "@/components/SelectSalle";

export default {
  data: () => ({}),
  components: {
    Planning,
    SelectSalle,
  },
  computed: {
    ...mapGetters({
      semestres: "matieres/getForCreationCours",
    }),
    ...mapState({
      selectedPromotion: (state) => state.promotions.selectedPromotion,
    }),
  },
  watch: {
    selectedPromotion() {
      this.fetchMatieres();
    },
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
      this.$store.dispatch("matieres/setSelectedMatiere", matiere);
    },
    fetchMatieres: function () {
      if (this.selectedPromotion !== null) {
        this.$store.dispatch("matieres/fetch", this.selectedPromotion);
      }
    },
  },
};
</script>

<style>
</style>