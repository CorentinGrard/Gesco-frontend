import userAPI from "@/api/user"

const state = () => ({
  profile: {
    roles: []
  },
})

const getters = {
  getRoles : (state) => {
    return state.profile.roles
  }
};

const actions = {
  fetch({ commit }) {
    userAPI.get(profile => {
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