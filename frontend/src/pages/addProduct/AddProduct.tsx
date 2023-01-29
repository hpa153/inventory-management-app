import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';

import ProductForm from '../../components/productForm/ProductForm';
import { selectIsLoading, createNewProduct } from '../../redux/features/product/productSlice';
import { createProduct } from '../../services/productService';

const initialProduct = {
  name: "",
  category: "",
  quantity: "",
  price: "",
};

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(initialProduct);
  const [productImage, setProductImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const isLoading = useAppSelector(selectIsLoading);

  const { name, category, quantity, price } = product;

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleImagechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const generateSKU = (category: string) => {
    const skuStart = category.slice(0, 3).toUpperCase();
    const skuNumber = Date.now();
    return skuStart + skuNumber;
  }

  const saveProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("sku", generateSKU(category));
    formData.append("category", category);
    formData.append("quantity", quantity);
    formData.append("price", price);
    formData.append("description", description);
    
    if (productImage){
      formData.append("image", productImage);
    }

    formData = JSON.parse(JSON.stringify(formData.entries()));
    
    dispatch(createNewProduct(formData));
    navigate("/dashboard");
  };

  return (
    <div>
      <h3 className="--mt">Add New Product</h3>
      <ProductForm
        product={product}
        productImage={productImage} 
        imagePreview={imagePreview} 
        description={description} 
        setDescription={setDescription} 
        handleFormInput={handleFormInput} 
        saveProduct={saveProduct} 
      />
    </div>
  )
};

export default AddProduct;
