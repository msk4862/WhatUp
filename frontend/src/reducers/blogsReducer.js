import ACTIONS from '../actions/actionTypes'

const initialState = { 
                        blogList: [], 
                        blogDetailList: [],
                    }

export default (state = initialState, action) => {

    switch(action.type) {
        case ACTIONS.FETCH_BLOGS:
            var newArr = state.blogList.concat(action.payload);

            return {...state, blogList: newArr}

        case ACTIONS.FETCH_BLOG:
            var newArr = state.blogDetailList.concat(action.payload);

            return {...state, blogDetailList: newArr}
        
        default:
            return state
    }
}