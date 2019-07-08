import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducer from './reducer';
import artistReducer from './artistReducer';
import eventReducer from './eventReducer'
import promise from 'redux-promise-middleware';

let reducers = combineReducers({
    reducer, artistReducer, eventReducer
})



export default createStore(reducers, (applyMiddleware(promise)))