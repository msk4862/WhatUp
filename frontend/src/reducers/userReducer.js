import ACTIONS from "../actions/actionTypes";

let initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SIGNUP:
            return { authenticated : true, ...action.payload };

        case ACTIONS.LOGIN:
            return { authenticated : true, ...action.payload };

        case ACTIONS.LOGOUT:
            return initialState;

        case ACTIONS.SET_USER:
            return { authenticated : true, ...action.payload };

        default:
            return state;
    }
};
