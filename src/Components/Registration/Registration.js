import React, {Component} from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import Header from '../Header/Header'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Registration extends Component {
    constructor() {
        super() 
        this.state = {
            username: '',
            password: '',
            redirect: false,
            modal: false
        }

        this.handleUsername=this.handleUsername.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
        this.registerUser=this.registerUser.bind(this)
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    registerUser() {
        axios
        .post('/artist/register', {username: this.state.username, password: this.state.password})
        .then(() => this.setState({redirect: true}))
        .catch(() => {alert('Registration Unsuccessful')})
    }

    render() {

        if(this.state.redirect){
            alert('Please fill out Artist form in to continue!')
            return <Redirect to='/artist/form' />
        }

        return (
            <div className='register'>
                <Header/>
                <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}register</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Create New Account!</ModalHeader>
                <ModalBody>
                <div>
                Username
                <input onChange={this.handleUsername} placeholder='Username' />
                <br/>
                Password: 
                <input onChange={this.handlePassword} placeholder='Password' type='password' />
                </div>
            </ModalBody>
              <ModalFooter>
                <Button color="secondary" onClick={this.registerUser}>Do Something</Button>{' '}
                <Button color="danger" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
            </div>
        )
    }
}

export default Registration