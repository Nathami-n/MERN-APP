import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import formReducer from "../features/user/formSlice";
import userReducer from "../features/user/userSlice";
import updatedUserReducer from "../features/user/updateUser";

const userPersistConfig = {
  key: "user",
  storage: storage,
};
const updatedUserPersistConfig = {
  key: "updatedUser",
  storage: storage,
};
const persistedUpdatedUserReducer = persistReducer(
  updatedUserPersistConfig,
  updatedUserReducer
);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = {
  form: formReducer,
  profile: persistedUpdatedUserReducer,
  user: persistedUserReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
