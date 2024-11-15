import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

export const AddUser = createAsyncThunk("addUser", async (data, { dispatch }) => {
  try {
    console.log("data:", data);
    await axios
      .post(`${baseURL}/account/signup`, data)
      .then((response) => {
        toast.success("" + response.data?.message);
        return response.data.data;
      })
      .catch((error) => {
        toast.error("" + error);
      });
  } catch (error) {
    console.log(error);
  }
});

export const GetUsersListWithCompanyID = createAsyncThunk(
  "getuserslistwithcompanyid",
  async (id) => {
    try {
      const data = await axios.get(`${baseURL}/account/getByCompany/1`);
      console.log("res", data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const AddNewUser = createAsyncThunk("addNewUser", async (data, { dispatch }) => {
  try {
    await axios
      .post(`${baseURL}/account/signup`, data)
      .then((response) => {
        toast.success("" + response.data?.message);
        return response.data.data;
      })
      .catch((err) => {
        //toast.error("" + err);
        const status = err?.status;
        console.log("status", err);
        if (status === 404) {
          toast.error("Please enter Valid email/password");
        } else if (status === 403) {
          toast.error("Your account is inactive. Please contact support for assistance");
        } else if (status === 405) {
          toast.error("Your company account is currently blocked.");
        } else if (status === 411) {
          toast.error("Your maximum users already created.");
        }
      });
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  data: [],
  status: false,
  loading: false,
};

const AccountSlice = createSlice({
  name: "account",
  initialState,

  // ! temporary reducer
  extraReducers: (builder) => {
    builder

      .addCase(AddNewUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
        state.status = true;
      })
      .addCase(AddNewUser.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })

      .addCase(AddUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
        state.status = true;
      })
      .addCase(AddUser.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })

      .addCase(GetUsersListWithCompanyID.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetUsersListWithCompanyID.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      })
      .addCase(GetUsersListWithCompanyID.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      });
  },
});

export default AccountSlice.reducer;
