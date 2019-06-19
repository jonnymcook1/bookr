import React, {Component} from 'react'
// import axios from 'axios'
import {Link} from 'react-router-dom' 
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem } from 'reactstrap';



class Header extends Component {
    constructor() {
        super()
        this.state = {
          isOpen: false
        }

        this.toggle = this.toggle.bind(this);
    }
    
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    render() {
        return (
            <div className='header'>
                <Navbar color="light" light expand="md">
                  <NavbarBrand href="/">bookr</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                      <NavItem>
                        
                      </NavItem>
                      <NavItem>
                        <Link to='/login'><NavLink>Login</NavLink></Link>
                     </NavItem>
                     {/* <UncontrolledDropdown nav inNavbar>
                       <DropdownToggle nav caret>
                  Options
                       </DropdownToggle>
                      <DropdownMenu right>
                       <DropdownItem>
                    Option 1
                       </DropdownItem>
                       <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
        </Navbar>
            </div>
        )
    }
}

export default Header;