import Vue from 'vue'
import Vuex from 'vuex'
import planning from './modules/planning'
import promotions from './modules/promotions'
import notes from './modules/notes'
import matieres from './modules/matieres'
import UeMatieres from './modules/UeMatieres'
import snackbar from './modules/snackbar'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    planning,
    notes,
    promotions,
    snackbar,
    user,
    matieres,
    UeMatieres
  },
  strict: debug,
})