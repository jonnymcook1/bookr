import React, {Component} from 'react'
import axios from 'axios';
import {Redirect} from 'react-router-dom'

class ArtistForm extends Component {
    constructor() {
        super()
        this.state = {
            artist_name: '',
            genre: '',
            description: '',
            image_url: '',
            insta_url: '',
            fb_url: '',
            spotify_url: '',
            email: '',
            redirect: false
        }

    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    // handleArtist(e) {
    //     this.setState({ artist_name: e.target.value})
    // }

    // handleGenre(e) {
    //     this.setState({ genre: e.target.value})
    // }

    // handleDescription(e) {
    //     this.setState({ description: e.target.value})
    // }

    // handleFb(e) {
    //     this.setState({ fb_url: e.target.value})
    // }

    // handleInsta(e) {
    //     this.setState({ insta_url: e.target.value})
    // }

    // handleSpotify(e) {
    //     this.setState({ spotify_url: e.target.value})
    // }

    // handleEmail(e) {
    //     this.setState({ email: e.target.value})
    // }

    artistForm = () => {
        const {artist_name, genre, description, image_url, insta_url, fb_url, spotify_url, email} = this.state
        axios
        .post('/artist/form', {artist_name: artist_name, genre: genre, description: description, image_url: image_url, insta_url: insta_url, fb_url: fb_url, spotify_url: spotify_url, email: email})
        .then(() => this.setState({redirect: true}))
        .catch(() => {alert('Artist form Unsuccessful')})
    }



    render() {

        if(this.state.redirect) {
            alert('Congrats on joining bookr! Please login to continue!')
            return <Redirect to='/login' />
        }

        return(
            <div className='artist_form'>
                <form className='artistForm'>
                    Name
                    <input name='artist_name' onChange={this.handleChange} placeholder='Name' />
                    Genre
                    <input name='genre' onChange={this.handleChange} placeholder='Genre' />
                    Description
                    <input name='description' onChange={this.handleChange} placeholder='Artist Description' />
                    Facebook
                    <input name='fb' onChange={this.handleChange} placeholder='Facebook URL' />
                    Instagram
                    <input name='insta' onChange={this.handleChange} placeholder='Instagram URL' />
                    Spotify
                    <input name='spotify' onChange={this.handleChange} placeholder='Spotify URL' />
                    Email
                    <input name='email' onChange={this.handleChange} placeholder='Email Address' />
                    <button onClick={this.artistForm}>Submit</button>
                </form>
            </div>
        )
    }
} 
 export default ArtistForm