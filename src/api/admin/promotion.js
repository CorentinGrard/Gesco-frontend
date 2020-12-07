/**
 * Mocking client-server processing
 */
const data_promotion = [
    {
        id: 1,
        name: "INFRES11",
        eleve: [
            {
                id: 1,
                lastname: "eleve1",
                firstname : "eleve1"
            },
            {
                id: 2,
                lastname: "eleve2",
                firstname : "eleve2"
            }]
    },
    {
        id: 2,
        name: "INFRES12",
        eleve: [
            {
                id: 3,
                lastname: "eleve3",
                firstname: "eleve3"
            },
            {
                id: 4,
                lastname: "eleve4",
                firstname: "eleve4"
            }]
    }
]

export default {
    getData_Promotion(cb) {
        setTimeout(() => cb(data_promotion), 100)
    },
}