import _ from 'lodash'

import DjangoREST from '../apis/DjangoREST'
import ACTIONS from './actionTypes'

// USING THUNK MIDDLEWARE (for async request)

//SAME below
export const fetchBlogs = () => {
    return async (dispatch) => {
        const response = await DjangoREST.get('/blogs')
        
        dispatch({type: ACTIONS.FETCH_BLOGS, payload: response.data})
    }
} 

export const fetchBlog = (id) => {
    return async (dispatch) => {
        const response = await DjangoREST.get(`/blogs/${id}`)
        
        dispatch({type: ACTIONS.FETCH_BLOG, payload: response.data})
    
    }
}

export const createBlog = (data) => {
    return async (dispatch) => {
        const response = await DjangoREST.post('/blogs/create', data)
        
        dispatch({type: ACTIONS.CREATE_BLOG, payload: response.data})
    }
}

export const signup = (data) => {
    return async (dispatch) => {
        
        DjangoREST.post(`/users/register`, data)
        .then(response => {
            localStorage.setItem('jwtToken', response.data.tokens['access'])

            dispatch({type: ACTIONS.SIGNUP, payload: response.data})
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch({type: ACTIONS.SET_ALERT, payload: error.response.data['email'][0]})
        })
        
    }
}

export const login = (data) => {
    return async (dispatch) => {
        DjangoREST.post(`/users/login`, data)
        .then(response=> {
            localStorage.setItem('jwtToken', response.data['access'])
            dispatch({type: ACTIONS.LOGIN, payload: response.data})
         
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch({type: ACTIONS.SET_ALERT, payload: error.response.data['detail']})

        })
    }
}

export const logout = () => {
    return async (dispatch) => {

        localStorage.removeItem('jwtToken')
        
        dispatch({type: ACTIONS.LOGOUT})
     
    }
}

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
export const fetchUser = id => {
    return (dispatch) => {
        _fetchUser(id, dispatch)
    }
} 

const _fetchUser = _.memoize(async (id, dispatch) => {
        const response = await DjangoREST.get(`/users/${id}`)
        
        dispatch({ type: ACTIONS.FETCH_USER, payload: response.data})
})


export const clearAlert = () => {
    return (dispatch) => {
        dispatch({ type: ACTIONS.CLEAR_ALERT})
    }
}