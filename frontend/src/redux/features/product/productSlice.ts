import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { createProduct, newProductProps } from '../../../services/productService';
import { RootState } from '../../store';

export interface productProps {
  product: newProductProps | null,
  products: newProductProps[],
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
};

// Initial state
const initialState: productProps = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
};

// Create new product 
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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    calc_store_value: (state, action: PayloadAction<boolean>) => {
      console.log("object");;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action: PayloadAction<newProductProps>) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfully!");
      })
      .addCase(createNewProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        toast.error("Something went wrong! Please try again!");
      })
  }
});

// Action creators are generated for each case reducer function
export const { calc_store_value, } = productSlice.actions;

export const selectIsLoading = (state: RootState) => state.product.isLoading;

export default productSlice.reducer;