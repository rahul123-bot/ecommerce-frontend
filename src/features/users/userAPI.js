import API from "../../api/axios.js";

export const getUsersApi = () => API.get("/users");

export const deleteUserApi = (id) => API.delete(`/users/${id}`);

export const makeAdminApi = (id) => API.put(`/users/${id}/admin`);

export const getProfileApi = () => API.get("/users/profile");

export const updateProfileApi = (data) => API.put("/users/profile", data);

export const changePasswordApi = (data) =>
  API.put("/users/change-password", data);

export const getAddressesApi = () => API.get("/users/address");

export const addAddressApi = (data) => API.post("/users/address", data);

export const updateAddressApi = (id, data) =>
  API.put(`/users/address/${id}`, data);

export const deleteAddressApi = (id) => API.delete(`/users/address/${id}`);

export const setDefaultAddressApi = (id) =>
  API.put(`/users/address/default/${id}`);
