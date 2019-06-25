import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArtist} from '../../redux/artistReducer'
import EventForm from '../Event/EventForm'
// import axios from 'axios';


class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getArtist(this.props.match.params.id)
        console.log(this.props.match.params)
    }

    render() {
        console.log(this.props)
        return (
            <div>
            {this.props.artist.length
            ?
                <div className='profile'>
                <h3>Profile</h3>
                <div className='artistInfo'>
                    <div className='info'>
                    <h1>{this.props.artist[0].artist_name}</h1>
                    <img className='profilePic' src={this.props.artist[0].image_url} alt='artist' />
                    <h2>{this.props.artist[0].description}</h2>
                    </div>
                </div>
                <EventForm artist={this.props.artist[0]} />
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