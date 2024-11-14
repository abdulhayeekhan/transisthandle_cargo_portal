import { configureStore } from "@reduxjs/toolkit";
import CompanySlice from "store/company";
import AccountSlice from "store/account";
export const store = configureStore({
  reducer: {
    CompanySlice,
    AccountSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
