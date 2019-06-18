import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../redux/reducer'
import {Redirect} from "react-router-dom"
import Header from '../Header/Header'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        if(!this.props.user) {
            this.setState({redirect: true});
        }
        if(this.state.redirect) {
            alert('Please login')
            return <Redirect to='/' />
        }

        return (
            <div className='dashboard'>
                <Header/>
                <h3>Artist Dashboard</h3>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState;
    return{
        user
    }
}

export default connect(mapStateToProps, {getUser})(Dashboard)