import axios from 'axios'

const initialState = {
    artist_name: '',
    genre: '',
    description: '',
    image_url: '',
    insta_url: '',
    fb_url: '',
    spotify_url: '',
    email: '',
    artist:[],
    loading: false
}

const GET_ARTIST='GET_ARTIST';

export function getArtist(id) {
    let artist = axios.get(`/artist/${id}`).then(response => response.data)
    return{
        type: GET_ARTIST,
        payload: artist
    }
} 

export default function reducer(state=initialState, action) {
    console.log(state.artist)
    switch(action.type) {
        case  `${GET_ARTIST}_FULFILLED`:
            return{
                ...state,
                loading: false,
                artist: action.payload
            }
        case `${GET_ARTIST}_PENDING`:
            return{
                ...state,
                loading: true
            }
        default:
            return state
    }
}