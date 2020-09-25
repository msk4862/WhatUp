import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import userReducer from "./userReducer";
import uiReducer from "./uiReducer";

export default combineReducers({
    data: dataReducer,
    user: userReducer,
    ui: uiReducer,
});
