import { useEffect } from 'react';

import useRedirectLoggedOutUser from '../../hooks/useRedirectLoggedOutUser';
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice';
import { getAllProducts } from '../../redux/features/product/productSlice';
import { useAppSelector, useAppDispatch } from '../../redux/hooks/hooks';
import { RootState } from '../../redux/store';
import ProductList from '../../components/products/productList/ProductList';
import ProductSummary from '../../components/products/productSummary/ProductSummary';


const Dashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const {products, isLoading} = useAppSelector((state: RootState) => state.product);

  useEffect(() => {
    if(isLoggedIn) {
      dispatch(getAllProducts());
    }
  }, [isLoggedIn, dispatch]);

  return (
    <div>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading={isLoading} />
    </div>
  )
};

export default Dashboard;