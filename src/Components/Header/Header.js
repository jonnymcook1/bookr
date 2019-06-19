import React, {Component} from 'react'
import axios from 'axios'
import {Link, Redirect} from 'react-router-dom' 
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
    constructor() {
        super()
        this.state = {
          username: '',
          password: '',
          isOpen: false,
          modal: false
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
        .then(() => this.setState({redirect: true}))
        .catch(() => {alert('login Unsuccessful')})
    }

    render() {

      if(this.state.redirect){
        alert('Login successful!')
        return <Redirect to='/dashboard' />
      }

        return (
            <div className='header'>
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
                            Username
                            <input onChange={this.handleUsername} placeholder='Username' />
                            <br/>
                            Password: 
                            <input onChange={this.handlePassword} placeholder='Password' type='password' />
                            </div>
                            </ModalBody>
                          <ModalFooter>
                        <Button color="secondary" onClick={this.login}>Go to Dashboard</Button>{' '}
                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
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

export default Header;