/**
 * Mocking client-server processing
 */
const data_promotion = [
    {
        id: 1,
        name: "INFRES 11",
        formation: "INFRES",
        assistant: "Catherine"
    },
    {
        id: 3,
        name: "MKX 4",
        formation: "MKX",
        assistant: "M.Robot"
    },
    {
        id: 2,
        name: "INFRES 12",
        formation: "INFRES",
        assistant: "M.Ordi"
    }
]

export default {
    getData_Promotion(cb) {
        setTimeout(() => cb(data_promotion), 100)
    },
}