import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'
import {Link, Redirect} from 'react-router-dom' 
import {connect} from 'react-redux'
import {getUser, login} from '../../redux/reducer'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
          username: '',
          password: '',
          isOpen: false,
          modal: false,
          login: false
        }

        this.handleUsername=this.handleUsername.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
        this.login=this.login.bind(this)
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    toggleModal() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }

    handleUsername(e) {
        this.setState({username: e.target.value})
    }

    handlePassword(e) {
        this.setState({password: e.target.value})
    }

    login() { 
        axios
        .post('/artist/login', {username: this.state.username, password: this.state.password})
        .then(() => this.setState({modal: !this.state.modal}))
        .then(() => {this.props.getUser()})
        .catch(err => {alert(err, 'login Unsuccessful')})
    }

    componentDidMount() {
    //   if(this.state.login) {
    //     this.props.history.push(`/dashboard/${this.props.user.user_id}`)
    //   } else {
    //     console.log(this.state)
    //   }
    }

    render() {
      // if(this.props.user.user_id){
      //   return (
      //     <>
      //       {alert('Login successful!')}
      //       <Redirect to={`/dashboard/${this.props.user.user_id}`} />
      //     </>
      //   )
      //   // this.props.history.push(`/dashboard/${this.props.user.user_id}`)
      // } else {
      //   console.log(this.props)
      // }

        return (
            <div className='header'>
                {this.props.user.user_id ?
                  <>
                    <Redirect to={`/dashboard/${this.props.user.user_id}`} />
                  </>
                  :
                  null
                }
                <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">bookr</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        <Link to='/register'><NavLink>Artist Registration</NavLink></Link>
                      </NavItem>
                      <NavItem>
                      <Button color="secondary" onClick={this.toggleModal}>{this.props.buttonLabel}Login</Button>
                        <Modal isOpen={this.state.modal} toggleModal={this.toggleModal} className={this.props.className}>
                          <ModalHeader toggleModal={this.toggleModal}>Login to artist account</ModalHeader>
                          <ModalBody>
                            <div>
                            Username:
                            <input onChange={this.handleUsername} placeholder='Username' />
                            <br/>
                            Password: 
                            <input onChange={this.handlePassword} placeholder='Password' type='password' />
                            </div>
                            </ModalBody>
                          <ModalFooter>
                        <Button color="secondary" onClick={() => {this.login()}}>Go to Dashboard</Button>{' '}
                        <Button color="outline-danger" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                      </Modal>
                     </NavItem>
                   </Nav>
                  </Collapse>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps= reduxState => {
  console.log(reduxState.reducer)
  const {user, login} = reduxState.reducer
  return {
    user,
    login
  }
}

export default connect(mapStateToProps, {getUser, login})(withRouter(Header));