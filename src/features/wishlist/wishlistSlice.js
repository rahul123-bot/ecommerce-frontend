import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getWishlistApi,
  addWishlistApi,
  removeWishlistApi,
} from "./wishlistAPI";

export const getWishlist = createAsyncThunk(
  "wishlist/getWishlist",

  async () => {
    const { data } = await getWishlistApi();

    return data;
  },
);

export const addWishlist = createAsyncThunk(
  "wishlist/addWishlist",

  async (productId) => {
    const { data } = await addWishlistApi(productId);

    return data;
  },
);

export const removeWishlist = createAsyncThunk(
  "wishlist/removeWishlist",

  async (id) => {
    await removeWishlistApi(id);

    return id;
  },
);
const wishlistSlice = createSlice({
  name: "products",
  initialState: {
    wishlist: {
      products: [],
    },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder

      // GET WISHLIST
      .addCase(getWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(getWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.wishlist = action.payload;
      })

      .addCase(getWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.error.message;
      })

      // ADD WISHLIST
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      // REMOVE WISHLIST
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.wishlist.products = state.wishlist.products.filter(
          (product) => product._id !== action.payload,
        );
      });
  },
});
export default wishlistSlice.reducer;