import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/user/formSlice";
import userReducer from '../features/user/userSlice'
export default configureStore({
  reducer: {
    form:formReducer,
    user:userReducer,
  },
});
