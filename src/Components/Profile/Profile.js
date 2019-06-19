import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getArtist} from '../../redux/artistReducer'
import Header from '../Header/Header'
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        this.props.getArtist(this.props.match.params.id)
        // console.log(this.props.match.params)
    }

    // mapArtist = () => {
    //     console.log(this.props.artist.artist_name)
    //     const list = this.props.artist.map((artist, index) => (
    //         <div
    //          className='artistProfile'
    //          key= {index}
    //          >
    //              <div className='profileArtist'>
    //                  <h2>{artist.artist_name}</h2>
    //              </div>
    //          </div>
    //     ))
    //     return list
    // }

    render() {
        console.log(this.props.artist)
        return (
            <div className='profile'>
                <Header/>
                <h3>Profile</h3>
                <div className='artistInfo'>
                    <div className='info'>
                    <h1>{this.props.artist.artist_name}</h1>
                    <img className='profilePic' src={this.props.artist.image_url} alt='artist' />
                    <h2>{this.props.artist.description}</h2>
                    </div>
                </div>
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