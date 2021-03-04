import backend from '@/plugins/axios';

export default {
  getSemestresByPromotion(id, cb) {
    backend.get(`/promotions/${id}/semestres`)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  add(id, semestre, cb) {
    backend.post(`/promotions/${id}/semestre`, semestre)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  update(id, semestre, cb) {
    backend.put(`/semestre/${id}`, semestre)
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  delete(id, cb) {
    backend.delete(`/semestre/${id}`)
      .then(() => cb())
      .catch((error) => Promise.reject(error))
  }
}