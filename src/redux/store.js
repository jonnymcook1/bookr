import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import reducer from './reducer';
import artistReducer from './artistReducer';
import eventReducer from './eventReducer'
import promise from 'redux-promise-middleware';

let reducers = combineReducers({
    reducer, artistReducer, eventReducer
})

const devTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

export default createStore(reducers, compose(applyMiddleware(promise), devTools))