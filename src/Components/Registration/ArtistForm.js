import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import {Redirect} from 'react-router-dom'
import Header from '../Header/Header';

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

    componentDidMount() {
        this.props.getUser()
    }

    artistForm = (e) => {
        e.preventDefault()
        // console.log(this.props.user)
        const {artist_name, genre, description, image_url, insta_url, fb_url, spotify_url, email} = this.state
        axios
        .post('/artist/form', {artist_name: artist_name, genre: genre, description: description, image_url: image_url, insta_url: insta_url, fb_url: fb_url, spotify_url: spotify_url, email: email, users_id: this.props.user.user_id})
        .then(() => this.setState({redirect: true}))
        .catch(() => {alert('Artist form Unsuccessful')})
    }

    render() {
        
        console.log(this.props.user)
        if(this.state.redirect) {
            alert('Congrats on joining bookr! Please login to continue!')
            return <Redirect to='/login' />
        }

        const {artist_name, genre, description, image_url, insta_url, fb_url, spotify_url, email} = this.state

        return(
            <div className='artist_form'>
                <Header/>
                <form className='artistForm'>
                    Name
                    <input name='artist_name' value={artist_name} onChange={this.handleChange} placeholder='Name' />
                    Genre
                    <input name='genre' value={genre}onChange={this.handleChange} placeholder='Genre' />
                    Description
                    <input name='description' value={description} onChange={this.handleChange} placeholder='Artist Description' />
                         <img className='profilePic' src={image_url} alt='artist' />
                    Image
                    <input type='text' name='image_url' value={image_url} onChange={this.handleChange} placeholder='Image URL' />
                    Facebook
                    <input name='fb_url' value={fb_url} onChange={this.handleChange} placeholder='Facebook URL' />
                    Instagram
                    <input name='insta_url' value={insta_url} onChange={this.handleChange} placeholder='Instagram URL' />
                    Spotify
                    <input name='spotify_url' value={spotify_url} onChange={this.handleChange} placeholder='Spotify URL' />
                    Email
                    <input name='email' value={email} onChange={this.handleChange} placeholder='Email Address' />
                    <button onClick={this.artistForm}>Submit</button>
                </form>
            </div>
        )
    }
} 

const mapStateToProps = reduxState => {
    const {user} = reduxState.reducer;
    return{
        user
    }
}
 export default connect(mapStateToProps, {getUser})(ArtistForm)