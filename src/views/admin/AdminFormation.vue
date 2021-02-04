<template>
  <v-container>
    <v-card>
      <v-data-table
              :headers="headers"
              :items="formations"
              hide-default-footer
              disable-pagination
      >
       
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    data: () => ({
      headers: [
        { text: "Formation", value: "formation_name", align: "left", groupable: false },
        { text: "Responsable", value: "formation_responsable", align: "left", groupable: false },
      ],
    }),


    computed: {
      ...mapGetters({
                   formations: "formations/getFormations",
                 }),
    },

    created() {
      this.$store.dispatch("formations/getAllFormations");
    },

    methods: {
      editItem (item) {
        this.editedIndex = this.eleves.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    },
  };
</script>

<style>
</style>
