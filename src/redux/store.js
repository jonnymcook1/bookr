import {createStore, applyMiddleware, combineReducers} from 'redux';
import reducer from './reducer';
import artistReducer from './artistReducer'
import promise from 'redux-promise-middleware';

let reducers = combineReducers({
    reducer, artistReducer
})

export default createStore(reducers, applyMiddleware(promise))