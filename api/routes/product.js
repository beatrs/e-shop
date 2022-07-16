
const mongoose = require("mongoose")
const router = require("express").Router()
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken")
const Product = require("../models/Product")

const multer = require("multer")


// ! file handling
//*local storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const prefix = new Date().toISOString().split('T')[0].replaceAll('-','')
        const newName = prefix + '_' + file.originalname
        cb(null, newName)
    }
})

const fileFilter = (req, file, cb) => {
    // reject certain file formats
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer({ storage })


// * CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, upload.single('cover'), async (req, res) => {
    console.log(req.file)
    let categories = [] 
    if (req.body.categories) {
        req.body.categories.forEach(category => {
            category = category.toLowerCase()
            categories.push(category)
        })
        req.body.categories = categories
    }

    const newProduct = new Product({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        cover: req.file.path,
        coverAlt: req.body.coverAlt,
        img: req.file.path,
        imgAlt: req.body.imgAlt,
        categories: req.body.categories,
        versions: req.body.versions
    })

    if (!newProduct.img) {
        newProduct.img = newProduct.cover
        newProduct.imgAlt = newProduct.coverAlt
    }
    
    // if (!req.body.img && req.body.cover) {
    //     req.body.img = req.body.cover
    //     req.body.imgAlt = req.body.coverAlt
    // }
    // const newProduct = new Product(req.body)
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