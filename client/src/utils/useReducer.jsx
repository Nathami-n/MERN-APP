export const initialState = {
  formData: {
    name: "",
    user_name: "",
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
    case "button": {
      return { ...state, isSubmitting: action.payload };
    }
    case "reset": {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
