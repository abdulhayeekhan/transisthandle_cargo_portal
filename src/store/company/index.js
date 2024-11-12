import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

export const AddNewCompany = createAsyncThunk("addNewAdmission", async (data, { dispatch }) => {
  try {
    await axios
      .post(`${baseURL}/company/add`, data)
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

export const GetCompaniesList = createAsyncThunk("getcompanieslist", async () => {
  try {
    const { data } = await axios.get(`${baseURL}/company/getAll`);
    console.log("data:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  data: [],
  status: false,
  loading: false,
};

const CompanySlice = createSlice({
  name: "company",
  initialState,

  // ! temporary reducer
  extraReducers: (builder) => {
    builder
      .addCase(AddNewCompany.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewCompany.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
        state.status = true;
      })
      .addCase(AddNewCompany.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })

      .addCase(GetCompaniesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCompaniesList.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      })
      .addCase(GetCompaniesList.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      });
  },
});

export default CompanySlice.reducer;
