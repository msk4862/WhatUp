import { combineReducers } from 'redux'
import blogReducer from './blogsReducer'
import userReducer from './userReducer'
import alertReducer from './alertReducer'

export default combineReducers({
    blogs: blogReducer,
    user: userReducer, 
    alert: alertReducer,
})