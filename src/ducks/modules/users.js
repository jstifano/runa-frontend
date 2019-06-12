/**************************************
* Tipos de acciones para los usuarios *
***************************************/
import request from '../../utils/api/ServerRequest';
import { env } from '../../config/env';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const GET_USERS_SUCCESS  = 'GET_USERS_SUCCESS';
const GET_USERS_FAIL  = 'GET_USERS_FAIL';
const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

const initialState = {};

// Funcion reducer donde se manejará el tipo de action
export default function userReducer(state = initialState, action = {}) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          user: action.payload
        };
      case 'LOGIN_FAIL':
        return {
          user: null,
          loginError: action.payload
        };
      case 'GET_USERS_SUCCESS': 
        return {
          users: action.payload.data.users,
        };
      case 'GET_USERS_FAIL':   
        return {
          users: []
        };
      case 'DELETE_USER_SUCCESS':   
        return {
          ...state
        };
      case 'DELETE_USER_FAIL':   
        return {
          ...state
        }; 
      default:
        return state;
    }
}

/*******************************************
* Action creator para el login del usuario *
********************************************/
export async function login(email, password, callback) {
  let authentication = {
    email: email,
    password: password
  }

  request.post(env.apiEndpoint + '/login', authentication).then(async result => {
    let response = await userReducer(result, {type: LOGIN_SUCCESS, payload: result});
    callback(response.user.data);
  })
  .catch(async error => {
    let err = await userReducer(error, {type: LOGIN_FAIL, payload: error}); 
    callback(err);
  })
}

/********************************************
* Action creator para obtener los empleados * 
*********************************************/
export async function getUsers(id, callback) {
  request.get(env.apiEndpoint + '/users/'+id).then(async result => {
    let response = await userReducer(result, {type: GET_USERS_SUCCESS, payload: result});
    callback(response);
  })
  .catch(async error => {
    let err = await userReducer(error, {type: GET_USERS_FAIL, payload: error}); 
    callback(err);
  })
}

/*****************************************
* Action creator para borrar un empleado * 
******************************************/
export async function deleteUser(id, callback) {
  request.delete(env.apiEndpoint + '/user/delete/'+id).then(async result => {
    let response = await userReducer(result, {type: DELETE_USER_SUCCESS, payload: result});
    callback(response);
  })
  .catch(async error => {
    let err = await userReducer(error, {type: DELETE_USER_FAIL, payload: error}); 
    callback(err);
  })
}
