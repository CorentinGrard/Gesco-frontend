/**
 * Mocking client-server processing
 */

 /*
const data_formation = [
    {
        id: 1,
        name: "INFRES",
        responsable: 
            {
                id: 1,
                nom: "INFRES",
                prenom: "Respo"
            }
    },
    {
        id: 2,
        name: "MKX",
        responsable:
            {
                id: 2,
                nom: "MKX",
                prenom: "Respo"
            }
    },
    {
        id: 3,
        name: "CMC",
        responsable:
            {
                id: 3,
                nom: "CMC",
                prenom: "Respo"
            }
    }
]

export default {
    getData_Formation(cb) {
        setTimeout(() => cb(data_formation), 100)
    },
}
*/

import backend from '@/plugins/axios';

export default {
    getData_Formation(cb) {
        backend.get("/formations")
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    },
    post_Formation(formation, cb) {
        backend.post("/formations", JSON.stringify(formation))
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    },
    put_Formation(id_formation, formation, cb) {
        backend.put("/formations/" + id_formation, JSON.stringify(formation))
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    },
    delete_Formation(id_formation) {
        backend.delete("/formations/" + id_formation)
            .then()
            .catch((error) => Promise.reject(error))
    }
}
