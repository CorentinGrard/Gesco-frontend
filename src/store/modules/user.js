
const state = () => ({
  profile: {},
})

const getters = {
};

const actions = {
  fetch({ commit }, promiseProfile) {
    promiseProfile.then(profile => {
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