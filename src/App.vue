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
            <v-list-item-title class="title">
              {{ profile.prenom }} {{ profile.nom }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="item in itemsByRoles"
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
          <v-list-item @click="logout" link>
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
import updateToken from "@/middlewares/update-token";
import roles from "@/roles";

export default {
  name: "App",

  data: () => ({
    pages: [
      {
        title: "Planning",
        icon: "mdi-calendar-check",
        link: { name: "Planning" },
        meta: { etudiant: true, assistantPedagogique: true },
      },
      {
        title: "Notes",
        icon: "mdi-file-table",
        link: { name: "Notes" },
        meta: { etudiant: true },
      },
      {
        title: "Création de cours",
        icon: "mdi-school",
        link: { name: "CreationCours" },
        meta: { admin: true, assistantPedagogique: true },
      },
      {
        title: "Gestion des absences",
        icon: "mdi-account-off",
        meta: { admin: true, assistantPedagogique: true },
      },
      {
        title: "Gestion des notes",
        icon: "mdi-file-table",
        meta: { admin: true, assistantPedagogique: true },
      },
      {
        title: "Admin",
        icon: "mdi-cog",
        link: { name: "Admin" },
        meta: { admin: true },
      },
    ],
  }),
  computed: {
    pagesWithRoles: function () {
      return this.pages.filter((page) => {
        return page.roles.some((role) => this.$keycloak.hasRealmRole(role));
      });
    },
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
      profile: (state) => state.user.profile,
    }),
    itemsByRoles() {
      let itemsByRoles = [];
      roles.forEach((role) => {
        if (this.$store.getters[role.getter]) {
          itemsByRoles.push(this.items.filter((item) => item.meta[role.name]));
        }
      });
      itemsByRoles = itemsByRoles.flat()
      itemsByRoles = [...new Set([...itemsByRoles])];
      return itemsByRoles;
    },
  },
  watch: {
    $route() {
      updateToken();
    },
  },
  methods: {
    logout: function () {
      this.$keycloak.logout();
    },
  },
};
</script>
