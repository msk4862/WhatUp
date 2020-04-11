import ACTIONS from '../actions/actionTypes'

export default (state = [], action) => {

    switch(action.type) {
        case ACTIONS.FETCH_BLOGS:
            return action.payload
        
        default:
            return state
    }
}