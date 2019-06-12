import { combineReducers } from "redux";
// Reducers de la aplicacion
import userReducer from './users';
import entryReducer from './entry';

export const appReducer =  combineReducers({
    userReducer,
    entryReducer
});
