import ACTIONS from "../actions/actionTypes";

let initialState = {
    loading: false,
    errors: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_ERROR:
            return { 
                ...state, 
                loading : false, 
                errors : action.payload 
            };

        case ACTIONS.CLEAR_ERROR:
            return { 
                ...state, 
                loading:false, 
                errors: null,
            };
        
        case ACTIONS.LOADING_UI:
            return { 
                ...state, 
                loading: true, 
            };
        
        case ACTIONS.STOP_LOADING_UI:
            return { 
                ...state, 
                loading: false, 
            };
            
    
        default:
            return state;
    }
};
