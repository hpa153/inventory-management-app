import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductForm from '../../components/products/productForm/ProductForm';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { updateAProduct, getSingleProduct, selectIsLoading, selectProduct, getAllProducts } from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import { initialProduct } from '../addProduct/AddProduct';

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectIsLoading);
  const productToEdit = useAppSelector(selectProduct);
  const [product, setProduct] = useState(productToEdit);
  const [productImage, setProductImage] = useState<null | File>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    dispatch(getSingleProduct(id!));
  }, [dispatch, id]);

  useEffect(() => {
    setProduct(productToEdit);
    setImagePreview(productToEdit && productToEdit.image ? `${JSON.parse(JSON.stringify(productToEdit.image)).filePath}` : "");
    setDescription(productToEdit && productToEdit.description ? productToEdit.description : "");
  }, [productToEdit]);

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    if(product) {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files) {
      setProductImage(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", product!.name);
    formData.append("sku", product!.sku);
    formData.append("category", product!.category);
    formData.append("quantity", product!.quantity);
    formData.append("price", product!.price);
    formData.append("description", description);
    
    if (productImage){
      formData.append("image", productImage);
    }
    
    if (id) {
      dispatch(updateAProduct({id, formData}));
      await dispatch(getAllProducts());
      navigate("/dashboard");
    }
  };

  return (
    <div>
      {isLoading && <Loader />}
      <h3 className="--mt">Edit Product</h3>
      <ProductForm
        product={product ?? initialProduct} 
        imagePreview={imagePreview} 
        description={description} 
        setDescription={setDescription} 
        handleFormInput={handleFormInput} 
        handleImageChange={handleImageChange} 
        saveProduct={saveProduct} 
      />
    </div>
  )
};

export default EditProduct;
