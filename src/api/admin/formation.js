import backend from '@/plugins/axios';

export default {
  get_Formations(cb) {
    backend.get("/formations")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  add_Formation(formation, cb) {
    backend.post("/formations", JSON.stringify(formation))
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  update_Formation(id_formation, formation, cb) {
    backend.put("/formations/" + id_formation, JSON.stringify(formation))
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  delete_Formation(id_formation, cb) {
    backend.delete("/formations/" + id_formation)
      .then(() => cb())
      .catch((error) => Promise.reject(error))
  }
}
