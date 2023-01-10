import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: [true, "Please add a product name!"],
    trim: true,
  },
  sku: {
    type: String,
    required: true,
    default: "SKU",
    trim: true,
  },
  category: {
    type: String,
    required: [true, "Please add a product category!"],
    trim: true,
  },
  quantity: {
    type: String,
    required: [true, "Please add a product quantity!"],
    trim: true,
  },
  price: {
    type: String,
    required: [true, "Please add your product price!"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add your product description!"],
    trim: true,
  },
  image: {
    type: Object,
    default: {},
  },
}, {
  timestamps: true,
});

const Product = mongoose.model("Product", productSchema);
export default Product;
