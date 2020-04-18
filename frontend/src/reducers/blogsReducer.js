import _ from 'lodash'

import ACTIONS from '../actions/actionTypes'

export default (state = [], action) => {

    switch(action.type) {
        case ACTIONS.FETCH_BLOGS:

            return {...state, ..._.mapKeys(action.payload, 'id')}

        case ACTIONS.FETCH_BLOG:

            return {...state, [action.payload.id]: action.payload}
        
        default:
            return state
    }
}