import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

export const GetCitiesList = createAsyncThunk("getcitieslist", async () => {
  try {
    const { data } = await axios.get(`${baseURL}/city/getAll`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const GetCollectionCenterCitiesList = createAsyncThunk(
  "getcollectioncentercitieslist",
  async () => {
    try {
      const { data } = await axios.get(`${baseURL}/city/CollectionCenterCities`);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: [],
  status: false,
  loading: false,
};

const CitySlice = createSlice({
  name: "cities",
  initialState,

  // ! temporary reducer
  extraReducers: (builder) => {
    builder

      .addCase(GetCitiesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      })
      .addCase(GetCitiesList.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })
      .addCase(GetCollectionCenterCitiesList.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetCollectionCenterCitiesList.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      })
      .addCase(GetCollectionCenterCitiesList.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      });
  },
});

export default CitySlice.reducer;
