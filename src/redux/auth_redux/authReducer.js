import { LOGIN, LOGOUT } from "./authType";

const initialState = {
  isUser: false,
  username: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isUser: true,
        username: action.payload.username,
      };
    case LOGOUT:
      return {
        ...state,
        isUser: false,
        username: "",
      };
    default:
      return state;
  }
};

export default authReducer;
