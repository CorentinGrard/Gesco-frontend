<template>
  <v-container>
    <v-card>
      <v-card-title> Responsable Formation </v-card-title>
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
        title: "Matières",
        icon: "mdi-book-open-variant",
        link: { name: "ResponsableFormationMatieres" },
      },
      {
        title: "Modules",
        icon: "mdi-book-open-variant",
        link: { name: "ResponsableFormationModule" },
      },
      {
        title: "Semestres",
        icon: "mdi-ballot-outline",
        link: { name: "ResponsableFormationSemestres" },
      },
      {
        title: "Elèves",
        icon: "mdi-account-multiple-plus",
        link: { name: "ResponsableFormationEleve" },
      },
      {
        title: "Promotions",
        icon: "mdi-account-multiple-plus",
        link: { name: "ResponsableFormationPromotion" },
      },
    ],
  }),
};
</script>

<style>
</style>