import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
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
        .get(`/artist/genre/${genre}`)
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
                    <li className='featuredName'>{artist.artist_name}</li>
                    <Link to={`/artist/${artist.artist_id}`}><Button>View Profile</Button></Link>
                </ul>
            )
        })
        return(
            <div className='featured'>
                <h1 className='header1'>Choose Genre to view Artist</h1>
                <div className='genreList'>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('polka')}>polka</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('hip-hop')}>Test</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('Pop')}>Pop</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('Hip-Hop')}>Hip-Hop</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('R&B')}>R&B</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('DJ')}>DJ</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('Country')}>Country</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('Rock')}>Rock</Button>
                    <Button className='b1' color='outline-secondary' onClick={() => this.getGenre('Speaker')}>Speaker</Button>
                </div>
                <div id='artistDisplay'>
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