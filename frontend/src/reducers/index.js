import { combineReducers } from 'redux'
import blogReducer from './blogsReducer'
// import userReducer from './userReducer'

export default combineReducers({
    blogs : blogReducer
})