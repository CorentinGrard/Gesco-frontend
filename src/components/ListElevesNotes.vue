<template>
  <v-container>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Nom</th>
            <th class="text-left">Prénom</th>
            <th class="text-left">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="eleve in eleves" :key="eleve.id">
            <td>{{ eleve.nom }}</td>
            <td>{{ eleve.prenom }}</td>
            <td>
              <v-text-field
                label="Note non rentrée"
                solo
                :value="eleve.note"
              ></v-text-field>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState({
    eleves: (state) => state.elevesAssistantPedagogique.eleves,
    selectedMatiere: (state) => state.matieres.selectedMatiere,
  }),
  watch:{
    selectedMatiere(){
      this.$store.dispatch("elevesAssistantPedagogique/getAllEleves")
    }
  }
};
</script>

<style>
</style>