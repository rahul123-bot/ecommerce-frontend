import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getUsersApi,
  deleteUserApi,
  makeAdminApi,
  getProfileApi,
  updateProfileApi,
  changePasswordApi,
  getAddressesApi,
  addAddressApi,
  updateAddressApi,
  deleteAddressApi,
  setDefaultAddressApi,
} from "./userAPI";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
  const { data } = await getUsersApi();
  return data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await deleteUserApi(id);
  return id;
});

export const makeAdmin = createAsyncThunk("users/makeAdmin", async (id) => {
  const { data } = await makeAdminApi(id);
  return data;
});

export const getProfile = createAsyncThunk("users/getProfile", async () => {
  const { data } = await getProfileApi();
  return data;
});

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (userData, thunkAPI) => {
    try {
      const { data } = await updateProfileApi(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to update profile",
      );
    }
  },
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (passwordData, thunkAPI) => {
    try {
      const { data } = await changePasswordApi(passwordData);
      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to change password",
      );
    }
  },
);

export const getAddresses = createAsyncThunk("users/getAddresses", async () => {
  const { data } = await getAddressesApi();
  return data;
});

export const addAddress = createAsyncThunk(
  "users/addAddress",
  async (addressData) => {
    const { data } = await addAddressApi(addressData);
    return data;
  },
);

export const updateAddress = createAsyncThunk(
  "users/updateAddress",
  async ({ id, addressData }) => {
    const { data } = await updateAddressApi(id, addressData);

    return data;
  },
);

export const deleteAddress = createAsyncThunk(
  "users/deleteAddress",
  async (id) => {
    const { data } = await deleteAddressApi(id);

    return data;
  },
);

export const setDefaultAddress = createAsyncThunk(
  "users/setDefaultAddress",
  async (id) => {
    const { data } = await setDefaultAddressApi(id);

    return data;
  },
);
const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    profile: null,

    addresses: [],

    loading: false,
    error: null,
    successMessage: "",
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })

      .addCase(makeAdmin.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        );
      })

      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })

      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.successMessage = "Profile updated successfully";
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(changePassword.pending, (state) => {
        state.loading = true;
      })

      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      

      .addCase(getAddresses.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      })

      .addCase(setDefaultAddress.fulfilled, (state, action) => {
        state.addresses = action.payload;
      });
  },
});

export default userSlice.reducer;
