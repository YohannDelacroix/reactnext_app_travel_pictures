import { combineReducers, configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./gallerySlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import storage from "./storage";
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

// Création du reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

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


/*const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    cart: cartReducer,
    user: userReducer,
  },
});*/

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
