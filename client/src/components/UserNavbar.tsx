import React from 'react'
import { NavLink } from 'react-router-dom';
import { Avatar, Dropdown, Nav, Navbar } from 'rsuite'
import { User } from '../types';

interface Props {
  user: User,
  onLogout: () => void
}

export default function UserNavbar(props: Props) {
  return (
    <Navbar>
      <Navbar.Brand >
        LMN fashion
      </Navbar.Brand>
      <Nav>
        <Nav.Item as={NavLink} to='/'>Home</Nav.Item>
      </Nav>
      <Nav>
        <Nav.Item as={NavLink} to='/shop'>Shop</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Dropdown title={props.user.firstName + ' ' + props.user.lastName}>
          <Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar >
  )
}
