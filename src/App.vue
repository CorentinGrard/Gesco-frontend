<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Gesco</v-toolbar-title>
      
      <v-btn text :to="{ name: 'Planning'}">Planning</v-btn>
      <v-btn text :to="{ name: 'GestionDesNotes'}">Gestion des notes</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
