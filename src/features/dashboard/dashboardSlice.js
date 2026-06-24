import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDashboardStatsApi,
  getAnalyticsApi,
} from "./dashboardAPI";

export const getDashboardStats = createAsyncThunk(
  "dashboard/getDashboardStats",
  async () => {
    const { data } = await getDashboardStatsApi();
    return data;
  }
);

export const getAnalytics = createAsyncThunk(
  "dashboard/getAnalytics",
  async () => {
    const { data } = await getAnalyticsApi();
    return data;
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    stats: null,
    analytics: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Dashboard stats
      .addCase(getDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })

      .addCase(getDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Analytics
      .addCase(getAnalytics.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })

      .addCase(getAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default dashboardSlice.reducer;