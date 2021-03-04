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
  getModulesAsNameList: (state) => {
    let nameList = [];
    state.dataModule.forEach((module) => {
      nameList.push(module.name);
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
  getModuleByPromotion({ commit }, selectedPromotion) {
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
            id: matiere_response.module.id,
            nom: matiere_response.module.nom,
          },
          coefficient: matiere_response.coefficient,
          nombreHeuresAPlacer: matiere_response.nombreHeuresAPlacer,
          intervenant: "M.Robot",
        };
        newMatiere.module.name = matiere.module.nom;
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
    ApiMatieres.putMatiere(matiere.id, matiereApi, () => {
      commit("editMatiere", { matiereIndex, matiere });
    });
  },
  deleteMatiere({ commit }, { editedIndex, editedId }) {
    ApiMatieres.deleteMatiere(editedId, () => {
      commit("deleteMatiere", editedIndex);
    });
  },
  addModule({ commit }, module) {
    let moduleApi = {
      nom: module.nom,
      ects: module.ects,
    };
    ApiModules.postModule(module.semestre.id, moduleApi, (module_response) => {
      let newModule = {
        id: module_response.id,
        nom: module_response.nom,
        ects: module_response.ects,
        semestre: {
          id: module_response.semestre.id,
          name: module_response.semestre.name,
        },
      };
      newModule.semestre.name = module.semestre.nom;
      commit("addModule", newModule);
    });
  },
  editModule({ commit }, { moduleIndex, module }) {
    let moduleApi = {
      id: module.id,
      nom: module.nom,
      ects: module.ects,
      semestre_id: module.semestre.id,
    };
    ApiModules.putModule(moduleApi, () => {
      module.semestre.name = module.semestre.nom;
      commit("editModule", { moduleIndex, module });
    });
  },
  deleteModule({ commit }, { editedIndex, editedId }) {
    ApiModules.deleteModule(editedId, () => {
      commit("deleteModule", editedIndex);
    });
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
            module: { id: moduleId, nom: moduleName },
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
  addModule(state, module) {
    state.dataModule.push(module);
  },
  editModule(state, { moduleIndex, module }) {
    Object.assign(state.dataModule[moduleIndex], module);
  },
  deleteModule(state, moduleIndex) {
    state.dataModule.splice(moduleIndex, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
