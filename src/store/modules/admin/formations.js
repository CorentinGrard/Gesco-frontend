import formationAPI from "../../../api/admin/formation";

// initial state
const state = () => ({
  data_formations: [],
});

// getters
const getters = {
  getFormations: (state) => {
    let formations_list = [];
    state.data_formations.forEach((formation) => {
      formations_list.push({
        id: formation.id,
        name: formation.nom,
        nom: formation.nom,
        isAlternance: formation.isAlternance,
        responsable: formation.responsable,
      });
    });
    return formations_list;
  },
};

// actions
const actions = {
  initFormations({ commit }) {
    formationAPI.get_Formations((formations) => {
      commit("initLocalFormations", formations);
    });
  },
  addFormation({ commit }, formation) {
    formation.idPersonne = formation.responsable.id;
    delete formation["responsable"];
    formation.isAlternance = true;
    formationAPI.add_Formation(formation, (formation) => {
      commit("addLocalFormation", formation);
    });
  },
  editFormation({ commit }, formation) {
    delete formation["name"];
    formation.idPersonne = formation.responsable.id;
    delete formation["responsable"];
    formationAPI.update_Formation(formation.id, formation, (formation) => {
      commit("updateLocalFormation", formation);
    });
  },
  removeFormation({ commit }, { id, index }) {
    formationAPI.delete_Formation(id, () => {
      commit("removeLocalFormation", index);
    });
  },
};

// mutations
const mutations = {
  initLocalFormations(state, formations) {
    state.data_formations = [];
    formations.forEach((formation) => {
      state.data_formations.push({
        id: formation.id,
        isAlternance: formation.isAlternance,
        nom: formation.nom,
        responsable: {
          id: formation.responsable.Personne.id,
          nom:
            formation.responsable.Personne.prenom +
            " " +
            formation.responsable.Personne.nom,
        },
      });
    });
  },
  addLocalFormation(state, formation) {
    let new_formation = {
      id: formation.id,
      isAlternance: formation.isAlternance,
      nom: formation.nom,
      responsable: {
        id: formation.responsable.Personne.id,
        nom:
          formation.responsable.Personne.prenom +
          " " +
          formation.responsable.Personne.nom,
      },
    };
    state.data_formations.push(new_formation);
  },
  addFormation(state, formation) {
    state.data_formations.push(formation);
  },
  updateLocalFormation(state, formation) {
    console.log("updateLocalFormation");
    console.log(formation);
    let new_formation = {
      id: formation.id,
      isAlternance: formation.isAlternance,
      nom: formation.nom,
      responsable: {
        id: formation.responsable.Personne.id,
        nom:
          formation.responsable.Personne.prenom +
          " " +
          formation.responsable.Personne.nom,
      },
    };
    Object.assign(
      state.data_formations.find(
        (formation) => formation.id === new_formation.id
      ),
      new_formation
    );
  },

  removeLocalFormation(state, index) {
    state.data_formations.splice(index, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
