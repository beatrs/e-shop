
const router = require("express").Router()
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken")
const Product = require("../models/Product")

// * CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    let categories = [] 
    req.body.categories.forEach(category => {
        category = category.toLowerCase()
        categories.push(category)
    })
    req.body.categories = categories
    
    const newProduct = new Product(req.body)
    try {
        const savedProduct = await newProduct.save()
        return res.status(200).json(savedProduct)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// * UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true})
        return res.status(200).json(updatedProduct)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// * GET PRODUCT
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        return res.status(200).json(product)
    } catch (err) {
        return res.send(500).json(err)
    }
})

//  * GET ALL PRODUCTS
router.get("/", async (req, res) => {
    try {
        const queryNew = req.query.new
        const queryCategory = req.query.category
        
        let products
        if (queryNew) {
            products = await Product.find().sort({ createdAt: -1 }).limit(5)
        } else if (queryCategory) {
            products = await Product.find({
                categories: {
                    $in: [queryCategory]
                },
            })
        } else {
            products = await Product.find()
        }
        return res.status(200).json(products)
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router