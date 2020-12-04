import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import planning from './modules/planning'
import notes from './modules/notes'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    planning,
    notes
  },
  strict: debug,
  plugins: [createPersistedState()],
})