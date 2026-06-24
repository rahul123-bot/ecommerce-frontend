import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProductApi,
  getProductByIdApi,
  addProductApi,
  updateProductApi,
  deleteProductApi,
  addReviewApi,
  deleteReviewApi,
  getSuggestionsApi,
} from "./productAPI.js";

/* =========================
   GET PRODUCTS (SEARCH + FILTER + PAGINATION)
========================= */
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (params = {}, thunkAPI) => {
    try {
      const { data } = await getProductApi(params);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getSuggestions = createAsyncThunk(
  "products/getSuggestions",
  async (keyword, thunkAPI) => {
    try {
      const { data } = await getSuggestionsApi(keyword);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   GET SINGLE PRODUCT
========================= */
export const getProductsById = createAsyncThunk(
  "products/getProductsById",
  async (id, thunkAPI) => {
    try {
      const { data } = await getProductByIdApi(id);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   ADD PRODUCT
========================= */
export const addProducts = createAsyncThunk(
  "products/addProducts",
  async (productData, thunkAPI) => {
    try {
      const { data } = await addProductApi(productData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   UPDATE PRODUCT
========================= */
export const updateProducts = createAsyncThunk(
  "products/updateProducts",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await updateProductApi(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProducts = createAsyncThunk(
  "products/deleteProducts",
  async (id, thunkAPI) => {
    try {
      await deleteProductApi(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   ADD REVIEW
========================= */
export const addReview = createAsyncThunk(
  "products/addReview",
  async ({ id, data }, thunkAPI) => {
    try {
      const response = await addReviewApi(id, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   DELETE REVIEW
========================= */
export const deleteReview = createAsyncThunk(
  "products/deleteReview",
  async ({ productId, reviewId }, thunkAPI) => {
    try {
      await deleteReviewApi(productId, reviewId);
      return reviewId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/* =========================
   INITIAL STATE
========================= */
const initialState = {
  products: [],
  product: null,

  suggestions: [],

  loading: false,
  reviewLoading: false,

  error: null,

  // pagination support
  totalPages: 0,
  currentPage: 1,
  totalProducts: 0,
};

/* =========================
   SLICE
========================= */
const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    clearProduct(state) {
      state.product = null;
    },
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* GET PRODUCTS */
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || action.payload;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 1;
        state.totalProducts = action.payload.totalProducts || 0;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      /* GET SUGGESTIONS */
      .addCase(getSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      })
      /* SINGLE PRODUCT */
      .addCase(getProductsById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProductsById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductsById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* ADD PRODUCT */
      .addCase(addProducts.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      })

      /* UPDATE PRODUCT */
     
.addCase(updateProducts.fulfilled, (state, action) => {
  // 1. Sync the master array list
  state.products = state.products.map((p) =>
    p._id === action.payload._id ? action.payload : p,
  );
  
  // 2. Sync the currently open view product so form panels & previews update instantly
  if (state.product && state.product._id === action.payload._id) {
    state.product = action.payload;
  }
})

      /* DELETE PRODUCT */
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      })

      /* SEARCH PRODUCTS */

      /* ADD REVIEW */
      .addCase(addReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviewLoading = false;
        state.product = action.payload;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      })

      /* DELETE REVIEW */
      .addCase(deleteReview.pending, (state) => {
        state.reviewLoading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.reviewLoading = false;

        if (state.product) {
          state.product.reviews = state.product.reviews.filter(
            (r) => r._id !== action.payload,
          );

          state.product.numReviews = state.product.reviews.length;

          state.product.rating =
            state.product.reviews.length > 0
              ? state.product.reviews.reduce(
                  (acc, item) => acc + item.rating,
                  0,
                ) / state.product.reviews.length
              : 0;
        }
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.reviewLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProduct, clearError } = productSlice.actions;
export default productSlice.reducer;
