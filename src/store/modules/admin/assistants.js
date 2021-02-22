import API_Assistant from '../../../api/admin/assistants'

// initial state
const state = () => ({
    assistants: []
})

// getters
const getters = {
    getAssistant: state => {
        return state.assistants
    }
}

// actions
const actions = {
    initAssistants({ commit }) {
        API_Assistant.getAssistants(api_response => {
            commit('initAssistants', api_response)
        })
    },

}

// mutations
const mutations = {
    initAssistants(state, api_response) {
        state.assistants = []
        api_response.forEach(assistant => {
            state.assistants.push({
                id: assistant.id,
                nom_assistant: assistant.Personne.nom + " " + assistant.Personne.prenom,
            })
        })
    }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
