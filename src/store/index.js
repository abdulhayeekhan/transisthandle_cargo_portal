import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from "store/company";
import AccountSlice from "store/account";
import CitySlice from "store/cities";
import TrackingSlice from "store/tracking";
import TrackingStatusSlice from "store/trackingstatus";
export const store = configureStore({
  reducer: {
    CompanySlice,
    AccountSlice,
    CitySlice,
    TrackingSlice,
    TrackingStatusSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
