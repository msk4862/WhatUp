import ACTIONS from "../actions/actionTypes";

let initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
    notifications: [],
    tempUser: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.LOGOUT:
            return initialState;

        case ACTIONS.SET_USER:
            return {
                authenticated: true,
                ...action.payload,
                loading: false,
            };

        case ACTIONS.SET_TEMP_USER:
            return {
                ...state,
                tempUser: action.payload,
                loading: false,
            };

        case ACTIONS.LIKE_BLOG:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        postId: action.payload.postId,
                    },
                ],
            };

        case ACTIONS.UNLIKE_BLOG:
            const updatedLikes = state.likes.filter(
                (like) => action.payload.postId !== like.postId
            );

            return {
                ...state,
                likes: updatedLikes,
            };

        case ACTIONS.MARK_NOTIFICATION_READ:
            // marking notifications read
            // let markedNotifications = state.notifications.filter(noti => !noti.read);
            state.notifications.forEach((noti) => (noti.read = true));

            return {
                ...state,
            };

        case ACTIONS.LOADING_USER:
            return { ...state, loading: true };

        default:
            return state;
    }
};
