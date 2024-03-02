import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../features/user/formSlice";
export default configureStore({
  reducer: {
    form:formReducer,
  },
});
