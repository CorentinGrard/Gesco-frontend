/**
 * Mocking client-server processing
 */
const data_promotion = [
    {
        id: 1,
        name: "INFRES11",
        formation: "INFRES",
        assistant: "Catherine"
    },
    {
        id: 3,
        name: "MKX4",
        formation: "MKX",
        assistant: "M.Robot"
    },
    {
        id: 2,
        name: "INFRES12",
        formation: "INFRES",
        assistant: "M.Ordi"
    }
]

export default {
    getData_Promotion(cb) {
        setTimeout(() => cb(data_promotion), 100)
    },
}