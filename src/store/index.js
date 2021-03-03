import Vue from 'vue'
import Vuex from 'vuex'
import planning from './modules/planning'
import promotions from './modules/admin/promotions'
import notes from './modules/notes'
import formations from './modules/admin/formations'
import semestres from './modules/admin/semestres'
import responsables from './modules/admin/responsables'
import matieres from './modules/matieres'
import UeMatieres from './modules/UeMatieres'
import snackbar from './modules/snackbar'
import user from './modules/user'
import eleves from './modules/admin/eleves'
import assistants from "./modules/admin/assistants";
import salles from './modules/salles'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    planning,
    notes,
    promotions,
    formations,
    responsables,
    snackbar,
    user,
    matieres,
    UeMatieres,
    semestres,
    eleves,
    assistants,
    salles,
  },
  strict: debug,
})