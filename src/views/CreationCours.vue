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
        <v-textarea
          :value="details"
          @input="updateDetails"
          solo
          name="details"
          label="Details"
        ></v-textarea>
        <v-text-field
          :value="duree"
          @input="updateDuree"
          label="Durée"
          type="time"
          suffix="hh:mm"
        ></v-text-field>
        <v-select
          :value="type"
          @input="updateType"
          :items="typeSession"
          label="Type"
          outlined
        ></v-select>
        <v-switch
          :input-value="obligatoire"
          @change="updateObligatoire"
          :label="`Obligatoire: ${obligatoire ? 'Oui' : 'Non'}`"
        ></v-switch>
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
import typesSession from "@/typesSession"

export default {
  data: () => ({
    typeSession: typesSession
  }),
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
      obligatoire: (state) => state.planning.obligatoire,
      type: (state) => state.planning.type,
      duree: (state) => state.planning.duree,
      details: (state) => state.planning.details,
    }),
  },
  watch: {
    selectedPromotion() {
      this.fetchMatieres();
    },
  },
  methods: {
    updateObligatoire(obligatoire) {
      this.$store.commit("planning/SET_OBLIGATOIRE", obligatoire);
    },
    updateType(type) {
      this.$store.commit("planning/SET_TYPE", type);
    },
    updateDuree(duree) {
      this.$store.commit("planning/SET_DUREE", duree);
    },
    updateDetails(details) {
      this.$store.commit("planning/SET_DETAILS", details);
    },
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