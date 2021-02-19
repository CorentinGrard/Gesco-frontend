import ApiMatieres from "@/api/matieres";
import ApiModules from "@/api/modules";
// initial state
const state = () => ({
  dataMatiere: [],
  dataModule: [],
});

// getters
const getters = {
  getMatieresForDisplaying: (state) => {
    return state.dataMatiere;
  },
  getModulesForDisplaying: (state) => {
    return state.dataModule;
  },
  getUeAsNameList: (state) => {
    let nameList = [];
    state.dataUe.forEach((ue) => {
      nameList.push(ue.name);
    });
    return nameList;
  },
};

// actions
const actions = {
  /*getAllMatieres({ commit }) {
        ApiUeMatieres.getDataMatiere(matieres => {
            commit('setMatieres', matieres)
        })
    },*/
  getMatiereByPromotion({ commit }, selectedPromotion) {
    ApiMatieres.getByPromotions(selectedPromotion, (matieres) => {
      commit("setMatieres", matieres);
    });
  },
  getModuleByPromotion({ commit },selectedPromotion) {
    ApiModules.getByPromotions(selectedPromotion, (modules) => {
        commit("setModules", modules);
      });
  },
  addMatiere({ commit }, matiere) {
    let matiereApiFormat = {
      nom: matiere.nom,
      coefficient: matiere.coefficient,
      nombreHeuresAPlacer: matiere.nombreHeuresAPlacer,
    };
    ApiMatieres.postMatiere(
      matiere.module.id,
      matiereApiFormat,
      (matiere_response) => {
        let newMatiere = {
          id: matiere_response.id,
          nom: matiere_response.nom,
          module: {
            id: matiere_response.moduleId,
            name: matiere_response.moduleName,
          },
          coefficient: matiere_response.coefficient,
          nombreHeuresAPlacer: matiere_response.nombreHeuresAPlacer,
          intervenant: "M.Robot",
        };
        commit("addMatiere", newMatiere);
      }
    );
  },
  editMatiere({ commit }, { matiereIndex, matiere }) {
    let matiereApi = {
      nom: matiere.nom,
      coefficient: matiere.coefficient,
      nombreHeuresAPlacer: matiere.nombreHeuresAPlacer,
      module_id: matiere.module.id,
    };
    ApiMatieres.putMatiere(matiere.id, matiereApi);
    commit("editMatiere", { matiereIndex, matiere });
  },
  deleteMatiere({ commit }, { editedIndex, editedId }) {
    ApiMatieres.deleteMatiere(editedId);
    commit("deleteMatiere", editedIndex);
  },
  addUe({ commit }, ue) {
    commit("addUe", ue);
  },
  editUe({ commit }, { ueIndex, ue }) {
    commit("editUe", { ueIndex, ue });
  },
  deleteUe({ commit }, ue) {
    commit("deleteUe", ue);
  },
};

// mutations
const mutations = {
  setMatieres(state, semestres) {
    let finalMatieres = [];
    semestres.forEach(function(item) {
      let modules = item.modules;
      modules.forEach(function(item) {
        let moduleId = item.idModule;
        let moduleName = item.nomModule;
        let matieres = item.matieres;
        matieres.forEach(function(item) {
          finalMatieres.push({
            id: item.idMatiere,
            nom: item.nomMatiere,
            module: { id: moduleId, name: moduleName },
            coefficient: item.coefficient,
            nombreHeuresAPlacer: item.nombreHeuresAPlacer,
            intervenant: "M.Robot",
          });
        });
      });
    });
    state.dataMatiere = finalMatieres;
  },
  setModules(state, modules) {
    let finalModules = [];
    modules.semestres.forEach(function(item) {
        let modulesArray = item.modules;
        let semestreId = item.id;
        let semestreName = item.nom;
        modulesArray.forEach(function(item) {
            finalModules.push({
            id: item.id,
            nom: item.nom,
            semestre: { id: semestreId, name: semestreName },
            ects: item.ects,
        });
      });
    });
    state.dataModule = finalModules;
  },
  addMatiere(state, matiere) {
    state.dataMatiere.push(matiere);
  },
  editMatiere(state, { matiereIndex, matiere }) {
    Object.assign(state.dataMatiere[matiereIndex], matiere);
  },
  deleteMatiere(state, matiereIndex) {
    state.dataMatiere.splice(matiereIndex, 1);
  },
  addUe(state, ue) {
    state.dataModule.push(ue);
  },
  editUe(state, { ueIndex, ue }) {
    Object.assign(state.dataModule[ueIndex], ue);
  },
  deleteUe(state, ueIndex) {
    state.dataModule.splice(ueIndex, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
