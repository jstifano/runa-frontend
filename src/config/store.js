import { createStore, combineReducers } from 'redux';
import appReducer from "../ducks/modules/create";
import { reducer as formReducer } from 'redux-form'

const reducers = {
    form: formReducer,
    data: appReducer
}
const reducer = combineReducers(reducers);
const store = createStore(
    reducer
);

export default store;
