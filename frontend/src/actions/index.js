import _ from "lodash";
import jwtDecode from "jwt-decode";
import DjangoREST from "../apis/DjangoREST";
import FirebaseAPI from "../apis/FirebaseAPI";
import ACTIONS from "./actionTypes";
import history from "../history";

/* User actions */
export const signup = (data) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_UI });

        FirebaseAPI.post("/users/signup", data)
            .then((res) => {
                setAuthorizationHeader(res.data["token"]);
                dispatch(fetchUserData());
                dispatch({ type: ACTIONS.CLEAR_ERROR });
                history.push("/");
            })
            .catch((error) => {
                dispatch({
                    type: ACTIONS.SET_ERROR,
                    payload: error.response.data,
                });
            });
    };
};

export const login = (data) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_UI });

        FirebaseAPI.post(`/users/login`, data)
            .then((res) => {
                setAuthorizationHeader(res.data["token"]);
                dispatch(fetchUserData());
                dispatch({ type: ACTIONS.CLEAR_ERROR });
                history.push("/");
            })
            .catch((error) => {
                dispatch({
                    type: ACTIONS.SET_ERROR,
                    payload: error.response.data,
                });
            });
    };
};

// authenticate using localstorage token
export const authenticate = (token) => {
    return (dispatch) => {
        const decodedToken = jwtDecode(token);
        // expired
        if (decodedToken.exp * 1000 < Date.now()) {
            dispatch(logout());
        } else {
            setAuthorizationHeader(token);
            dispatch(fetchUserData());
        }
    };
};

// set axios Authorization header
export const setAuthorizationHeader = (token) => {
    localStorage.setItem("jwtToken", token);
    FirebaseAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const logout = () => {
    return (dispatch) => {
        localStorage.removeItem("jwtToken");
        delete FirebaseAPI.defaults.headers.common["Authorization"];
        dispatch({ type: ACTIONS.LOGOUT });
    };
};

export const fetchUserData = () => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_USER });

        FirebaseAPI.get("/users")
            .then((res) => {
                dispatch({
                    type: ACTIONS.SET_USER,
                    payload: res.data,
                });
                dispatch({ type: ACTIONS.CLEAR_ERROR });
            })
            .catch((error) => {
                dispatch({
                    type: ACTIONS.SET_ERROR,
                    payload: error.response.data,
                });
            });
    };
};

export const uploadImage = (formData) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_USER });

        FirebaseAPI.post("/users/upload", formData)
            .then(() => {
                dispatch(fetchUserData());
            })
            .catch((err) => console.error(err));
    };
};

export const editUserDetails = (data) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_USER });

        FirebaseAPI.post("/users", data)
            .then(() => {
                dispatch(fetchUserData());
            })
            .catch((err) => console.error(err));
    };
};

export const markNotificationRead = (notificationIds) => {
    return (dispatch) => {
        FirebaseAPI.post("/users/notification", notificationIds)
            .then(() => {
                dispatch({ type: ACTIONS.MARK_NOTIFICATION_READ });
            })
            .catch((err) => console.error(err));
    };
};

/* Data actions */
export const fetchBlogs = () => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_DATA });

        FirebaseAPI.get("/posts")
            .then((res) => {
                dispatch({ type: ACTIONS.FETCH_BLOGS, payload: res.data });
            })
            .catch((err) => {
                console.log(err);
                dispatch({ type: ACTIONS.FETCH_BLOGS, payload: [] });
            });
    };
};

export const likeBlog = (postId) => {
    return (dispatch) => {
        FirebaseAPI.post(`/posts/${postId}/like`)
            .then((res) => {
                dispatch({ type: ACTIONS.LIKE_BLOG, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const unlikeBlog = (postId) => {
    return (dispatch) => {
        FirebaseAPI.post(`/posts/${postId}/unlike`)
            .then((res) => {
                dispatch({ type: ACTIONS.UNLIKE_BLOG, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

export const fetchUser = (handle) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_USER });
        FirebaseAPI.get(`/users/${handle}`)
            .then((res) => {
                dispatch({ type: ACTIONS.SET_TEMP_USER, payload: res.data });
            })
            .catch((err) => console.log(err));
    };
};

/*
MultiFetch Solution-1 (Using Lodash memoize())
*/
// export const fetchUser = (handle) => {
//     return (dispatch) => {
//         _fetchUser(handle, dispatch);
//     };
// };

// const _fetchUser = _.memoize((handle, dispatch) => {
//     const response = await DjangoREST.get(`/users/${handle}`);

//     dispatch({ type: ACTIONS.FETCH_USER, payload: response.data });
// });

export const fetchBlog = (id) => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.LOADING_DATA });

        FirebaseAPI.get(`/posts/${id}`)
            .then((res) => {
                dispatch({ type: ACTIONS.FETCH_BLOG, payload: res.data });
                dispatch({ type: ACTIONS.CLEAR_ERROR });
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ACTIONS.SET_ERROR,
                    payload: err.response.data,
                });
            });
    };
};

export const createBlog = (data) => {
    return (dispatch) => {
        FirebaseAPI.post("/posts", data)
            .then((response) => {
                dispatch({ type: ACTIONS.CREATE_BLOG, payload: response.data });
                dispatch({
                    type: ACTIONS.CLEAR_ERROR,
                });
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
                dispatch({
                    type: ACTIONS.SET_ERROR,
                    payload: err.response.data,
                });
            });
    };
};

export const editBlog = (id, data) => {
    return (dispatch) => {
        FirebaseAPI.put(`/posts/${id}`, data)
            .then((response) => {
                dispatch({ type: ACTIONS.EDIT_BLOG, payload: response.data });
                history.push("/");
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };
};

export const deleteBlog = (id) => {
    return (dispatch) => {
        FirebaseAPI.delete(`/posts/${id}`)
            .then(() => {
                dispatch({ type: ACTIONS.DELETE_BLOG, payload: id });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const submitComment = (id, data) => {
    return (dispatch) => {
        FirebaseAPI.post(`/posts/${id}/comment`, data)
            .then((res) => {
                dispatch({ type: ACTIONS.SUBMIT_COMMENT, payload: res.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };
};

export const clearErrors = () => {
    return { type: ACTIONS.CLEAR_ALERT };
};
