import express from "express"
import authRoutes from "../routes/auth.route.js"
import cookieParser from 'cookie-parser'
import productRoutes from "../routes/product.route.js"

const app = express()
app.use(express.json())
app.use(cookieParser())

// api routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)


export default app