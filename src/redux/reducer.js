import axios from 'axios'

const initialState = {
    loading: false,
    user: []
}

const GET_USER = 'GET_USER'

export function getUser() {
    console.log('hit')
    let user = axios.get('/artist/user').then(response => response.data)
    return {
        type: GET_USER,
        payload: user
    }
}

export default function reducer(state=initialState, action) {
    console.log(state.user)
    switch(action.type) {
        case `${GET_USER}_FULFILLED`:
            return{
                ...state,
                loading: false,
                user: action.payload
            }
        case `${GET_USER}_PENDING`:
            return{
                ...state,
                loading: true
            }
            default:
                return state
    }
}

