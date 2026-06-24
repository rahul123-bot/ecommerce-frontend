import API from "../../api/axios";

export const createOrderApi = (data) => API.post("/orders", data);

export const getMyOrdersApi = () => API.get("/orders/myorders");
export const getAllOrdersApi = () => API.get("/orders");

export const updateOrderStatusApi = (id, status) =>
  API.put(`/orders/${id}/status`, { status });

export const cancelOrderApi = (id) => API.patch(`/orders/${id}/cancel`);
