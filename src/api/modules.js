import backend from '../plugins/axios';

export default {
    getByPromotions(promotion, cb) {
      backend.get(`/promotions/${promotion}/matieres`)
        .then((response) => cb(response.data))
        .catch((error) => Promise.reject(error))
    },  
  }