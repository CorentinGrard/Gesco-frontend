import Vue from 'vue'
import Vuex from 'vuex'
import planning from './modules/planning'
import promotions from './modules/promotions'
import matieres from './modules/matieres'
import eleves from './modules/eleves'
import semestres from './modules/semestres'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    planning,
    promotions,
    matieres,
    eleves,
    semestres,
  },
  strict: debug,
})