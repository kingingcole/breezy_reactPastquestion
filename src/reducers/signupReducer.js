import { SIGNUP_VALUE, SIGNUP_USER } from "../actions/types";

const initialState = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confpassword: "",
  loggedOut: false,
  reg: false,
  message: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_VALUE:
      return {
        ...state,
        [action.payload.props]: action.payload.value
      };
    case SIGNUP_USER:
      return {
        ...state,
        loggedOut: false,
        reg: true,
        message: action.payload
      };

    default:
      return state;
  }
}
