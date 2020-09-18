import { combineReducers } from "redux";
import blogReducer from "./blogsReducer";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

export default combineReducers({
    blogs: blogReducer,
    user: userReducer,
    ui: uiReducer,
});
