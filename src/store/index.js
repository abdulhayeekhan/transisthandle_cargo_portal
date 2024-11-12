import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from "store/company";
export const store = configureStore({
  reducer: {
    CompanySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
