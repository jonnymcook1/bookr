import React, {Component} from 'react'
import axios from 'axios'
import {withRouter} from 'react-router'
import {Link, Redirect} from 'react-router-dom' 
import {connect} from 'react-redux'
import {SocialIcon} from 'react-social-icons'
import {getUser, login, logout} from '../../redux/reducer'
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
          login: true,
          redirect: false
        }

        this.handleUsername=this.handleUsername.bind(this)
        this.handlePassword=this.handlePassword.bind(this)
        this.login=this.login.bind(this)
        this.logout=this.logout.bind(this)
        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        // this.loggingIn = this.loggingIn.bind(this)
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
        .then(() => {this.setState({modal: !this.state.modal})
        // this.setState({loggingIn: true})
        this.setState({login: !this.state.login})})
        .then(() => {
          this.props.getUser().then(() => this.props.history.push(`/dashboard/${this.props.user.user_id}`)
          )
        })
        .catch(err => {alert(err, 'login Unsuccessful')})
    }
    
    logout() {
      axios
      .post('/artist/logout')
      .then(res => {
        console.log(res.status)
        // this.props.logout()
        
      })
      .then(() => {this.props.logout()})
      .then(() => this.setState({login: false}))
      .then(() => {this.props.history.push('/')})
    }

    componentDidMount(){
      this.props.getUser().then(() => !this.props.user.user_id ? this.setState({redirect: true}) : null )
    }

    render() {
      console.log(this.props.user)
      const {redirect} = this.state


        return (
          <div className='header'>
              {redirect?
                <>
                  {/* <Redirect to={`/dashboard/${this.props.user.user_id}`} /> */}
                  {<Redirect to='/'/>}
                </>
                :
                <></>

              }
              <Navbar color="light" light expand="md">
                <NavbarBrand id='brand' href="/">bookr</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem id='instaHead' ><SocialIcon url='https://www.instagram.com/johncook1/' style={{ height: 25, width: 25 }} bgColor="#6c757d"/></NavItem>
                    <NavItem id='fbHead' ><SocialIcon url='https://www.facebook.com/profile.php?id=100006264817028' style={{ height: 25, width: 25 }} bgColor="#6c757d"/></NavItem>
                    <NavItem>
                      {redirect? (
                        null
                        ) : (
                        <Link to='/register'><NavLink>Artist Registration</NavLink></Link>
                      )}
                    </NavItem>
                    <NavItem>
                      {redirect? (
                        <Button color="secondary" onClick={this.logout}>Logout</Button>
                        ) : (
                        <Button color="secondary" onClick={this.toggleModal}>{this.props.buttonLabel}Login</Button>
                      )}  
                      <Modal isOpen={this.state.modal} toggleModal={this.toggleModal} className={this.props.className}>
                        <ModalHeader toggleModal={this.toggleModal}>Login to artist account</ModalHeader>
                        <ModalBody>
                          <div className='login'>
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

export default connect(mapStateToProps, {getUser, login, logout})(withRouter(Header));