import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from "./config/store";
import '../node_modules/bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <Provider store={store}>
        <div>
            <AppContainer />
        </div>
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
