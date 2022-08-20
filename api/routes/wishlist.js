
const router = require("express").Router()
const { verifyToken, verifyTokenAndAuth } = require("./verifyToken")

const Wish = require("../models/Wishlist")

//* CREATE
router.post("/", async (req, res) => {
    const newWish = new Wish(req.body)
    console.log(newWish)
    const userExists = await Wish.find({ _user: newWish._user })
    console.log('user exists: ' , newWish._user)
    try {
        let wishlist
        if (!userExists) {
            wishlist = await newWish.save()
        } else {
            console.log('else: ', newWish.products)
            const wishId = await Wish.find(newWish._id)
            wishlist = await Wish.updateOne(
                {_user: newWish._user}, 
                {
                    $addToSet: {
                        products: newWish.products
                    }
                }
            )
            console.log('wish id', wishId)
            console.log('wishlist', wishlist)
        }
        return res.status(200).json(wishlist)
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
})

//* UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedList = await Wish.findByIdAndUpdate()
    } catch (err) {
        return res.status(500).json(err)
    }
})

//* GET WISHLIST by userID
router.get("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const wishlist = await Wishlist.find({ id: req.params.userId })
        return res.status(200).json(wishlist)
    } catch (err) {
        return res.send(500).json(err)
    }
})

module.exports = router