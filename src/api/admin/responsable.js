/**
 * Mocking client-server processing
 */

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