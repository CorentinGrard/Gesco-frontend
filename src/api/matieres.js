import backend from "../plugins/axios";
export default {
  getByPromotions(promotion, cb) {
    backend
      .get(`/promotions/${promotion}/matieres`)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  postMatiere(idModule, matiere, cb) {
    backend
      .post("/modules/" + idModule + "/matieres", JSON.stringify(matiere))
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  deleteMatiere(idMatiere, cb) {
    backend
      .delete("/matieres/" + idMatiere)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
  putMatiere(idMatiere, matiere, cb) {
    backend
      .put("/matiere/" + idMatiere, JSON.stringify(matiere))
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error));
  },
};
