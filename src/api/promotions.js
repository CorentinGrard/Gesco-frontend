/**
 * Mocking client-server processing
 */
const promotions = [
    {
        id: 1,
        name: "INFRES11",
    },
    {
        id: 2,
        name: "INFRES12",
    },
    {
        id: 3,
        name: "INFRES13",
    },
    {
        id: 4,
        name: "MKX11",
    },
    {
        id: 5,
        name: "MKX12",
    },
    {
        id: 6,
        name: "CMC6",
    },
    {
        id: 7,
        name: "CMC7",
    },
]

export default {
    getPromotions(cb) {
        setTimeout(() => cb(promotions), 100)
    },
}