import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import typeReducer from "./types/typeSlice";
import storageReducer from "./storage/storageSlice";
import productReducer from "./products/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    type: typeReducer,
    storage: storageReducer,
    product: productReducer,
  },
});