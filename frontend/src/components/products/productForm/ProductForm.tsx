import React, { useState } from 'react';
import ReactQuill, { UnprivilegedEditor } from 'react-quill';
import { Delta, Sources } from 'quill';
import 'react-quill/dist/quill.snow.css';

import './ProductForm.scss';
import { initialProductProps } from '../../../pages/addProduct/AddProduct';
import Card from '../../card/Card';

const ProductForm = ({
  product, 
  imagePreview, 
  description, 
  setDescription, 
  handleFormInput,
  handleImageChange, 
  saveProduct,
}: {
  product: initialProductProps, 
  imagePreview: string, 
  description: string, 
  setDescription: (value: string, delta: Delta, source: Sources, editor: UnprivilegedEditor) => void, 
  handleFormInput: React.ChangeEventHandler<HTMLInputElement>, 
  handleImageChange: React.ChangeEventHandler<HTMLInputElement>,
  saveProduct: React.FormEventHandler<HTMLFormElement>
}) => {
  
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <Card cardClass={"group"}>
            <label>Product Image</label>
            <code className="--color-dark">Supported formats: .jpg, .jpeg, .png</code>
            <input type="file" name="image" onChange={(e) => handleImageChange(e)} />
            {imagePreview ? (
              <div className="image-preview">
                <img src={imagePreview} alt="Product" />
              </div>
            ) : (
              <p>No image set for this product</p>
            )}
          </Card>
          <label>Product Name:</label>
          <input 
            type="text" 
            name="name" 
            placeholder="Product Name" 
            value={product.name}
            onChange={handleFormInput}
          />
          <label>Product Category:</label>
          <input 
            type="text" 
            name="category" 
            placeholder="Product Category" 
            value={product.category}
            onChange={handleFormInput}
          />
          <label>Product Price:</label>
          <input 
            type="text" 
            name="price" 
            placeholder="Product Price" 
            value={product.price}
            onChange={handleFormInput}
          />
          <label>Product Quantity:</label>
          <input 
            type="text" 
            name="quantity" 
            placeholder="Product Quantity" 
            value={product.quantity}
            onChange={handleFormInput}
          />
          <label>Product Description:</label>
          <ReactQuill 
            theme="snow" 
            value={description} 
            onChange={setDescription} 
            modules={ProductForm.modules} 
            formats={ProductForm.formats}
          />
          <div className="--my">
            <button className="--btn --btn-primary" type="submit">Save Product</button>
          </div>
        </form>
      </Card>
    </div>
  )
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};

ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
