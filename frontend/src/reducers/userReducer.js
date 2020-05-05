import ACTIONS from '../actions/actionTypes'

let initialState = {
    auth: {
        isLoggedIn: false,
        token: '',
    },
    user: {},
}

export default (state = initialState, action) => {

    switch(action.type) {

        case ACTIONS.SIGNUP:

            var updatedAuth = {
                isLoggedIn: true,
                token: action.payload.tokens['access']
            }
            return {...state, auth: updatedAuth}

        case ACTIONS.LOGIN:

            updatedAuth = {
                isLoggedIn: true,
                token: action.payload['access']
            }
            return {...state, auth: updatedAuth}

        case ACTIONS.LOGOUT:

            updatedAuth = {
                isLoggedIn: false,
                token: ''
            }
            return {...state, auth: updatedAuth}
    
        case ACTIONS.FETCH_USER:

            return {...state, user: action.payload}

        default:
            return state
    }
}