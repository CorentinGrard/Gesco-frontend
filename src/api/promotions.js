/**
 * Mocking client-server processing
 */
const promotions = [
  {
    id: 1,
    name: "INFRES11",
  },
  {
    id: 2,
    name: "INFRES12",
  },
  {
    id: 3,
    name: "INFRES13",
  },
  {
    id: 4,
    name: "CMC0",
  }
]

// import axios from '../plugins/axios';

export default {
  getPromotions(cb) {
    setTimeout(() => cb(promotions), 100)
    // axios.backend.get("/promotions")
    //   .then((response) => cb(response.data))
    //   .catch((error) => Promise.reject(error))
  },
}