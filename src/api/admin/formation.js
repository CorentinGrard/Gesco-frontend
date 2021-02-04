/**
 * Mocking client-server processing
 */

const data_formation = [
    {
        id: 1,
        name: "INFRES",
        responsable: "RespoINFRES"
    },
    {
        id: 2,
        name: "MKX",
        responsable: "RespoMKX"
    },
    {
        id: 3,
        name: "CMC",
        responsable: "RespoCMC"
    }
]

export default {
    getData_Formation(cb) {
        setTimeout(() => cb(data_formation), 100)
    },
}