
const router = require("express").Router()
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken")
const Order = require("../models/Order")

// * CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body)
    try {Order
        const savedOrder = await newOrder.save()
        return res.status(200).json(savedOrder)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// * UPDATE
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {new: true})
        return res.status(200).json(updatedOrder)
    } catch (err) {
        return res.status(500).json(err)
    }
})

// * DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json("Order successfully deleted")
    } catch (err) {
        return res.status(500).json(err)
    }
})

// * GET ORDERS by userId
router.get("/:id", verifyTokenAndAuth, async (req, res) => {
    try {
        const orders = await Order.find({ id: req.params.userId })
        return res.status(200).json(orders)
    } catch (err) {
        return res.send(500).json(err)
    }
})

module.exports = router