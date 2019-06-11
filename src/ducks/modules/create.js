import { combineReducers } from "redux";

// Reducers de la aplicacion
import users from './users';

export const appReducer =  combineReducers({
    users
});
