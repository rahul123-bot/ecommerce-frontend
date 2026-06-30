import API from "../../api/axios";

export const loginApi = (data) => API.post("/auth/login", data);

export const registerApi = (data) => API.post("/auth/register", data);

export const googleLoginApi = (data) => API.post("/auth/google", data);

export const forgotPasswordApi = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPasswordApi = (token, password) =>
  API.post(`/auth/reset-password/${token}`, { password });
