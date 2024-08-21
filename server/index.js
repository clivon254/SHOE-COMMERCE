

import express from "express"
import "dotenv/config"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoute from "./route/authRoute.js"
import bodyParser from "body-parser"
import userRoute from "./route/userRoute.js"
import productRoute from "./route/productRoute.js"
import cartRoute from "./route/cartRoute.js"
import reveiwRoute from "./route/reveiwRoute.js"
import orderRoute from "./route/orderRoute.js"


const app = express()

const PORT = 4000 


app.use(cors())

app.use(express.json())

app.use(cookieParser())

app.use(bodyParser.json())


// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))


// ROUTES
app.use('/api/auth', authRoute)

app.use('/api/user', userRoute)

app.use('/api/product', productRoute)

app.use('/api/cart', cartRoute)

app.use('/api/reveiw', reveiwRoute)

app.use('/api/order', orderRoute)



// api
app.get("/", (req,res) => {

    res.send("HELLO SHOE LOVERS")

})


// LISTENING
app.listen(PORT,() => {

    console.log(`Server running on port ${PORT}`)

})


app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 ;

    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })

})
