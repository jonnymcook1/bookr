import React, {Component} from 'react'
// import axios from 'axios'
import {Link} from 'react-router-dom' 



class Header extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <div className='header'>
               <Link to='/'>
                   <button className='home_button'>bookr</button>
               </Link>
               <Link to='/login'>
                   <button className='login_button'>Login</button>
               </Link>
               <Link to='/register'>
                   <button className='register_button'>Register</button>
               </Link>
            </div>
        )
    }
}

export default Header;