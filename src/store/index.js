import { applyMiddleware, createStore } from "redux";
import allReducers from '../reducers'
import thunk from 'redux-thunk';

const middleWare = [thunk]

const createStoreWithMiddeleWare = applyMiddleware(...middleWare)(createStore)

const store = createStoreWithMiddeleWare(allReducers)

export default store;
