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
// export const fetchUser = id => {
//     return (dispatch) => {
//         _fetchUser(id, dispatch)
//     }
// } 

// const _fetchUser = _.memoize(async (id, dispatch) => {
//         const response = await JSONPlaceHolder.get(`/users/${id}`)
        
//         dispatch({ type: 'FETCH_USER', payload: response.data})
// })