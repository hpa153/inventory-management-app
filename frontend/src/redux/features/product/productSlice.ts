import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { createProduct, getProducts, deleteProduct, getProduct, updateProduct } from '../../../services/productService';
import { RootState } from '../../store';

export type newProductProps = {
  _id?: string,
  name: string, 
  sku: string, 
  category: string, 
  price: string, 
  quantity: string, 
  description: string,
  image?: File,
  createdAt: Date,
  updatedAt: Date,
}
export interface productProps {
  product: newProductProps | null,
  products: newProductProps[],
  isError: boolean,
  isSuccess: boolean,
  isLoading: boolean,
  totalStoreValue: number,
  outOfStock: number,
  categories: string[],
};

// Initial state
const initialState: productProps = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  totalStoreValue: 0,
  outOfStock: 0,
  categories: [],
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

export const getAllProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      return await getProducts();
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

export const getSingleProduct = createAsyncThunk(
  "products/getProduct",
  async (id: string, thunkAPI) => {
    try {
      return await getProduct(id);
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

export const deleteAProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, thunkAPI) => {
    try {
      return await deleteProduct(id);
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

export const updateAProduct = createAsyncThunk(
  "products/updateProduct",
  async ({id, formData}: {id: string, formData: FormData}, thunkAPI) => {
    try {
      return await updateProduct(id, formData);
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

const setStates = (state: productProps, isLoading: boolean, isError: boolean, isSuccess: boolean) => {
  state.isLoading = isLoading;
  state.isSuccess = isSuccess;
  state.isError = isError;
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_STORE_VALUE: (state, action: PayloadAction<newProductProps[]>) => {
      const products = action.payload;
      state.totalStoreValue = products
      .map((item) => Number(item.price) * Number(item.quantity))
      .reduce((num, total) => total + num, 0);
    },
    CALC_OUT_OF_STOCK: (state, action: PayloadAction<newProductProps[]>) => {
      const products = action.payload;
      state.outOfStock = products.filter((item) => +item.quantity === 0).length;
    },
    CALC_CATEGORIES: (state, action: PayloadAction<newProductProps[]>) => {
      const products = action.payload;
      state.categories = [...new Set(products.map((item) => item.category))];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewProduct.pending, (state) => {
        setStates(state, true, false, false);
      })
      .addCase(createNewProduct.fulfilled, (state, action: PayloadAction<newProductProps>) => {
        setStates(state, false, true, false);
        state.products.push(action.payload);
        toast.success("Product added successfully!");
      })
      .addCase(createNewProduct.rejected, (state) => {
        setStates(state, false, false, true);
        toast.error("Something went wrong! Please try again!");
      })
      .addCase(getAllProducts.pending, (state) => {
        setStates(state, true, false, false);
      })
      .addCase(getAllProducts.fulfilled, (state, action: PayloadAction<newProductProps[]>) => {
        setStates(state, false, true, false);
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state) => {
        setStates(state, false, false, true);
        toast.error("Something went wrong! Please try again!");
      })
      .addCase(deleteAProduct.pending, (state) => {
        setStates(state, true, false, false);
      })
      .addCase(deleteAProduct.fulfilled, (state) => {
        setStates(state, false, true, false);
        toast.success("Successfully deleted product!");
      })
      .addCase(deleteAProduct.rejected, (state) => {
        setStates(state, false, false, true);
        toast.error("Something went wrong! Please try again!");
      })
      .addCase(getSingleProduct.pending, (state) => {
        setStates(state, true, false, false);
      })
      .addCase(getSingleProduct.fulfilled, (state, action: PayloadAction<newProductProps>) => {
        setStates(state, false, true, false);
        state.product = action.payload;
      })
      .addCase(getSingleProduct.rejected, (state) => {
        setStates(state, false, false, true);
        toast.error("Something went wrong! Please try again!");
      })
      .addCase(updateAProduct.pending, (state) => {
        setStates(state, true, false, false);
      })
      .addCase(updateAProduct.fulfilled, (state, action: PayloadAction<newProductProps>) => {
        setStates(state, false, true, false);
        state.product = action.payload;
        toast.success("Successfully updated product!!");
      })
      .addCase(updateAProduct.rejected, (state) => {
        setStates(state, false, false, true);
        toast.error("Something went wrong! Please try again!");
      })
  }
});

// Action creators are generated for each case reducer function
export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORIES } = productSlice.actions;

export const selectIsLoading = (state: RootState) => state.product.isLoading;
export const selectTotalStoreValue = (state: RootState) => state.product.totalStoreValue;
export const selectOutOfStock = (state: RootState) => state.product.outOfStock;
export const selectCategories = (state: RootState) => state.product.categories;
export const selectProduct = (state: RootState) => state.product.product;

export default productSlice.reducer;