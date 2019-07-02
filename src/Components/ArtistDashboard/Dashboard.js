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
    constructor(props) {
        super(props)
        this.state = {
            updateShows: true,
            redirect: false,
            user: [],
            artist: [],
            accepted: false,
            shows: [],
            user_id: 0
        
        }
        this.updateShows = this.updateShows.bind(this)
    }

    componentDidMount() {
        // console.log(user_id)
        this.refreshList()
        this.props.getUser()
        console.log(this.props.user)
        axios
            .get(`/dashboard/${this.props.match.params.id}`)
            .then(response => {
                // console.log(user_id)
                console.log(response.data)
                this.setState({user: response.data}, () => {
                    if(!this.state.user) {
                        this.setState({redirect: true});
                    }
                })
            })
    }

    acceptRequest(event_id) {
        console.log(this.state.accepted)
        console.log(event_id)
        axios
        .put(`/event/accepted/${event_id}`, {accepted: !this.state.accepted})
        .then((res) => 
        {console.log(res.data)
        this.setState({updateShows: !this.state.updateShows, user: res.data},() => {
                this.refreshList()
                this.artist()
            })
        })
        .catch(err => {alert(err, 'Not accepted')})    
    }

    deleteEvent(event_id) {
        console.log(event_id)
        axios
        .delete(`/event/delete/${event_id}`)
        .then((res) => {console.log(res.data)
            this.artist()})
        .catch(err => {alert(err, 'Did not Delete')})
    }

    refreshList(id) {
        console.log(id)
        console.log(typeof id)
       axios
       .get(`/shows/${this.props.match.params.id}`)
       .then(response => {console.log(response.data)
         this.setState({shows: response.data})
       })
     }

     updateShows(array){
         this.setState({shows: array})
     }

    artist() {
        axios
        .get(`/dashboard/${this.props.match.params.id}`)
        .then(response => {
            console.log(response.data)
            this.setState({user: response.data})
        })
    }

    render() {
        console.log(this.props)


        if(this.state.redirect) {
            alert('Please login')
            return <Redirect to='/' />
        }

        let {user} = this.state
        let displayRequest = user.map(user => {
            return (
                <tr key={user.artist_id}>
                    <td>{user.event_name}</td>
                    <td>{user.venue_name}</td>
                    <td>{user.city},{user.state}</td>
                    <td>{user.event_date} / {user.event_time}</td>
                    <td>${user.booking_price}</td>
                    <td className='dashButtons'>
                        <Button id='accepted' onClick={() => this.acceptRequest(user.event_id)}>Accept</Button>
                        <Button id='decline' color='danger' onClick={() => this.deleteEvent(user.event_id)}>Decline</Button>
                    </td>
                </tr>
            )
        })

        return (
            <div className='dashboard'>
                <h3 id='dashWelcome'>Welcome to your Dashboard {user.artist_name}</h3>
            <h4>Event Request</h4>
                <Table dark>
                    <thead>
                    <tr>
                        <th id='th'>Event</th>  
                        <th id='th'>Venue</th>
                        <th id='th'>Location</th>
                        <th id='th'>Date/Time</th>
                        <th id='th'>Offer</th>
                        <th id='th1'>Accept/Decline</th>
                    </tr>
                    </thead>
                    <tbody>
                        {displayRequest}
                    </tbody>
                </Table>
                <br/>
                <Shows shows={this.state.shows} id={this.props.match.params.id} updateShows={this.updateShows}/>
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