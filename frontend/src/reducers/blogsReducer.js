import _ from "lodash";

import ACTIONS from "../actions/actionTypes";

const initialState = {
    blogs: {},
    blog: {},
    loading: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_BLOGS:
            return { 
                ...state, 
                blogs: {..._.mapKeys(action.payload, "postId")},
                loading: false,
            };

        // case ACTIONS.FETCH_BLOG:
        //     return { ...state, blog: action.payload };

        case ACTIONS.CREATE_BLOG:
            return { ...state, 
                blogs: {
                    ...state.blogs,
                    [action.payload.id]: action.payload 
                }
            };

        // case ACTIONS.EDIT_BLOG:
        //     return { ...state, [action.payload.id]: action.payload };

        case ACTIONS.DELETE_BLOG:
            return _.omit(state.blogs, action.payload);

        case ACTIONS.LIKE_BLOG:
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    [action.payload.postId]: action.payload,
                } 
            }
        
        case ACTIONS.UNLIKE_BLOG:
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    [action.payload.postId]: action.payload,
                } 
            }

        default:
            return state;
    }
};
