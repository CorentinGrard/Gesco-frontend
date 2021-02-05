<template>
  <v-app>
    <v-navigation-drawer permanent app dark color="primary">
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/women/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title"> Sandra Adams </v-list-item-title>
            <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group>
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
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-list nav dense>
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
      <v-snackbar
        v-model="display"
        :timeout="snackbarTimeout"
        :color="snackbarColor"
      >
        {{ snackbarText }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="black"
            text
            v-bind="attrs"
            @click="$store.dispatch('snackbar/close')"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "App",

  data: () => ({
    items: [
      {
        title: "Planning",
        icon: "mdi-calendar-check",
        link: { name: "Planning" },
      },
      { title: "Notes", icon: "mdi-file-table", link: { name: "Notes" } },
      { title: "Création de cours", icon: "mdi-school" },
      { title: "Gestion des absences", icon: "mdi-account-off" },
      { title: "Gestion des notes", icon: "mdi-file-table" },
      { title: "Admin", icon: "mdi-cog", link: { name: "Admin" } },
    ],
  }),
  computed: {
    display: {
      get() {
        return this.$store.state.snackbar.display;
      },
      set(display) {
        this.$store.dispatch("snackbar/setDisplay", display);
      },
    },
    ...mapState({
      snackbarText: (state) => state.snackbar.text,
      snackbarTimeout: (state) => state.snackbar.timeout,
      snackbarColor: (state) => state.snackbar.color,
    }),
  },
};
</script>
