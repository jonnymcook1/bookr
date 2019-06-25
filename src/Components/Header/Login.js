import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import {login} from '../../redux/reducer'
import {Redirect} from 'react-router-dom'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            redirect: false
        }

        this.handleUsername=this.handleUsername.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
        this.login=this.login.bind(this)
    }
    
    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    login() {
        axios
        .post('/artist/login', {username: this.state.username, password: this.state.password})
        .then(() => this.setState({redirect: true}))
        .catch(() => {alert('login Unsuccessful')})
    }


    render() {
        console.log(this.props)
        if(this.state.redirect){
            alert('Login successful!')
            return <Redirect to='/dashboard' />
        }
        return (
            <div className='login'>
                <h3>Login</h3>
                <Form inline>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="exampleEmail" className="mr-sm-2">Username</Label>
                        <Input type="text" onChange={this.handleUsername} />
                        </FormGroup>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" onChange={this.handlePassword} />
                        </FormGroup>
                        <Button onClick={this.login} >Submit</Button>
                    </Form>

            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState.reducer 
    return {
        user
    } 
}

export default connect(mapStateToProps, {login})(Login)