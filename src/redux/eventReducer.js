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
    event_id: 0,
    loading: false
}

const GET_EVENT='GET_EVENT';
const UPDATE_EVENT_ID='UPDATE_EVENT_ID'

export function getEvent(artist_id) {
  
    let id = artist_id
    let event = axios.get(`/event/request/${id}`)
    return {
        type: GET_EVENT,
        payload: event
    }
}

export function updateEventId(event_id) {
    return {
        type: UPDATE_EVENT_ID,
        payload: event_id
    }
}

export default function reducer(state=initialState, action) {
  
    switch(action.type) {
        case UPDATE_EVENT_ID:
            return Object.assign({}, state, {event_id: action.payload});
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