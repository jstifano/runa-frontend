/**************************************
* Tipos de acciones para los usuarios *
***************************************/
const LOGIN = 'my-app/auth/LOGIN';
const LOGIN_SUCCESS = 'my-app/auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'redux-example/auth/LOGIN_FAIL';

const initialState = {};

// Funcion reducer donde se manejará el tipo de action
export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          loggingIn: true
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          loggingIn: false,
          user: action.result
        };
      case LOGIN_FAIL:
        return {
          ...state,
          loggingIn: false,
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
export function login(email, password) {
    return {
      types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
      promise: () => {
        
      }
    };
}