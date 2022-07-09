const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        artist: { type: String, required: false},
        cover: { type: String, required: true },
        coverAlt: { type: String, required: false },
        img: { type: String, required: true },
        imgAlt: { type: String, required: false },
        categories: { type: Array },
        versions: { type: Array },
        price: { type: Number, required: true },
        bg: { type: String, required: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)