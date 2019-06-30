import React, {Component} from 'react'
import Shows from '../Event/Shows'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import {getArtist} from '../../redux/artistReducer'
import {getEvent} from '../../redux/eventReducer'
import {Redirect} from "react-router-dom"
import { Table, Button } from 'reactstrap';
import axios from 'axios'


class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            updateShows: true,
            redirect: false,
            user: [],
            artist: [],
            accepted: false,
            
        }
    }



    componentDidMount() {
        this.props.getUser()
        console.log(this.props.user)
        axios
            .get('/artist')
            .then(response => {
                console.log(response.data)
                this.setState({artist: response.data})
            })
    }

    acceptRequest(event_id) {
        this.setState({accepted: !this.state.accepted, updateShows: !this.state.updateShows },() => {
            console.log(event_id)
            axios
            .put(`/event/accepted/${event_id}`, {accepted: this.state.accepted})
            .then((res) => {console.log(res.data)
                this.artist()})
            .catch(err => {alert(err, 'Not accepted')})    
        })
    }

    deleteEvent(event_id) {
        console.log(event_id)
        axios
        .delete(`/event/delete/${event_id}`)
        .then((res) => {console.log(res.data)
            this.artist()})
        .catch(err => {alert(err, 'Did not Delete')})
    }

    artist() {
        axios
        .get('/artist')
        .then(response => {
            console.log(response.data)
            this.setState({artist: response.data})
        })
    }
 


    render() {
        console.log(this.props)

        if(!this.state.user) {
            this.setState({redirect: true});
        }
        if(this.state.redirect) {
            alert('Please login')
            return <Redirect to='/' />
        }

        let {artist} = this.state
        let displayRequest = artist.map(artist => {
            return (
                <tr key={artist.artist_id}>
                    <td>{artist.event_name}</td>
                    <td>{artist.venue_name}</td>
                    <td>{artist.city},{artist.state}</td>
                    <td>{artist.event_date}/{artist.event_time}</td>
                    <td>${artist.booking_price}</td>
                    <td className='dashButtons'>
                        <Button onClick={() => this.acceptRequest(artist.event_id)}>Accept</Button>
                        <Button color='danger' onClick={() => this.deleteEvent(artist.event_id)}>Decline</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className='dashboard'>
            <h4>Event Request</h4>
                <Table dark>
                    <thead>
                    <tr>
                        <th>Event</th>  
                        <th>Venue</th>
                        <th>Location</th>
                        <th>Date/Time</th>
                        <th>Offer</th>
                        <th>Accept/Decline</th>
                    </tr>
                    </thead>
                    <tbody>
                        {displayRequest}
                    </tbody>
                </Table>
                <br/>
                <Shows toRefresh={this.state.updateShows}/>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState.reducer;
    const {event} = reduxState.eventReducer;
    const {artist} = reduxState.artistReducer
    return{
        user,
        event,
        artist,
    }
}

export default connect(mapStateToProps, {getArtist, getEvent, getUser})(Dashboard)