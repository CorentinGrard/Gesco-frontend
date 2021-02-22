import APIPromotions from '@/api/admin/promotions'

// initial state
const state = () => ({
  promotions: [],
  selectedPromotion: {},
  promotions_list: []
})

// getters
const getters = {

  getPromotions: state => {
    return state.promotions_list
  },

}

// actions
const actions = {

  initPromotions({ commit }) {
    APIPromotions.getPromotions(promotion_response => {
      commit('initPromotions', promotion_response)
    })
  },

  addPromotion({ commit }, promotion) {

    let promotionAPIformat =
        {
          "idFormation": promotion.idFormation,
          "idAssistant": promotion.idAssistant,
          "nom": promotion.nom
        }

    APIPromotions.post_Promotion(
        promotionAPIformat,
        promotion_response => {
          console.log(promotion_response)
          commit("addPromotion", promotion_response)
        }
    )
  },

  removePromotion({ commit }, {editedIndex, editedItem}) {
    APIPromotions.delete_Promotion(
        editedItem.id
    )
    commit('removePromotion', editedIndex)
  },

  editPromotion({ commit }, {editedIndex, editedItem}) {

    let promotionAPIformat =
        {
          "idFormation": editedItem.idFormation,
          "idAssistant": editedItem.idAssistant,
          "nom": editedItem.nom
        }

    APIPromotions.put_Promotion(
        editedItem.id,
        promotionAPIformat,
        promotion_response => {
          editedItem.nomPromotion = promotion_response.nomPromotion
          editedItem.assistant = promotion_response.assistant.Personne.nom + " " + promotion_response.assistant.Personne.prenom
          editedItem.formation = promotion_response.formation.nom
          console.log(editedItem)
          commit('editPromotion', {editedIndex, editedItem})
        }
    )
  },

  fetchPromotions({ state, commit }) {
    if (state.promotions.length === 0) {
      APIPromotions.getPromotions(promotions => {
        commit('setPromotions', promotions)
      })
    }
  },

  setSelectedPromotion({ commit }, selectedPromotion) {
    commit('setSelectedPromotion', selectedPromotion)
  },

}

// mutations
const mutations = {

  setPromotions(state, promotions) {
    state.promotions = promotions
  },
  setSelectedPromotion(state, selectedPromotion) {
    state.selectedPromotion = selectedPromotion
  },

  initPromotions(state, promotion_response) {
    state.promotions_list = []
    promotion_response.forEach(promotion => {
      state.promotions_list.push({
        id: promotion.id,
        nom: promotion.nom,
        nomPromotion: promotion.nomPromotion,
        assistant: promotion.assistant.Personne.nom + " " + promotion.assistant.Personne.prenom,
        idAssistant: promotion.assistant.id,
        formation: promotion.formation.nom,
        idFormation: promotion.formation.id
      })
    })
  },
  addPromotion(state, {promotion_response}) {
    let new_promotion = {
      id: promotion_response.id,
      nom: promotion_response.nom,
      nomPromotion: promotion_response.nomPromotion,
      assistant: promotion_response.assistant.Personne.nom + " " + promotion_response.assistant.Personne.prenom,
      idAssistant: promotion_response.assistant.id,
      formation: promotion_response.formation.nom,
      idFormation: promotion_response.formation.id
    }
    console.log(new_promotion)
    state.promotions_list.push(new_promotion)
  },
  removePromotion(state, index) {
    state.promotions_list.splice(index, 1)
  },
  editPromotion(state, {editedIndex, editedItem}){
    Object.assign(state.promotions_list[editedIndex], editedItem)
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}