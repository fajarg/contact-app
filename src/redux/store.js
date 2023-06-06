import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { contactApiSlice } from "./contactApiSlice";

export const store = configureStore({
  reducer: {
    [contactApiSlice.reducerPath]: contactApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApiSlice.middleware),
});

setupListeners(store.dispatch);
