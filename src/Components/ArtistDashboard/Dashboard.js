import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import {getArtist} from '../../redux/artistReducer'
import {getEvent, updateEventId} from '../../redux/eventReducer'
import {Redirect} from "react-router-dom"
import axios from 'axios'


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false,
            user: [],
            artist: []
        }
    }

    componentDidMount() {
        console.log(this.props.user)
        axios
            .get('/artist/')
            .then(response => {
                console.log(response.data)
                this.setState({artist: response.data})
            })
        
        //  this.setState({user: this.props.user}, ()=> {this.props.getArtist(this.props.user_id)}, ()=>{ this.props.getEvent(this.props.artist.artist_id)} )
       
       

    }


    render() {
        console.log(this.state.user)

        if(!this.state.user) {
            this.setState({redirect: true});
        }
        if(this.state.redirect) {
            alert('Please login')
            return <Redirect to='/' />
        }

        return (
            <div className='dashboard'>
                <h3>Artist Dashboard</h3>
                <div className='bookingRequest'>
                    <h1>{this.props.event.event_name}</h1>
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState.reducer;
    const {event, event_id} = reduxState.eventReducer;
    const {artist} = reduxState.artistReducer
    return{
        user,
        event,
        artist,
        event_id
    }
}

export default connect(mapStateToProps, {getArtist, getEvent, updateEventId, getUser})(Dashboard)