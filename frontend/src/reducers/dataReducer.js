import _ from "lodash";

import ACTIONS from "../actions/actionTypes";

const initialState = {
    posts: {},
    post: {},
    loading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.FETCH_POSTS:
            return {
                ...state,
                posts: { ..._.mapKeys(action.payload, "postId") },
                loading: false,
            };

        case ACTIONS.FETCH_POST:
            return {
                ...state,
                post: action.payload,
                loading: false,
            };

        case ACTIONS.CREATE_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.postId]: action.payload,
                },
            };

        case ACTIONS.EDIT_POST:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.postId]: action.payload,
                },
            };

        case ACTIONS.DELETE_POST:
            return {
                ...state,
                posts: _.omit(state.posts, action.payload),
            };

        case ACTIONS.LIKE_POST:
        case ACTIONS.UNLIKE_POST:
            // if current open post is liked or unliked
            if (state.post.postId === action.payload.postId)
                return {
                    ...state,
                    post: action.payload,
                    posts: {
                        ...state.posts,
                        [action.payload.postId]: action.payload,
                    },
                };
            else
                return {
                    ...state,
                    posts: {
                        ...state.posts,
                        [action.payload.postId]: action.payload,
                    },
                };

        case ACTIONS.SUBMIT_COMMENT:
            return {
                ...state,
                post: {
                    ...state.post,
                    comments: [action.payload, ...state.blog.comments],
                },
            };

        case ACTIONS.LOADING_DATA:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};
