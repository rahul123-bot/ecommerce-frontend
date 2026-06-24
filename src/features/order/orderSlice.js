import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderApi,
  getMyOrdersApi,
  updateOrderStatusApi,
  getAllOrdersApi,
  cancelOrderApi,
} from "./orderApi.js";

// Create Order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await createOrderApi(orderData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

// My Orders
export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getMyOrdersApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch orders"
      );
    }
  }
);

// Admin Orders
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getAllOrdersApi();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed"
      );
    }
  }
);

// Update Order Status
export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const { data } = await updateOrderStatusApi(id, status);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed"
      );
    }
  }
);

// Cancel Order
export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (id, thunkAPI) => {
    try {
      const { data } = await cancelOrderApi(id);

      // backend returns:
      // {
      //   success:true,
      //   order: updatedOrder
      // }

      return data.order;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Cancel failed"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",

  initialState: {
    orders: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Get My Orders
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })

      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Status
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload._id
            ? action.payload
            : order
        );
      })

      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Cancel Order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;

        state.orders = state.orders.map((order) =>
          order._id === action.payload._id
            ? action.payload
            : order
        );
      })

      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;