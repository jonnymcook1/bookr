import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArtist} from '../../redux/artistReducer'
import EventForm from '../Event/EventForm'
import Shows from '../Event/Shows';
// import axios from 'axios';

class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getArtist(this.props.match.params.id)
        console.log(this.props)
    }

    render() {
        console.log(this.props)
        return (
            <div>
            {this.props.artist.length
            ?
                <div className='profile'>
                <div className='artistInfo'>
                    <div className='info'>
                    <h1 className='profileName'>{this.props.artist[0].artist_name}</h1>
                    <img className='profilePic' src={this.props.artist[0].image_url} alt='artist' />
                    <h2 className='description'>{this.props.artist[0].description}</h2>
                    </div>
                </div>
                <div>
                    <Shows/>
                </div>
                <br/>
                <div>
                    <h2>Please fill out form to book {this.props.artist[0].artist_name}</h2>
                    <EventForm id='eventForm' artist={this.props.artist[0]} />
                </div>
            </div>
            :
            null
            
            }
            </div>
        )
    }
} 

const mapStateToProps = reduxState => {
    const {artist} = reduxState.artistReducer;
    return{
        artist
    }
}

export default connect(mapStateToProps, {getArtist})(Profile)