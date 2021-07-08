import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';

import pickerReducer from './reducers/picker-reducer';
import appReducer from "./reducers/app-reducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

let reducers = combineReducers({
   imageData: pickerReducer,
   app: appReducer
});

let store = createStore(
   reducers,
   composeEnhancers(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;