import asyncHandler from "express-async-handler";
import * as Cloudinary from "cloudinary";

import Product from "../models/productModel.js";
import { fileSizeFormatter } from "../utils/fileUpload.js";

const createProduct = asyncHandler(async (req, res) => {
  const { name, sku, category, price, quantity, description } = req.body;
  
  // Validate input
  if(!name || !sku || !category || !price || !quantity || !description) {
    res.status(400);
    throw new Error("Please fill in all required fields!");
  }

  // Image upload
  let fileData = {};

  if(req.file) {
    // Save to cloudinary
    let fileToUpload;

    try {
      fileToUpload = await Cloudinary.v2.uploader.upload(req.file.path, {folder: "Inventory_App", resource_type: "image"})
    } catch (error) {
      res.status(500);
      throw new Error("Image not uploaded!");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: fileToUpload.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  // Create product
  const newProduct = await Product.create({
    user: req.user.id,
    name,
    sku,
    category,
    price,
    quantity,
    description,
    image: fileData,
  });

  res.status(201).json(newProduct);
});

// Get products
const getProducts = asyncHandler( async (req, res) => {
  const products = await Product.find({user: req.user.id}).sort("-createdAt");
  res.status(200).json(products);
});

// Get single product
const getProduct = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    res.status(404);
    throw new Error("Product does not exist!");
  }

  // Authorize user to see product
  if(product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  res.status(200).json(product);
});

// Delete product
const deleteProduct = asyncHandler( async (req, res) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
    res.status(404);
    throw new Error("Product does not exist!");
  }

  // Authorize user to see product
  if(product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  
  await product.remove()
  res.status(200).json({message: "Successfully deleted product!"});
});

// Update product
const updateProduct = asyncHandler( async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if(!product) {
    res.status(404);
    throw new Error("Product does not exist!");
  }

  // Authorize user to see product
  if(product.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }
  
  const { name, category, price, quantity, description } = req.body;

  // Image upload
  let fileData = {};

  if(req.file) {
    // Save to cloudinary
    let fileToUpload;

    try {
      fileToUpload = await Cloudinary.v2.uploader.upload(req.file.path, {folder: "Inventory_App", resource_type: "image"})
    } catch (error) {
      res.status(500);
      throw new Error("Image not uploaded!");
    }

    fileData = {
      fileName: req.file.originalname,
      filePath: fileToUpload.secure_url,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2),
    }
  }

  // Update product
  const updatedProduct = await Product.findByIdAndUpdate({_id: productId}, {
    name,
    category,
    price,
    quantity,
    description,
    image: Object.keys(fileData).length === 0 ? product?.image : fileData,
  }, {
    new: true,
    runValidators: true,
  });

  res.status(200).json(updatedProduct);
});

export {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
}
