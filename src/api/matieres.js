/**
 * Mocking client-server processing
 */
const matieres = [
    {
        id: 1,
        promoId: 1,
        name: "maths",
        eleves: [
            {
                id: 1,
                nom: "Grard",
                prenom: "Corentin",
                note: "",
            },
            {
                id: 2,
                nom: "Tinnes",
                prenom: "Matthieu",
                note: "",
            },
            {
                id: 3,
                nom: "Crepin",
                prenom: "Lea",
                note: "14",
            }
        ]
    },
    {
        id: 2,
        promoId: 1,
        name: "anglais",
        eleves: [
            {
                id: 2,
                nom: "Tinnes",
                prenom: "Matthieu",
                note: "",
            },
            {
                id: 3,
                nom: "Crepin",
                prenom: "Lea",
                note: "14",
            }
        ]
    },
]

export default {
    getMatieres(cb) {
        setTimeout(() => cb(matieres), 100)
    },
}