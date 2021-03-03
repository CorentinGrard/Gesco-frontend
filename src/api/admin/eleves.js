/**
 * Mocking client-server processing
 */
// const data_eleves = [
//   {
//     "id": 1,
//     "nom": "INFRES 11",
//     "Etudiants": [
//       {
//         "Personne": {
//           "id": 4,
//           "nom": "CABANE",
//           "prenom": "Antonin",
//           "email": "antonin.cabane@mines-ales.org",
//           "adresse": "479 Avenue des euzières\n34190 Brissac",
//           "numeroTel": "0750214383"
//         }
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "nom": "11",
//     "Etudiants": []
//   }
// ]

import backend from '@/plugins/axios';

export default {
    getData_Eleves(cb) {
        backend.get("/promotions/etudiants")
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    },
    post_Eleve(id_promotion, eleve, cb) {
        backend.post("/promotion/" + id_promotion + "/etudiant", JSON.stringify(eleve))
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    },
    delete_Eleve(id_eleve) {
        backend.delete("/promotion/etudiant/" + id_eleve)
            .then()
            .catch((error) => Promise.reject(error))
    },
    put_Eleve(id_eleve, eleve) {
        backend.put("/etudiant/" + id_eleve, JSON.stringify(eleve))
            .then()
            .catch((error) => Promise.reject(error))
    },
    put_Eleve_in_Promotion(id_promotion, id_eleve, eleve, cb) {
        backend.put("/promotion/" + id_promotion + "/etudiant/" + id_eleve, JSON.stringify(eleve))
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    }
}
