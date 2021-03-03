/**
 * Mocking client-server processing
 */
// const promotions = [
//   {
//     "id": 1,
//     "nom": "11",
//     "semestres": [
//       {
//         "id": 1,
//         "nom": "Semestre 1"
//       }
//     ],
//     "formation": {
//       "id": 1,
//       "nom": "CMC",
//       "isAlternance": true
//     },
//     "assistant": {
//       "id": 1
//     },
//     "nomPromotion": "CMC 11"
//   },
//   {
//     "id": 2,
//     "nom": "11",
//     "semestres": [
//       {
//         "id": 2,
//         "nom": "Semestre 2"
//       }
//     ],
//     "formation": {
//       "id": 2,
//       "nom": "MKX",
//       "isAlternance": true
//     },
//     "assistant": {
//       "id": 2
//     },
//     "nomPromotion": "MKX 11"
//   }
// ]

import backend from '@/plugins/axios';

export default {
  getPromotions(cb) {
    backend.get("/promotions")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
  post_Promotion(promotion, cb) {
    backend.post("/promotions", JSON.stringify(promotion))
        .then((response) => cb(response.data))
        .catch((error) => Promise.reject(error))
  },
  delete_Promotion(id_promotion) {
    backend.delete("/promotion/" + id_promotion)
        .then()
        .catch((error) => Promise.reject(error))
  },
  put_Promotion(id_promotion, promotion, cb) {
    backend.put("/promotion/" + id_promotion, JSON.stringify(promotion))
        .then((response) => cb(response.data))
        .catch((error) => Promise.reject(error))
  }

}