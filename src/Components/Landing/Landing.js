import React, {Component} from 'react'
import Featured from './Featured';


class Landing extends Component {
  
  componentDidMount() {
    
  }

    render() {
        return(
            <div>
              <div className='landing'>
                <h2 id='slogan'>Where the show begins</h2>
                <p>bookr</p>
              </div>
              <div>
                  <Featured/>
              </div>
            </div>
        )
    }
}

export default Landing;