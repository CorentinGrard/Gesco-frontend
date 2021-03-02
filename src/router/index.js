import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import roles from "@/roles";

import Planning from "@/views/Planning.vue";
import Notes from "@/views/Notes.vue";
import Admin from "@/views/Admin.vue";
import AdminMatieres from "@/views/admin/Matieres.vue";
import AdminModule from "@/views/admin/Modules.vue";
import AdminFormations from "@/views/admin/Formations.vue";
import AdminSemestres from "@/views/admin/Semestres.vue";
import CreationCours from "@/views/CreationCours.vue";
import NotFoundComponent from "@/views/404.vue";
import AdminEleve from "@/views/admin/Eleves.vue";
import AdminPromotion from "@/views/admin/Promotions.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/planning",
    name: "Planning",
    component: Planning,
    meta: {
      title: "Planning : Gesco",
      etudiant: true,
      assistantPedagogique: true,
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
    meta: { title: "Notes : Gesco", etudiant: true },
  },
  {
    path: "/creationcours",
    name: "CreationCours",
    component: CreationCours,
    meta: {
      title: "Création cours : Gesco",
      assistantPedagogique: true,
      admin: true,
    },
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    meta: {
      title: "Admin : Gesco",
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "/admin/matieres",
    name: "AdminMatieres",
    component: AdminMatieres,
    meta: {
      title: "Administration des matières : Gesco",
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "/admin/modules",
    name: "AdminModule",
    component: AdminModule,
    meta: {
      title: "Administration des modules : Gesco",
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "/admin/eleve",
    name: "AdminEleve",
    component: AdminEleve,
    meta: {
      title: "Administration des élèves : Gesco",
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "/admin/promotion",
    name: "AdminPromotion",
    component: AdminPromotion,
    meta: {
      title: "Administration des promotions : Gesco",
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "/admin/formations",
    name: "AdminFormations",
    component: AdminFormations,
    meta: { title: "Administration des formations : Gesco", admin: true },
  },
  {
    path: "/admin/semestres",
    name: "AdminSemestres",
    component: AdminSemestres,
    meta: {
      title: "Administration des semestres : Gesco",
      admin: true,
      responsableFormation: true,
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFoundComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.VUE_APP_BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
  if(nearestWithTitle) document.title = nearestWithTitle.meta.title;

  for (const id in roles) {
    const role = roles[id];
    if (
      to.matched.some((record) => record.meta[role.name]) &&
      store.getters[role.getter]
    ) {
      next();
      return true;
    }
  }

  if (
    to.matched.some(
      (record) =>
        record.meta &&
        Object.keys(record.meta).length === 0 &&
        record.meta.constructor === Object
    )
  ) {
    next();
    return true;
  } else {
    next("/");
    return false;
  }
});

export default router;
