import API from "../../api/axios";

export const getWishlistApi = () => API.get("/wishlist");

export const addWishlistApi = (productId) =>
  API.post("/wishlist/add", { productId });

export const removeWishlistApi = (id) => API.delete(`/wishlist/${id}`);
