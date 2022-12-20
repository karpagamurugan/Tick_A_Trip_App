/* eslint-disable prettier/prettier */
import reducer from "./reducer";
import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxSaga from 'redux-saga';
import rootSaga from "./saga";

const reduxSagaMiddleware = reduxSaga()
const rootReducer = combineReducers({ ...reducer });

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxSagaMiddleware)
)
reduxSagaMiddleware.run(rootSaga);