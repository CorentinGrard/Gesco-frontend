/**
 * Mocking client-server processing
 */
const eleves = [
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

export default {
    getEleves(cb) {
        setTimeout(() => cb(eleves), 100)
    },
}
