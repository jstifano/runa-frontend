import { combineReducers } from "redux";

// Reducers de la aplicacion
import userReducer from './users';

export const appReducer =  combineReducers({
    userReducer
});
