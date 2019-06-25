import axios from 'axios'

const initialState = {
    loading: false,
    user: []
}

const GET_USER = 'GET_USER'
const LOGIN_USER='LOGIN_USER'

export function getUser() {
    console.log('hit')
    let user = axios.get('/artist/user').then(response => response.data)
    return {
        type: GET_USER,
        payload: user
    }
}

export function login(username, password) {
    return{
        type: LOGIN_USER,
        payload: axios.post('/artist/login', {username: username, password: password})
    }
}

export default function reducer(state=initialState, action) {
    console.log(state.user)
    console.log(action)
    switch(action.type) {
        case `${GET_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: action.payload,
                login: true

            }
        case `${GET_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
        case `${LOGIN_USER}_FULFILLED`:
            return{ 
                ...state,
                loading: false,
                user: action.payload
            }
        case `${LOGIN_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
            default:
                return state
    }
}

