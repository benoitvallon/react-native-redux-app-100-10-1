import React, { Component } from 'react-native';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as storage from 'redux-storage';

import * as reducers from '../reducers';
import App from './App';

import createEngine from 'redux-storage-engine-reactnativeasyncstorage';
const engine = createEngine('my-save-key');

const middleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(middleware, thunk)(createStore);
const reducer = storage.reducer(combineReducers(reducers));
const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);
load(store);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

export default class AppWrapper extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
