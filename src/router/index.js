import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import roles from "@/roles";

import Planning from '@/views/Planning.vue'
import Notes from '@/views/etudiant/Notes.vue'
import Admin from '@/views/admin/Index.vue'
import AdminFormations from '@/views/admin/Formations.vue'
import CreationCours from '@/views/assistantPedagogique/CreationCours.vue'
import NotFoundComponent from '@/views/error/404.vue'
import Index from '@/views/Index.vue'
import AssistantPedagogique from '@/views/assistantPedagogique/Index.vue'
import ResponsableFormation from '@/views/responsableFormation/Index.vue'
import ResponsableFormationMatieres from '@/views/responsableFormation/Matieres.vue'
import ResponsableFormationModule from '@/views/responsableFormation/Modules.vue'
import ResponsableFormationSemestres from '@/views/responsableFormation/Semestres.vue'
import ResponsableFormationEleve from '@/views/responsableFormation/Eleves.vue'
import ResponsableFormationPromotion from '@/views/responsableFormation/Promotions.vue'
import GestionDesNotes from '@/views/GestionDesNotes.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { etudiant: true, assistantPedagogique: true, admin: true, responsableFormation: true }
  },
  {
    path: '/planning',
    name: 'Planning',
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
    path: '/etudiant/notes',
    name: 'Notes',
    component: Notes,
    meta: { title: "Notes : Gesco", etudiant: true }
  },
  {
    path: '/assistantPedagogique',
    name: 'AssistantPedagogique',
    component: AssistantPedagogique,
    meta: { title: "Assistant Pedagogique : Gesco", assistantPedagogique: true, admin: true },
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
    meta: { title: "Admin : Gesco", admin: true },
  },
  {
    path: '/responsableFormation',
    name: 'ResponsableFormation',
    component: ResponsableFormation,
    meta: { title: "Responsable Formation : Gesco", admin: true, responsableFormation: true },
  },
  {
    path: '/assistantPedagogique/creationcours',
    name: 'CreationCours',
    component: CreationCours,
    meta: { title: "Création cours : Gesco", assistantPedagogique: true, admin: true },
  },
  {
    path: '/assistantPedagogique/notes/',
    name: 'GestionDesNotes',
    component: GestionDesNotes,
    meta: { assistantPedagogique: true, admin: true },
  },
  {
    path: '/responsableFormation/matieres',
    name: 'ResponsableFormationMatieres',
    component: ResponsableFormationMatieres,
    meta: { title: "Administration des matières : Gesco", admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/modules',
    name: 'ResponsableFormationModule',
    component: ResponsableFormationModule,
    meta: { title: "Administration des modules : Gesco", admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/eleve',
    name: 'ResponsableFormationEleve',
    component: ResponsableFormationEleve,
    meta: { title: "Administration des élèves : Gesco", admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/promotion',
    name: 'ResponsableFormationPromotion',
    component: ResponsableFormationPromotion,
    meta: { title: "Administration des promotions : Gesco", admin: true, responsableFormation: true },
  },
  {
    path: '/responsableFormation/semestres',
    name: 'ResponsableFormationSemestres',
    component: ResponsableFormationSemestres,
    meta: { title: "Administration des semestres : Gesco", admin: true, responsableFormation: true },
  },
  {
    path: "/admin/formations",
    name: "AdminFormations",
    component: AdminFormations,
    meta: { title: "Administration des formations : Gesco", admin: true },
  },
  {
    path: '*',
    name: 'NotFound',
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
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

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
