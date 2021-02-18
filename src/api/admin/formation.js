/**
 * Mocking client-server processing
 */

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