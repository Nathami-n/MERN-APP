import { configureStore } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import formReducer from "../features/user/formSlice";
import userReducer from '../features/user/userSlice'

const userPersistConfig = {
  key:"user",
  storage:storage,
}

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

const rootReducer = {
  form:formReducer,
  user:persistedUserReducer,
}

const store = configureStore({
  reducer: rootReducer,
});


export const persistor = persistStore(store);

export default store;