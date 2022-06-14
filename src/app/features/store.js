import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from "./auth/authSlice";
import typeReducer from "./types/typeSlice";
import storageReducer from "./storage/storageSlice";
import productReducer from "./products/productSlice";
import userReducer from "./users/userSlice";
import tutorReducer from "./tutors/tutorSlice";
import orderReducer from "./orders/orderSlice";
import warningTutorReducer from './warningTutors/warningTutorSlice'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({auth: authReducer, type: typeReducer, storage: storageReducer, product: productReducer, user: userReducer, tutor: tutorReducer, order: orderReducer, warningTutor : warningTutorReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export let persistor = persistStore(store)
// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     type: typeReducer,
//     storage: storageReducer,
//     product: productReducer,
//   },
// });