import _ from 'lodash'

// USING THUNK MIDDLEWARE (for async request)

//SAME below
export const fetchPosts = () => {
    return {
        type: 'FETCH_POSTS',
        payload: [{p: '1'}]
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