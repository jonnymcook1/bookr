import React, {Component} from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import {Redirect} from 'react-router-dom'

class Registration extends Component {
    constructor() {
        super() 
        this.state = {
            username: '',
            password: '',
            redirect: false,
        }

        this.handleUsername=this.handleUsername.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
        this.registerUser=this.registerUser.bind(this)
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
                <div>
                    <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Username</Label>
                        <Input type="text" onChange={this.handleUsername} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" onChange={this.handlePassword} />
                        </FormGroup>
                        <Button onClick={this.registerUser} >Submit</Button>
                    </Form>
                </div>    
                {/* // Username
                // <input onChange={this.handleUsername} placeholder='Username' />
                // <br/>
                // Password: 
                // <input onChange={this.handlePassword} placeholder='Password' type='password' />
                // </div>
                // <button onClick={this.registerUser}>Register</button> */}
            </div>
        )
    }
}

export default Registration