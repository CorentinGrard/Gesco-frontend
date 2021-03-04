// {
//   "Notes": [
//   {
//     "note": 16.7,
//     "Matiere": {
//       "id": 1,
//       "nom": "Brigitte",
//       "coefficient": 1,
//       "module": {
//         "id": 1,
//         "nom": "eoGp4a",
//         "ects": 3,
//         "semestre": {
//           "id": 1,
//           "nom": "Semestre 1"
//         }
//       }
//     }
//   },
//   {
//     "note": 16.7,
//     "Matiere": {
//       "id": 2,
//       "nom": "Jean",
//       "coefficient": 1,
//       "module": {
//         "id": 1,
//         "nom": "eoGp4a",
//         "ects": 3,
//         "semestre": {
//           "id": 1,
//           "nom": "Semestre 1"
//         }
//       }
//     }
//   }
//   ]}



import backend from '@/plugins/axios';

export default {
  getData_Notes(cb) {
    backend.get("/etudiants/notes")
        .then((response) => cb(response.data))
        .catch((error) => Promise.reject(error))
  },
}