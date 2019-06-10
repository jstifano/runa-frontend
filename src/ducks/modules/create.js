import {combineReducers} from "redux";

// Reducers de la aplicacion
import users from './users';

const appReducer =  combineReducers({
    users
});

export default appReducer;