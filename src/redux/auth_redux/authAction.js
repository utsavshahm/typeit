import { LOGIN, LOGOUT } from "./authType";

export const loginUser = (username) => {
  return {
    type: LOGIN,
    payload: { username },
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT,
  };
};
