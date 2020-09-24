import _ from "lodash";

import ACTIONS from "../actions/actionTypes";

const initialState = {
    blogs: {},
    blog: {},
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_BLOGS:
            return {
                ...state,
                blogs: { ..._.mapKeys(action.payload, "postId") },
                loading: false,
            };

        case ACTIONS.FETCH_BLOG:
            return { ...state, blog: action.payload };

        case ACTIONS.CREATE_BLOG:
            return {
                ...state,
                blogs: {
                    ...state.blogs,
                    [action.payload.postId]: action.payload,
                },
            };

        // case ACTIONS.EDIT_BLOG:
        //     return { ...state, [action.payload.id]: action.payload };

        case ACTIONS.DELETE_BLOG:
            return {
                ...state,
                blogs: _.omit(state.blogs, action.payload),
            };

        case ACTIONS.LIKE_BLOG:
        case ACTIONS.UNLIKE_BLOG:
            // if current open post is liked or unliked
            if (state.blog.postId === action.payload.postId)
                return {
                    ...state,
                    blog: action.payload,
                    blogs: {
                        ...state.blogs,
                        [action.payload.postId]: action.payload,
                    },
                };
            else
                return {
                    ...state,
                    blogs: {
                        ...state.blogs,
                        [action.payload.postId]: action.payload,
                    },
                };

        case ACTIONS.SUBMIT_COMMENT:
            return {
                ...state,
                blog: {
                    ...state.blog,
                    comments: [action.payload, ...state.blog.comments],
                },
            };

        default:
            return state;
    }
};
