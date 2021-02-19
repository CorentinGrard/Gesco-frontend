import backend from "../plugins/axios";

export default {
  getByPromotions(promotion, cb) {
    backend
      .get(`/promotions/${promotion}/matieres`)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  putModule(module, cb) {
    backend
      .put(`/module/${module.id}`)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  deleteModule(moduleId, cb) {
    backend
      .get(`/modules/${moduleId}`)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
};
