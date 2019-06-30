import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {getArtist} from '../../redux/artistReducer'
import {getUser} from '../../redux/reducer'
import { Col, Row, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class EventForm extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            date: '',
            time: 0,
            duration: 0,
            description: '',
            type: '',
            venue: '',
            address: '',
            city: '',
            state: '',
            zip: 0,
            country: '',
            price: 0

        }
    }

    handleChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
     console.log(this.props)
      this.props.getArtist()
      this.props.getUser()
    }

    eventForm = (e) => {
      console.log(this.props)
      e.preventDefault()
      const {name, type, date, time, duration, description, venue, address, city, state, zip, price} = this.state
      axios
      .post('/event/form', {event_name: name, event_type: type, event_date: date, event_time: time, event_duration: duration, event_description: description, venue_name: venue, address: address, city: city, state: state, zip_code: zip, booking_price: price, artist_id: this.props.artist[0].artist_id})
      .then(res => {console.log(res.data)})
      .catch(() => {alert('Please complete form to continue')})
  }

    render() {
        console.log(this.props.artist)
        return (
            <div className='eventForm'>
                <Form>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="name">Event Name</Label>
                        <Input type="text" name="name" onChange={this.handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="type">Event Type</Label>
                        <Input type="select" name="type" onChange={this.handleChange} id="examplePassword" placeholder="Choose type" >
                          <option value="" disabled selected hidden>Please Choose</option>
                          <option>Concert</option>
                          <option>Birthday</option>
                          <option>Charity Event</option>
                          <option>Speaking Event</option>
                          <option>Photoshoot</option>
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <Label for="exampleText">Event Description</Label>
                    <Input type="textarea" name="description" onChange={this.handleChange} id="exampleText" />
                  </FormGroup>
                  <Col>
                  <Row>
                  <FormGroup>
                    <Label for="exampleText">Event Date</Label>
                    <Input type="date" name="date" onChange={this.handleChange} id="exampleText" />
                  </FormGroup>
                  <Col>
                  <FormGroup>
                    <Label for="exampleText">Event Time</Label>
                    <Input type="time" name="time" onChange={this.handleChange} id="exampleText" />
                  </FormGroup>
                  </Col>
                  <FormGroup>
                    <Label for="exampleText">Event Duration(hrs)</Label>
                    <Input type="number" name="duration" onChange={this.handleChange} id="exampleText" />
                  </FormGroup>
                  </Row>
                  </Col>
                  <FormGroup>
                    <Label for="exampleAddress">Venue</Label>
                    <Input type="text" name="venue" onChange={this.handleChange} placeholder="Trees"/>
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleAddress">Address</Label>
                    <Input type="text" name="address" onChange={this.handleChange} id="exampleAddress" placeholder="1234 Main St"/>
                  </FormGroup>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleCity">City</Label>
                        <Input type="text" name="city" onChange={this.handleChange} id="exampleCity" placeholder="Dallas"/>
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="exampleState">State</Label>
                        <Input type="text" name="state" onChange={this.handleChange} id="exampleState" placeholder="Texas"/>
                      </FormGroup>
                    </Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="exampleZip">Zip</Label>
                        <Input type="text" name="zip" onChange={this.handleChange} id="exampleZip" placeholder="75000"/>
                      </FormGroup>  
                    </Col>
                  </Row>
                  <FormGroup>
                        <Label for="price">Booking Bid</Label>
                        <Input type="text" name="price" onChange={this.handleChange} placeholder="$"/>
                      </FormGroup>  
                  <Button onClick={this.eventForm}>Request Booking</Button>
              </Form>
          </div>
        )
    }
}

const mapStateToProps = reduxState => {
  const {artist} = reduxState.artistReducer;
  const {user} = reduxState.reducer;
  return {
    artist,
    user
  }
}
export default connect(mapStateToProps, {getArtist, getUser})(EventForm)