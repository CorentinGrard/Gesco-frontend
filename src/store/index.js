import Vue from 'vue'
import Vuex from 'vuex'
import planning from './modules/planning'
import promotions from './modules/promotions'
import notes from './modules/notes'
import UeMatieres from './modules/UeMatieres'
import snackbar from './modules/snackbar'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    planning,
    notes,
    UeMatieres,
    promotions,
    snackbar
  },
  strict: debug,
})