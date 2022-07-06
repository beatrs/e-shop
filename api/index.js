
const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

const dotenv = require("dotenv")
dotenv.config()

const mongoose = require("mongoose")

const userRoute = require("./routes/user")
const userAuth = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

// * connect to mongodb ccloud cluster0
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("db connection successful"))
    .catch((err) => {
        console.error(err)
    })

app.use(express.json())
app.use("/api/users", userRoute)
app.use("/api/auth", userAuth)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("backend server is running at PORT:", PORT)
})