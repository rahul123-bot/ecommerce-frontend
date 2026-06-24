import API from "../../api/axios";

// ======================
// GET PRODUCTS (ADVANCED)
// ======================
export const getProductApi = (params) =>
  API.get("/products", { params });

// ======================
// SINGLE PRODUCT
// ======================
export const getProductByIdApi = (id) =>
  API.get(`/products/${id}`);

// ======================
// CREATE PRODUCT
// ======================
export const addProductApi = (data) =>
  API.post("/products", data);

// ======================
// UPDATE PRODUCT
// ======================
export const updateProductApi = (id, data) =>
  API.put(`/products/${id}`, data);

// ======================
// DELETE PRODUCT
// ======================
export const deleteProductApi = (id) =>
  API.delete(`/products/${id}`);

// ======================
// ADD REVIEW
// ======================
export const addReviewApi = (id, data) =>
  API.post(`/products/${id}/reviews`, data);

// ======================
// DELETE REVIEW
// ======================
export const deleteReviewApi = (productId, reviewId) =>
  API.delete(`/products/${productId}/reviews/${reviewId}`);

// ======================
// SEARCH SUGGESTIONS
// ======================
export const getSuggestionsApi = (keyword) =>
  API.get(`/products/suggestions?keyword=${keyword}`);
