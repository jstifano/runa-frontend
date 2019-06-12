/************************************************
* Tipos de acciones para las entradas | salidas *
*************************************************/
import request from '../../utils/api/ServerRequest';
import { env } from '../../config/env';

const CREATE_ENTRY_SUCCESS = 'CREATE_ENTRY_SUCCESS';
const CREATE_ENTRY_FAIL = 'CREATE_ENTRY_FAIL';
const GET_ENTRIES_SUCCESS = 'CREATE_ENTRIES_SUCCESS';
const GET_ENTRIES_FAIL = 'CREATE_ENTRIES_FAIL';

const initialState = {};

export default function entryReducer(state = initialState, action = {}){
    switch (action.type) {
      case 'CREATE_ENTRY_SUCCESS':
        return {
          entry: action.payload
        };
      case 'CREATE_ENTRY_FAIL':
        return {
          entry: null,
          entryError: action.payload
        };
      case 'GET_ENTRIES_SUCCESS':
        return {
          entries: action.payload
        };
      case 'GET_ENTRIES_FAIL':
        return {
          entries: [],
          entryError: action.payload
        };
      default:
        return state;
    }
}

/*****************************************************************
* Action creator para registrar la entrada | salida del empleado *
******************************************************************/
export async function createEntry(data, callback) {
    request.post(env.apiEndpoint + '/entry', data).then(async result => {
      let response = await entryReducer(result, {type: CREATE_ENTRY_SUCCESS, payload: result});
      callback(response.entry.data);
    })
    .catch(async error => {
      let err = await entryReducer(error, {type: CREATE_ENTRY_FAIL, payload: error}); 
      callback(err);
    })
}

/*********************************************************************
* Action creator para consultar las entradas y salidas de un empledo *
**********************************************************************/
export async function getEntriesByEmployee(id, callback) {
  request.get(env.apiEndpoint + '/entries/'+id).then(async result => {
    let response = await entryReducer(result, {type: GET_ENTRIES_SUCCESS, payload: result});
    callback(response.data);
  })
  .catch(async error => {
    let err = await entryReducer(error, {type: GET_ENTRIES_FAIL, payload: error}); 
    callback(err);
  })
}
