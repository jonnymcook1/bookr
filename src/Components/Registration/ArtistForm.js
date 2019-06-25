import React, {Component} from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import {Redirect} from 'react-router-dom'
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';

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

        const {artist_name, genre, description, image_url, insta_url, spotify_url, email} = this.state

        return(
            <div className='artist_form'>
                <Form>
        <FormGroup row>
          <Label for="exampleEmail" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="text" name='artist_name' value={artist_name} onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="examplePassword" sm={2}>Genre</Label>
          <Col sm={10}>
            <Input name='genre' value={genre}onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Artist Description</Label>
          <Col sm={10}>
            <Input type="textarea" name='description' value={description} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <img className='profilePic' src={image_url} alt='artist' />
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Upload Image</Label>
          <Col sm={10}>
            <Input type='url' name='image_url' value={image_url} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Instagram</Label>
          <Col sm={10}>
            <Input type="url" name='insta_url' value={insta_url} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Instagram</Label>
          <Col sm={10}>
            <Input type='url' name='spotify_url' value={spotify_url} onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Email</Label>
          <Col sm={10}>
            <Input type='email' name='email' value={email} onChange={this.handleChange} />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 5 }}>
            <Button onClick={this.artistForm} >Submit</Button>
          </Col>
        </FormGroup>
      </Form>
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