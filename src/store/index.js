import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from "store/company";
import AccountSlice from "store/account";
import CitySlice from "store/cities";
import TrackingSlice from "store/tracking";
export const store = configureStore({
  reducer: {
    CompanySlice,
    AccountSlice,
    CitySlice,
    TrackingSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
