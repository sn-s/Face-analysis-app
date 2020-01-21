import authReducer from "./authReducer";
import imageReducer from "./imageReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  image: imageReducer
})

export default rootReducer;