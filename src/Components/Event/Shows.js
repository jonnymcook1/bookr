import React, {Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

class Shows extends Component {
    constructor(){
        super()
        this.state = {
          shows: []
        }
    }

    componentDidMount() {
      axios
      .get('/shows')
      .then(response => {console.log(response.data)
        this.setState({shows: response.data})
      })
    }

    render() {
      let {shows} = this.state
      let displayShows = shows.map(show => {
        return(
          <tr key={show.artist_id}>
            <td>{show.event_name}</td>
            <td>{show.venue_name}</td>
            <td>{show.event_date}/{show.event_time}</td>
            <td>{show.city},{show.state}</td>
            <td>{show.event_duration}</td>
            <td>{show.event_description}</td>
          </tr>
        )
      })
        return(
            <div className='shows'>
                <h4>Upcoming Shows</h4>
                 <Table dark>
        <thead>
          <tr>
            <th>Event</th>
            <th>Venue</th>
            <th>Date/Time</th>
            <th>Location</th>
            <th>Duration</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {displayShows}
        </tbody>
      </Table>
            </div>
        )
    }
}

export default Shows 