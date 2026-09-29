import express from "express"
import authRoutes from "../routes/auth.route.js"
import cookieParser from 'cookie-parser'
import productRoutes from "../routes/product.route.js"
import morgan from 'morgan'
import multer from "multer"

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Each image must be 1 MB or smaller",
      });
    }

    if (err.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        success: false,
        message: "You can upload a maximum of 5 images",
      });
    }

    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  next(err);
});



app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running on Vercel!' });
});

// Base route to verify the deployment is working
app.get('/', (req, res) => {
  res.send('Backend server is running successfully on Vercel!');
});

// A standard /api base route
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the API engine' });
});

// api routes
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)


export default app