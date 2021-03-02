/**
 * Mocking client-server processing
 */
/*
const data_responsable = [
    {
        id: 1,
        nom: "Labbe",
        prenom: "Marine"
    },
    {
        id: 2,
        nom: "Masson",
        prenom: "Valentine"
    },
    {
        id: 3,
        nom: "Moret",
        prenom: "Yan"
    }
]



export default {
    getData_Responsable(cb) {
        setTimeout(() => cb(data_responsable), 100)
    },
}
*/

import backend from '@/plugins/axios';

export default {
    get_Responsables(cb) {
        backend.get("/admin/personnels")
            .then((response) => cb(response.data))
            .catch((error) => Promise.reject(error))
    }
}