import Vue from 'vue'
import Vuex from 'vuex'
import planning from './modules/planning'
import notes from './modules/notes'
import eleves from './modules/admin/eleves'
import promotions from './modules/admin/promotions'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    planning,
    notes,
    eleves,
    promotions
  },
  strict: debug,
})