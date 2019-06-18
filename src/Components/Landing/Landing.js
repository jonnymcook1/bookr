import React, {Component} from 'react'
import Header from '../Header/Header'
import './Landing.css'

class Landing extends Component {
    render() {
        return(
            <div className='landing'>
               <Header/>
               <h2>Landing</h2>
            </div>
        )
    }
}

export default Landing;