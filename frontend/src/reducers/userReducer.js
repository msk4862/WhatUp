import ACTIONS from "../actions/actionTypes";

import jwt_decode from "jwt-decode";

let initialState = {
  auth: {
    isLoggedIn: false,
    token: null,
    currentUserId: null,
  },
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP:
      var updatedAuth = {
        isLoggedIn: true,
        token: action.payload.tokens["access"],
        currentUserId: jwt_decode(action.payload["access"]).user_id,
      };

      return { ...state, auth: updatedAuth };

    case ACTIONS.LOGIN:
      console.log(action.payload);

      updatedAuth = {
        isLoggedIn: true,
        token: action.payload["access"],
        currentUserId: jwt_decode(action.payload["access"]).user_id,
      };

      return { ...state, auth: updatedAuth };

    case ACTIONS.LOGOUT:
      updatedAuth = {
        isLoggedIn: false,
        token: null,
        currentUserId: null,
      };
      return { ...state, auth: updatedAuth };

    case ACTIONS.FETCH_USER:
      const updatedUsers = [...state.users, action.payload];

      return { ...state, users: updatedUsers };

    default:
      return state;
  }
};
