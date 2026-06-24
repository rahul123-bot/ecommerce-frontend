import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import productReducer from "../features/products/productSlice.js";
import cartReducer from "../features/cart/cartSlice.js";
import aiReducer from "../features/Ai/aiSlice.js";
import orderReducer from "../features/order/orderSlice.js";
import wishlistReducer from "../features/wishlist/wishlistSlice.js";
import userReducer from "../features/users/userSlice.js";
import dashboardReducer from "../features/dashboard/dashboardSlice.js";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    ai: aiReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    users: userReducer,
    dashboard: dashboardReducer,
  },
});
