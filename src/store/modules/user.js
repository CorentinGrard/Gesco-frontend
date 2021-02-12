import userAPI from "@/api/user"

const state = () => ({
  profile: {
    roles: []
  },
})

const getters = {
  getRoles: (state) => {
    return state.profile.roles
  },
  isAdmin: (state) => {
    return state.profile.roles.some(role => role === "ROLE_ADMIN")
  },
  isEleve: (state) => {
    return state.profile.roles.some(role => role === "ROLE_ELEVE")
  },
  isIntervenant: (state) => {
    return state.profile.roles.some(role => role === "ROLE_INTERVENANT")
  },
  isResponsableFormation: (state) => {
    return state.profile.roles.some(role => role === "ROLE_RESPONSABLE_FORMATION")
  },
  isAssistantPedagogique: (state) => {
    return state.profile.roles.some(role => role === "ROLE_ASSISTANT_PEDAGOGIQUE")
  }
};

const actions = {
  async fetch({ commit }) {
    await userAPI.get(profile => {
      commit("SET_PROFILE", profile)
    })
  }
};

const mutations = {
  SET_PROFILE(state, profile) {
    state.profile = profile
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};