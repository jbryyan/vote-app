import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import reducers from './reducers';
import App from './App';


const store = applyMiddleware(thunk)(createStore);
const reduxBrowser = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

ReactDOM.render(
  <Provider store={store(reducers, reduxBrowser)}>
    <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
