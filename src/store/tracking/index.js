import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

export const AddNewTracking = createAsyncThunk("addnewtracking", async (body, { dispatch }) => {
  try {
    await axios
      .post(`${baseURL}/localShipment/createClientAndShipment`, body)
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


export const GetTrackingData = createAsyncThunk("gettrackingdata", async (body) => {
  try {
    const { data } = await axios.post(`${baseURL}/localShipment/GetTrackings`, body);
    return data;
  } catch (error) {
    console.log(error);
  }
});

// export const UpdateCompany = createAsyncThunk("updateCompany", async (data, { dispatch }) => {
//   try {
//     await axios
//       .put(`${baseURL}/company/update`, data)
//       .then((response) => {
//         toast.success("" + response.data?.message);
//         return response.data.data;
//       })
//       .catch((error) => {
//         toast.error("" + error);
//       });
//   } catch (error) {
//     console.log(error);
//   }
// });

// export const GetCompanyData = createAsyncThunk("getcompanydata", async (id) => {
//   try {
//     const { data } = await axios.get(`${baseURL}/company/getSingle/${id}`);
//     console.log("data:", data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// });



const initialState = {
  data: [],
  status: false,
  loading: false,
};

const TrackingSlice = createSlice({
  name: "tracking",
  initialState,

  // ! temporary reducer
  extraReducers: (builder) => {
    builder
      .addCase(AddNewTracking.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddNewTracking.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...state.data, ...action.payload };
        state.status = true;
      })
      .addCase(AddNewTracking.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })

      .addCase(GetTrackingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetTrackingData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.status = true;
      })
      .addCase(GetTrackingData.rejected, (state, action) => {
        state.loading = false;
        state.status = false;
      })
  },
});

export default TrackingSlice.reducer;
