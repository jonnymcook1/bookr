import React, {Component} from 'react'
import Header from '../Header/Header'
import './Landing.css'

class Landing extends Component {
    render() {
        return(
            <div className='landing'>
               <Header/>
               <h2>Where the show begins</h2>
            </div>
        )
    }
}

export default Landing;