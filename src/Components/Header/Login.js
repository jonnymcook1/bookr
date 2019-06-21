import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux';
import {login} from '../../redux/reducer'
import {Redirect} from 'react-router-dom'

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

    // login() {
    //     this.props.login(this.state.username, this.state.password)
    // }

    login() {
        axios
        .post('/artist/login', {username: this.state.username, password: this.state.password})
        .then(() => this.setState({redirect: true}))
        .catch(() => {alert('login Unsuccessful')})
    }


    // login() {
    //     axios
    //     .post('/artist/login', {username: this.state.username, password: this.state.password})
    //     .then((event_id) => {
    //         this.props.updateEventId(event_id)
    //         this.setState({redirect: true})
    //     })
    //     .catch(() => {alert('login Unsuccessful')})
    // }

    render() {
        console.log(this.props)
        if(this.state.redirect){
            alert('Login successful!')
            return <Redirect to='/dashboard' />
        }
        return (
            <div className='login'>
                <h3>Login</h3>
                <div>
                    Username
                    <input onChange={this.handleUsername} placeholder="Username"/>
                    Password
                    <input onChange={this.handlePassword} placeholder="Password"/>
                </div>
                <button onClick={this.login}>Login</button>
                
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