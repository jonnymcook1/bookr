import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getArtist} from '../../redux/artistReducer';
import {Button} from 'reactstrap';

class Featured extends Component {
    constructor() {
        super()
        this.state = {
            genre: []
        } 
    }

    getGenre = (genre) => {
        axios
        .get(`/artist/${genre}`)
        .then(response => {console.log(response.data)
            this.setState({genre: response.data})
        })
    }

    render() {
        console.log(this.state)
        let {genre} = this.state
        let displayArtist = genre.map(artist => {
            return (
                <ul className='featuredList' key={artist.artist_id}>
                    <img className='featuredPic' src={artist.image_url} alt='featuredPic'/>
                    <Button>View Profile</Button>
                </ul>
            )
        })
        return(
            <div className='featured'>
                <h1>Featured</h1>
                <div className='genreList'>
                    <Button color='outline-secondary' onClick={() => this.getGenre('polka')}>polka</Button>
                    <Button color='outline-secondary' onClick={() => this.getGenre('hip-hop')}>hip-hop</Button>
                </div>
                <div>
                {displayArtist}
                </div>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {artist} = reduxState.artistReducer;
    return {
        artist
    }
}

export default connect(mapStateToProps, {getArtist})(Featured)