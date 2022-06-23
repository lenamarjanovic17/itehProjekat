import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Avatar, Dropdown, Nav, Navbar } from 'rsuite'
import { User } from '../types';

interface Props {
  user: User,
  onLogout: () => void
}

export default function UserNavbar(props: Props) {
  const [weather, setWeather] = useState<any>(undefined);


  useEffect(() => {
    axios.get('http://www.7timer.info/bin/api.pl?lon=20.47246239&lat=44.772349&product=civillight&output=json', { withCredentials: false })
      .then(res => {
        setWeather(res.data.dataseries[0].temp2m);
      })
  }, [])

  return (
    <Navbar>
      <Navbar.Brand >
        LMN fashion
      </Navbar.Brand>

      <Nav>
        <Nav.Item as={NavLink} to='/'>Home</Nav.Item>
        <Nav.Item as={NavLink} to='/shop'>Shop</Nav.Item>
      </Nav>
      <Nav pullRight>
        {
          weather && (
            <Nav >
              <Nav.Item>
                Temperature: {weather.min} - {weather.max}
              </Nav.Item>
            </Nav>

          )
        }
        <Nav.Item as={NavLink} to='/cart'>Cart</Nav.Item>
        <Dropdown title={props.user.firstName + ' ' + props.user.lastName}>
          <Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar >
  )
}
