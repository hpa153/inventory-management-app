import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from "path";
import * as Cloudinary from "cloudinary";

import userRoute from './routes/userRoute.js';
import productRoute from './routes/productRoute.js';
import contactRoute from './routes/contactRoute.js';
import errorHandler from './middlewares/errorMiddleware.js';

dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: [process.env.CLIENT_URL, "https://pa-inventory-manager.vercel.app"],
  credentials: true,
}));

app.use(cookieParser());

// Body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(bodyParser.json());

// Cloudinary
Cloudinary.v2.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

// Routes
const __dirname = path.resolve();
app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contact", contactRoute);

// Error middleware
app.use(errorHandler);

// Connect to mongoDB and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    })
  })
  .catch(err => console.log("Failure connecting DB: " + err))
