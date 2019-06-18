import React, {Component} from 'react'
import Header from '../Header/Header'
import axios from 'axios';

class Profile extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        axios
        .get()
    }

    render() {
        return (
            <div className='profile'>
                <Header/>
                <h3>Profile</h3>
            </div>
        )
    }
} 

export default Profile