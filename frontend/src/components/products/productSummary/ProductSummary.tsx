import { useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";

import './ProductSummary.scss';
import InfoBox from '../../infoBox/InfoBox';
import { newProductProps } from '../../../redux/features/product/productSlice';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORIES, selectTotalStoreValue, selectOutOfStock, selectCategories } from "../../../redux/features/product/productSlice";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x: string) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({products}: {products: newProductProps[]}) => {
  const dispatch = useAppDispatch();
  const totalStoreValue = useAppSelector(selectTotalStoreValue);
  const outOfStock = useAppSelector(selectOutOfStock);
  const totalCategories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALC_OUT_OF_STOCK(products));
    dispatch(CALC_CATEGORIES(products));
  }, [dispatch, products]);

  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox 
          bgColor="card1" 
          title="Total Products" 
          count={products.length} 
          icon={productIcon} 
        />
        <InfoBox 
          bgColor="card2" 
          title="Total Store value" 
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          icon={earningIcon} 
        />
        <InfoBox 
          bgColor="card3" 
          title="Out Of Stock" 
          count={outOfStock} 
          icon={outOfStockIcon} 
        />
        <InfoBox 
          bgColor="card4" 
          title="All Categories" 
          count={totalCategories.length} 
          icon={categoryIcon} 
        />
      </div>
    </div>
  )
};

export default ProductSummary;
