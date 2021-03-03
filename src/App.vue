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
          <!-- <span v-for="page in pagesByRoles" :key="page.title">
            <v-list-group v-if="page.subMenu" sub-group>
              <template v-slot:activator>
                <v-list-item-title>{{ page.title }}</v-list-item-title>
              </template>
              <v-list-item
                v-for="subPage in page.subMenu"
                :key="subPage.title"
                link
                :to="subPage.link"
              >
                <v-list-item-icon>
                  <v-icon>{{ subPage.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ subPage.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group> -->
          <v-list-item
            v-for="page in pagesByRoles"
            :key="page.title"
            link
            :to="page.link"
          >
            <v-list-item-icon>
              <v-icon>{{ page.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ page.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <!-- </span> -->
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <v-list nav dense>
          <v-list-item @click="logout" link>
            <v-list-item-icon>
              <v-icon>mdi-close-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title> Déconnection </v-list-item-title>
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
            color="white"
            text
            v-bind="attrs"
            @click="$store.dispatch('snackbar/close')"
          >
            Fermer
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
        meta: {
          etudiant: true,
          assistantPedagogique: true,
          admin: true,
          responsableFormation: true,
        },
      },
      {
        title: "Notes",
        icon: "mdi-file-table",
        link: { name: "Notes" },
        meta: { etudiant: true },
      },
      {
        title: "Assistant pédagogique",
        icon: "mdi-cog",
        link: { name: "AssistantPedagogique" },
        meta: { admin: true, assistantPedagogique: true },
        subMenu: [
          {
            title: "Création de cours",
            icon: "mdi-school",
            link: { name: "CreationCours" },
          },
          {
            title: "Gestion des absences",
            icon: "mdi-account-off",
          },
          {
            title: "Gestion des notes",
            icon: "mdi-file-table",
            link: { name: "GestionDesNotes" },
            meta: { admin: true, assistantPedagogique: true },
          },
        ],
      },
      {
        title: "Responsable Formation",
        icon: "mdi-cog",
        link: { name: "ResponsableFormation" },
        meta: { admin: true, responsableFormation: true },
        subMenu: [
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
      },
      {
        title: "Admin",
        icon: "mdi-cog",
        link: { name: "Admin" },
        meta: { admin: true },
        subMenu: [
          {
            title: "Formations",
            icon: "mdi-ballot-outline",
            link: { name: "AdminFormations" },
          },
        ],
      },
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
      profile: (state) => state.user.profile,
    }),
    pagesByRoles() {
      let pagesByRoles = [];
      roles.forEach((role) => {
        if (this.$store.getters[role.getter]) {
          pagesByRoles.push(this.pages.filter((page) => page.meta[role.name]));
        }
      });
      pagesByRoles = pagesByRoles.flat();
      pagesByRoles = [...new Set([...pagesByRoles])];
      return pagesByRoles;
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

<style scoped>
.active {
  color: inherit;
}
</style>
