import React, {Component} from 'react';
import { Table } from 'reactstrap';
import axios from 'axios';

class Shows extends Component {
    constructor(props){
        super(props)
        this.state = {
          shows: []
        }
    }

    componentDidMount() {
      console.log(this.props)
      this.refreshList(this.props.id);
    }
    
    refreshList(id) {
       console.log(id)
       console.log(typeof id)
      axios
      .get(`/shows/${id}`)
      .then(response => {console.log(response.data)
        this.setState({shows: response.data})
      })
    }

    componentDidUpdate(prevProps) {
      console.log(this.props)
      if(prevProps !== this.props) {
        this.refreshList();
      }
    }

    render() {
      console.log(this.props.id)
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
                <h4 className='showsHeader'>Upcoming Shows</h4>
                 <Table dark>
        <thead>
          <tr>
            <th id='th'>Event</th>
            <th id='th'>Venue</th>
            <th id='th'>Date/Time</th>
            <th id='th'>Location</th>
            <th id='th'>Duration</th>
            <th id='th'>Description</th>
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