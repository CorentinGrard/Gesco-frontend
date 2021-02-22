/**
 * Mocking client-server processing
 */
// const data_assistants = [
//   {
//     "id": 1,
//     "Personne": {
//       "id": 5,
//       "nom": "Schamberger",
//       "prenom": "Mikayla",
//       "email": "mikayla.schamberger@mines-ales.fr",
//       "adresse": "1355 Braun Island Apt. 220\nNew Erwin, HI 88849",
//       "numeroTel": "(784) 806-3779 x46952"
//     },
//     "promotions": [
//       {
//         "id": 13,
//         "nomPromotion": "CMC 15"
//       },
//       {
//         "id": 10,
//         "nomPromotion": "CMC 14"
//       },
//       {
//         "id": 7,
//         "nomPromotion": "CMC 13"
//       },
//       {
//         "id": 4,
//         "nomPromotion": "CMC 12"
//       },
//       {
//         "id": 1,
//         "nomPromotion": "CMC 11"
//       }
//     ]
//
// ]

import backend from '@/plugins/axios';

export default {
    getAssistants(cb) {
        backend.get("/assistants")
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    },
}
