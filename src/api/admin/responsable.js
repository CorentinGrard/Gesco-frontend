/**
 * Mocking client-server processing
 */

const data_responsable = [
    {
        id: 1,
        nom: "INFRES",
        prenom: "Respo"
    },
    {
        id: 2,
        nom: "MKX",
        prenom: "Respo"
    },
    {
        id: 3,
        nom: "CMC",
        prenom: "Respo"
    }
]



export default {
    getData_Responsable(cb) {
        setTimeout(() => cb(data_responsable), 100)
    },
}