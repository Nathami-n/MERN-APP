export const initialState = {
  formData: {
    name: "",
    password: "",
  },
  isSubmitting: false,
  valid: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "input": {
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};
