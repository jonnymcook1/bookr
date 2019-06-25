import React, {Component} from 'react'
import Featured from './Featured';
import './Landing.css'

class Landing extends Component {
    render() {
        return(
            <div>
              <div className='landing'>
                <h2>Where the show begins</h2>
              </div>
              <div>
                  <Featured/>
              </div>
            </div>
        )
    }
}

export default Landing;