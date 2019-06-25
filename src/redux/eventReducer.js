import axios from 'axios'

const initialState = {
    name: '',
    date: '',
    time: 0,
    duration: 0,
    description: '',
    type: '',
    venue: '',
    address: '',
    city: '',
    state: '',
    zip: 0,
    country: '',
    price: 0,
    event: [],
    loading: false
}

const GET_EVENT='GET_EVENT';

export function getEvent(artist_id) {
  
    let id = artist_id
    let event = axios.get(`/event/request/${id}`)
    return {
        type: GET_EVENT,
        payload: event
    }
}


export default function reducer(state=initialState, action) {
  
    switch(action.type) {
        case  `${GET_EVENT}_FULFILLED`:
            return{
                ...state,
                loading: false,
                event: action.payload
            }
        case `${GET_EVENT}_PENDING`:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}