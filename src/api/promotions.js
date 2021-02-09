/**
 * Mocking client-server processing
 */
// const promotions = [
//   {
//     id: 1,
//     nomPromotion: "INFRES11",
//   },
//   {
//     id: 2,
//     nomPromotion: "INFRES12",
//   },
//   {
//     id: 3,
//     nomPromotion: "INFRES13",
//   },
//   {
//     id: 4,
//     nomPromotion: "CMC0",
//   }
// ]

import backend from '@/plugins/axios';

export default {
  getPromotions(cb) {
    backend.get("/promotions")
      .then((response) => cb(response.data))
      .catch((error) => Promise.reject(error))
  },
}