import _ from 'lodash'
import DjangoREST from '../apis/DjangoREST'

// USING THUNK MIDDLEWARE (for async request)

//SAME below
export const fetchPosts = () => {
    return async (dispatch) => {
        
        const response = await DjangoREST.get('/posts')

        dispatch({type: 'FETCH_POSTS', payload: response.data})
    }
} 

export const fetchPost = (id) => {
    return async (dispatch) => {
        const response = await DjangoREST.get(`/posts/${id}`)

        dispatch({type: 'FETCH_POST', payload: response.data})
    
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