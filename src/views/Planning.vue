<template>
  <v-container fluid>
    <v-calendar
      type="week"
      day-body
      :weekdays="[1, 2, 3, 4, 5]"
      :events="sessions"
      :first-interval= 7
      :interval-minutes= 60 
      :interval-count= 13 
    ></v-calendar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    events: [],
  }),
  computed: mapGetters({
    sessions: "planning/getSessionForPlanning",
  }),
  created() {
    this.$store.dispatch("planning/getAllSessions");
  },
};
</script>

<style>
</style>