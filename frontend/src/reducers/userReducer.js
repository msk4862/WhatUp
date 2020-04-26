import ACTIONS from '../actions/actionTypes'

let initialState = {
    auth: {
        isLoggedIn: false,
        token: '',
    }
}

export default (state = initialState, action) => {

    switch(action.type) {
        case ACTIONS.LOGIN:

            var updatedAuth = {
                isLoggedIn: true,
                token: action.payload['access']
            }
            return {...state, auth: updatedAuth}

        case ACTIONS.LOGOUT:

            var updatedAuth = {
                isLoggedIn: false,
                token: ''
            }
            return {...state, auth: updatedAuth}
    

        default:
            return state
    }
}