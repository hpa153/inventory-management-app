import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/products`;

export type newProductProps = {
  name: string, 
  sku: string, 
  category: string, 
  price: string, 
  quantity: string, 
  description: string,
  image?: File,
}

const createProduct = async (formData: newProductProps) => {
  const response = await axios.post(API_URL, formData);

  return response.data;
};

export {
  createProduct,
}