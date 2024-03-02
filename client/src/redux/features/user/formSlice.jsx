import { createSlice } from "@reduxjs/toolkit";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    formData: {
      name: "",
      user_name: "",
      password: "",
    },
    isSubmitting: false,
    error: null,
  },
  reducers: {
    updateform: (state, action) => {
      const { field, data } = action.payload;
      state.formData[field] = data;
    },

    formSubmitting: (state) => {
      state.isSubmitting = true;
      state.error = null;
    },
    submitFormError: (state, action) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    clearForm: (state) => {
      state.isSubmitting = false;
      state.formData = formSlice.getInitialState().formData;
    },
  },
});

console.log(formSlice)

//action creators
export const { updateform, formSubmitting, clearForm, submitFormError } =
  formSlice.actions;
export default formSlice.reducer;
