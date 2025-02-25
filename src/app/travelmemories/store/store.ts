import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import storage from "./sessionStorage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

const persistConfig = {
  key: "root",
  storage, //Stock in sessionStorage
};

const rootReducer = combineReducers({
  gallery: galleryReducer,
  cart: cartReducer,
  user: userReducer,
});

// Handle the store reset
const appReducer = (state: ReturnType<typeof rootReducer> | undefined, action: Action<string>) => {
  if (action.type === "RESET_ALL") {
    state = undefined; // **Réinitialise tout Redux**
  }
  return rootReducer(state, action);
};

// Persisted reducer to store redux in session storage
const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Évite les warnings liés à Redux Persist
      },
    }),
});

export const persistor = persistStore(store);
export const resetAll = () => ({ type: "RESET_ALL" }); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
