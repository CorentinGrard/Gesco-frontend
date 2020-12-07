<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        Admin
      </v-card-title>
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
        { title: "Création et modification d'une matière", icon: "mdi-book-open-variant" },
        { title: "Création et modification d'une formation", icon: "mdi-ballot-outline" },
        { title: "Gestion des promotions et assignation des élèves", icon: "mdi-account-multiple-plus", link: { name: "AdminPromo" }  },
        { title: "Aller sur Darwin", icon: "mdi-account-group" },
      ],
    }),
  };
</script>

<style>
</style>