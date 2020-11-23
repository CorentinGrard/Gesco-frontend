/**
 * Mocking client-server processing
 */
const matieres = [
    {
        id: 1,
        name: "maths",
        etat: "notes non saisi"
    },
    {
        id: 2,
        name: "anglais",
        etat: "notes saisi"
    },
]

export default {
    getMatieres(cb) {
        setTimeout(() => cb(matieres), 100)
    },
}