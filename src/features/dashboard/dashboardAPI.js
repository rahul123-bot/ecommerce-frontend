import API from "../../api/axios";

export const getDashboardStatsApi = () =>
  API.get("/dashboard/stats");

export const getAnalyticsApi = () => API.get("/dashboard/analytics");
