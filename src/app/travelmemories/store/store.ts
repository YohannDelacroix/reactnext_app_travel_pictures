import { combineReducers, configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import storage from "./sessionStorage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

// Configuration de Redux Persist
const persistConfig = {
  key: "root",
  storage, // Stockage dans localStorage
};

// Combine tous les reducers
const rootReducer = combineReducers({
  gallery: galleryReducer,
  cart: cartReducer,
  user: userReducer,
});

// **Gestion du RESET de tout le store**
const appReducer = (state: any, action: any) => {
  if (action.type === "RESET_ALL") {
    state = undefined; // **Réinitialise tout Redux**
  }
  return rootReducer(state, action);
};

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, appReducer);

// Création du store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Évite les warnings liés à Redux Persist
      },
    }),
});

// Création du persistor
export const persistor = persistStore(store);
export const resetAll = () => ({ type: "RESET_ALL" }); 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
