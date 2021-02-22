<template>
  <v-container>
    <v-card>
      <v-card-title> Admin </v-card-title>
      <v-list nav dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: "Création et modification des matières",
        icon: "mdi-book-open-variant",
        link: { name: "AdminMatieres" },
      },
      {
        title: "Création et modification des UE",
        icon: "mdi-book-open-variant",
        link: { name: "AdminUe" },
      },
      {
        title: "Création et modification des semestres",
        icon: "mdi-ballot-outline",
        link: { name: "AdminSemestres" },
      },
      {
        title: "Création et modification d'une formation",
        icon: "mdi-ballot-outline",
        link: { name: "AdminFormations" },
      },
      {
        title: "Gestion des promotions et assignation des élèves",
        icon: "mdi-account-multiple-plus",
        link: { name: "AdminEleve" },
      },
      { title: "Aller sur Darwin", icon: "mdi-account-group" },
    ],
  }),
};
</script>

<style>
</style>