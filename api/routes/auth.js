
const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// * REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PW_KEY).toString()
    })

    //res.send(newUser)
    try {
        const savedUser = await newUser.save()
        const { password, ...others } = savedUser._doc
        return res.status(201).json(others)
    } catch(err) {
        return res.status(500).json(err)
    }
})

// * LOGIN

router.post("/login", async (req, res) => {
    try {
        errMsg = "Incorrect username/password!"
        const user = await User.findOne({ username: req.body.username })
        if (!user)
            return res.status(401).json(errMsg)

        const pass = CryptoJS.AES.decrypt(user.password, process.env.PW_KEY).toString(CryptoJS.enc.Utf8) 
        if (pass !== req.body.password) 
            return res.status(401).json(errMsg)

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_KEY)
        
        const { password, ...others } = user._doc
        return res.status(200).json({ ...others, token })
    } catch (err) {
        return res.status(500).json(err)
    }
    return
})

module.exports = router