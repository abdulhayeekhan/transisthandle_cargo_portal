import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

export const GetTrackingStatus = createAsyncThunk("gettrackingstatus", async (IsForUK) => {
  try {
    const { data } = await axios.get(`${baseURL}/localShipment/getShipmentStatus?IsForUK=${IsForUK}`);
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

const TrackingStatusSlice = createSlice({
  name: "trackingstatus",
  initialState,

  // ! temporary reducer
  extraReducers: (builder) => {
    builder

      .addCase(GetTrackingStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTrackingStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      })
      .addCase(GetTrackingStatus.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })
  },
});

export default TrackingStatusSlice.reducer;
