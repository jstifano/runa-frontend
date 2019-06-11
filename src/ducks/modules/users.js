/**************************************
* Tipos de acciones para los usuarios *
***************************************/
import request from '../../utils/api/ServerRequest';
import { env } from '../../config/env';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const initialState = {};


// Funcion reducer donde se manejará el tipo de action
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.result
        };
      case 'LOGIN_FAIL':
        return {
          ...state,
          user: null,
          loginError: action.error
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
    let response = await reducer(result, {type: LOGIN_SUCCESS});
    callback(response.data);
  })
  .catch(async error => {
    let err = await reducer(error, {type: LOGIN_FAIL}); 
    callback(err);
  })
}

