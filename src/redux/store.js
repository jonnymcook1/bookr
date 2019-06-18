import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import artistReducer from './artistReducer'
import promise from 'redux-promise-middleware';



export default createStore(reducer, applyMiddleware(promise))