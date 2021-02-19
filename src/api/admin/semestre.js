import backend from '@/plugins/axios';
/**
 * Mocking client-server processing
 */

// const semestres = [
//   {
//     id: 1,
//     nom: "S1",
//   },
//   {
//     id: 2,
//     nom: "S2",
//   },
//   {
//     id: 3,
//     nom: "S3",
//   }
// ]

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
  update(id, semestre, cb){
    backend.put(`/semestre/${id}`, semestre)
    .then((response) => cb(response.data))
    .catch((error) => Promise.reject(error))
  },
  delete(id){
    backend.delete(`/semestre/${id}`)
  }
}