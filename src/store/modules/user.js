import userAPI from "@/api/user"
import roles from "@/roles"

const state = () => ({
  profile: {
    roles: {}
  },
})

const getters = {
  getRoles: (state) => {
    return state.profile.roles
  },
  isAdmin: (state) => {
    return state.profile.roles.admin
  },
  isEtudiant: (state) => {
    return state.profile.roles.etudiant
  },
  isIntervenant: (state) => {
    return state.profile.roles.intervenant
  },
  isResponsableFormation: (state) => {
    return state.profile.roles.responsableFormation
  },
  isAssistantPedagogique: (state) => {
    return state.profile.roles.assistantPedagogique
  }
};

const actions = {
  async fetch({ commit }) {
    await userAPI.get(profile => {
      let newRoles = {}
      profile.roles.forEach(element => {
        let role = roles.find(role => role.role === element)
        if (typeof (role) !== 'undefined') {
          newRoles[role.name] = true
        }
      })
      profile.roles = newRoles
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