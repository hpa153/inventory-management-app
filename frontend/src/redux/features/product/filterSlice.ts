import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { createProduct, getProducts } from '../../../services/productService';
import { RootState } from '../../store';
import { newProductProps } from './productSlice';

// Initial state
type filterProps = {
  filteredProducts: newProductProps[];
}

const initialState: filterProps = {
  filteredProducts: [],
};

export const createNewProduct = createAsyncThunk(
  "products/create",
  async (formData: FormData, thunkAPI) => {
    try {
      return await createProduct(formData);
    } catch (error) {
      let message = "";

      if(error instanceof AxiosError) {
        message = (error.response && error.response.data && error.response.data.message) || 
        error.message ||
        error.toString();
        console.log(message);
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    FILTER_PRODUCTS: (state, action: PayloadAction<{ products: newProductProps[], searchValue: string }>) => {
      const { products, searchValue } = action.payload;
      const tempProducts = products.filter((product) => product.name.toLowerCase()
      .includes(searchValue.toLowerCase()) || product.category.toLowerCase().includes(searchValue.toLowerCase()))

      state.filteredProducts = tempProducts;
    },
  },
});

// Action creators are generated for each case reducer function
export const { FILTER_PRODUCTS, } = filterSlice.actions;

export const selectFilteredProducts = (state: RootState) => state.filter.filteredProducts;

export default filterSlice.reducer;