import { combineReducers } from "redux";
import todoReducer from "./todoReducer";

export const mainReducer = combineReducers({
    updateTodo : todoReducer
})