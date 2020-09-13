import _ from "lodash";

import DjangoREST from "../apis/DjangoREST";
import ACTIONS from "./actionTypes";
import history from "../history";

// USING THUNK MIDDLEWARE (for async request)

//SAME below
export const fetchBlogs = () => {
    return async (dispatch) => {
        const response = await DjangoREST.get("/blogs");

        dispatch({ type: ACTIONS.FETCH_BLOGS, payload: response.data });
    };
};

export const fetchBlog = (id) => {
    return async (dispatch) => {
        const response = await DjangoREST.get(`/blogs/${id}`);

        dispatch({ type: ACTIONS.FETCH_BLOG, payload: response.data });
    };
};

export const createBlog = (data) => {
    return async (dispatch) => {
        DjangoREST.post("/blogs/create", data)
            .then((response) => {
                dispatch({ type: ACTIONS.CREATE_BLOG, payload: response.data });
                history.push("/");
            })
            .catch((error) => {
                console.log(error.response.data);
                // dispatch({type: ACTIONS.SET_ALERT, payload: error.response.data['email'][0]})
            });
    };
};

export const editBlog = (id, data) => {
    return async (dispatch) => {
        DjangoREST.put(`/blogs/${id}`, data)
            .then((response) => {
                dispatch({ type: ACTIONS.EDIT_BLOG, payload: response.data });
                history.push("/");
            })
            .catch((error) => {
                console.log(error.response.data);
                // dispatch({type: ACTIONS.SET_ALERT, payload: error.response.data['email'][0]})
            });
    };
};

export const deleteBlog = (id) => {
    return async (dispatch) => {
        DjangoREST.delete(`/blogs/${id}`)
            .then(() => {
                dispatch({ type: ACTIONS.DELETE_BLOG, payload: id });
                history.push("/");
            })
            .catch((error) => {
                console.log(error.response.data);
                // dispatch({type: ACTIONS.SET_ALERT, payload: error.response.data['email'][0]})
            });
    };
};

export const signup = (data) => {
    return async (dispatch) => {
        DjangoREST.post(`/users/register`, data)
            .then((response) => {
                localStorage.setItem(
                    "jwtToken",
                    response.data.tokens["access"]
                );

                dispatch({ type: ACTIONS.SIGNUP, payload: response.data });
            })
            .catch((error) => {
                console.log(error.response.data);
                dispatch({
                    type: ACTIONS.SET_ALERT,
                    payload: error.response.data["email"][0],
                });
            });
    };
};

export const login = (data = null) => {
    if (data) {
        return async (dispatch) => {
            DjangoREST.post(`/users/login`, data)
                .then((response) => {
                    localStorage.setItem("jwtToken", response.data["access"]);
                    dispatch({ type: ACTIONS.LOGIN, payload: response.data });
                })
                .catch((error) => {
                    console.log(error.response.data);
                    dispatch({
                        type: ACTIONS.SET_ALERT,
                        payload: error.response.data["detail"],
                    });
                });
        };
    }
    // using browser cache to login
    const response = {
        access: localStorage.getItem("jwtToken"),
    };
    return {
        type: ACTIONS.LOGIN,
        payload: response,
    };
};

export const logout = () => {
    localStorage.removeItem("jwtToken");

    return {
        type: ACTIONS.LOGOUT,
    };
};

/*Has Multifetch Issue*/

// export const fetchUser = (id) => {
//     return async (dispatch) => {
//         const response = await JSONPlaceHolder.get(`/users/${id}`)

//         dispatch({ type: 'FETCH_USER', payload: response.data})
//     }
// }

/*
MultiFetch Solution-1 (Using Lodash memoize())
*/
export const fetchUser = (id) => {
    return (dispatch) => {
        _fetchUser(id, dispatch);
    };
};

const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await DjangoREST.get(`/users/${id}`);

    dispatch({ type: ACTIONS.FETCH_USER, payload: response.data });
});

export const clearAlert = () => {
    return { type: ACTIONS.CLEAR_ALERT };
};
