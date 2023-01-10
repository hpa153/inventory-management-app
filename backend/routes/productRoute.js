import express from "express";

import {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";
import authUser from "../middlewares/authMiddleware.js";
import upload from "../utils/fileUpload.js";

const router = express.Router();

// Create product
router.post("/", authUser, upload.single("image"), createProduct);

// Get products
router.get("/", authUser, getProducts);
router.get("/:id", authUser, getProduct);

// Delete products
router.delete("/:id", authUser, deleteProduct);

// Update product
router.patch("/:id", authUser, upload.single("image"), updateProduct);

export default router;
