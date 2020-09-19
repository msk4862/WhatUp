import ACTIONS from "../actions/actionTypes";

let initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case ACTIONS.LOGOUT:
            return initialState;

        case ACTIONS.SET_USER:
            return { 
                authenticated : true, 
                loading: false,
                ...action.payload 
            };

        case ACTIONS.LOADING_USER:
            return {...state, loading: true};

        default:
            return state;
    }
};
