import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import { getCartApi,addToCartApi,removeFromCartApi } from "./cartAPI.js";


// GET CART
export const getCart =
createAsyncThunk(

  "cart/getCart",

  async (_, thunkAPI) => {

    try {

      const { data } =
      await getCartApi() ;

      return data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data ||
        error.message
      );
    }
  }
);

export const addToCart =
createAsyncThunk(

  "cart/addToCart",

  async (productId, thunkAPI) => {

    try {

      const { data } =
      await addToCartApi(productId);

      return data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data||
        error.message
      );
    }
  }
);

export const removeFromCart =
createAsyncThunk(

  "cart/removeFromCart",

  async (productId, thunkAPI) => {

    try {

      const { data } =
      await removeFromCartApi(
        productId
      );

      return data;

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response.data||
        error.message
      );
    }
  }
);


const cartSlice =
createSlice({

  name: "cart",

  initialState: {

    cart: {
      items: [],
    },

    loading: false,

    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

    .addCase(
      getCart.pending,
      (state) => {

        state.loading = true;
      }
    )

    .addCase(
      getCart.fulfilled,
      (state, action) => {

        state.loading = false;

        state.cart =
          action.payload;
      }
    )

    .addCase(
      getCart.rejected,
      (state, action) => {

        state.loading = false;

        state.error =
          action.payload;
      }
    )

    .addCase(
      addToCart.pending,(state)=>{
        state.loading = true;
      }
    )
    .addCase(
      addToCart.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cart =
          action.payload;
      }
    )
    .addCase(
      addToCart.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
    }
    )

    .addCase(
      removeFromCart.pending,(state)=>{
        state.loading = true;
      }
    )
    .addCase(
      removeFromCart.fulfilled,
      (state, action) => {
        state.loading = false;
        state.cart =
          action.payload;
      }
    )
    .addCase(
      removeFromCart.rejected,(state,action)=>{
        state.loading = false;
        state.error = action.payload;
      }
    )
  },
});

export default
cartSlice.reducer;