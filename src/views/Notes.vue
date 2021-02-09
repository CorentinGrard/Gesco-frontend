<template>
  <v-container>
    <v-card>
      <v-card-title> Notes </v-card-title>
      <v-select
        v-model="search"
        :items="semesters"
        label="Semestre"
        clearable
      ></v-select>
      <v-data-table
        :headers="headers"
        :items="notes"
        show-group-by
        :search="search"
        group-by="category"
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
      { text: "Semestre", value: "semester", align: "left", groupable: false },
      { text: "UE", value: "category", align: "left", groupable: true },
      { text: "Matière", align: "start", value: "matiere", groupable: false },
      { text: "Coefficient", align: "right", value: "coeff", groupable: false },
      { text: "Note", value: "note", align: "right", groupable: false },
    ],
    events: [],
  }),
  computed: mapGetters({
    notes: "notes/getNotesForDisplaying",
    semesters: "notes/getSemesters",
  }),
  created() {
    this.$store.dispatch("notes/getAllNotes");
  },
};
</script>

<style>
</style>