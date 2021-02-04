const defaultColor = "red"
const defaultTimeout = 5000
const defaultText = ""


// initial state
const state = () => ({
  display: false,
  text: defaultText,
  timeout: defaultTimeout,
  color: defaultColor
})

// actions
const actions = {
  error({ commit }, snackbar) {
    snackbar.color = "red"
    commit("OPEN", snackbar)
  },
  success({ commit }, snackbar) {
    snackbar.color = "green"
    commit("OPEN", snackbar)
  },
  open({ commit }, snackbar) {
    commit("OPEN", snackbar)
  },
  close({ commit }) {
    commit("CLOSE")
  },
  setDisplay({ commit }, display) {
    commit("SET_DISPLAY", display)
  }
}

// mutations
const mutations = {
  OPEN(state, { text, color = defaultColor, timeout = defaultTimeout }) {
    state.display = true
    state.timeout = timeout
    state.text = text
    state.color = color
  },
  CLOSE(state) {
    state.display = false
    state.timeout = defaultTimeout
    state.text = defaultText
    state.color = defaultColor
  },
  SET_DISPLAY(state, display) {
    state.display = display
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}