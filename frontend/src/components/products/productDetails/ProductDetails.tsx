import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import './ProductDetails.scss';
import useRedirectLoggedOutUser from '../../../hooks/useRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../../redux/features/auth/authSlice';
import { getSingleProduct } from '../../../redux/features/product/productSlice';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks/hooks';
import { RootState } from '../../../redux/store';
import Card from '../../card/Card';
import { SpinnerImg } from '../../loader/Loader';

const ProductDetails = () => {
  useRedirectLoggedOutUser("/login");
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const {product, isLoading} = useAppSelector((state: RootState) => state.product);

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getSingleProduct(id!));
    }
  }, [isLoggedIn, id, dispatch]);

  const stockStatus = (quantity: number) => {
    return quantity > 0 ? (
      <span className='--color-success'>In Stock</span>
    ) : (
      <span className='--color-danger'>Out Of Stock</span>
    )
  };

  return (
    <div className='product-detail'>
      <h3 className='--mt'>Product Detail</h3>
      <Card cardClass='card'>
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass='group'>
              {product?.image ? (
                <img src={JSON.parse(JSON.stringify(product.image)).filePath} alt="Product" />
              ) : (
                <p>No image available for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(Number(product.quantity))}</h4>
            <hr />
            <h4>
              <span className='badge'>Name:</span>&nbsp;{product.name}
            </h4>
            <p><b>&rarr; SKU:</b> {product.sku}</p>
            <p><b>&rarr; Category:</b> {product.category}</p>
            <p><b>&rarr; Price:</b> ${product.price}</p>
            <p><b>&rarr; Quantity:</b> {product.quantity}</p>
            <p><b>&rarr; Total Value:</b> ${+product.price * +product.quantity}</p>
            <hr />
            <p><b>&rarr; Description:</b></p>
            <div dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(product.description)
            }}>
            </div>
            <hr />
            <code className='--color-dark'>Created at: {product.createdAt.toLocaleString("en-us")}</code><br />
            <code className='--color-dark'>Last updated: {product.updatedAt.toLocaleString("en-us")}</code>
          </div>
        )}
      </Card>
    </div>
  )
};

export default ProductDetails;
