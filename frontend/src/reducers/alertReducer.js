import ACTIONS from "../actions/actionTypes";

let initialState = {
  message: "",
  isError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_ALERT:
      // return Object.assign({}, state, updates)
      return { ...state, message: action.payload, isError: true };

    case ACTIONS.CLEAR_ALERT:
      return { ...state, message: "", isError: false };

    default:
      return state;
  }
};
