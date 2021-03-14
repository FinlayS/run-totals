import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'
import AddRun from './runs/AddRun';

import { userLogout } from '../api/user';

const Header = (authed) => {
  const router = useRouter()
  const [state] = useState({
    isAuthed: authed.authed
  })

  const logout = async () => {
    try {
      const res = await userLogout()
      if (res.status === 200 || res.status === 401) {
        await router.push('/login')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <title>Run Totals</title>
      <link rel='icon' type='image/png' href='../../public/favicon.ico'/>
      <Navbar sticky='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Brand className='navBar-title'>Run Totals</Navbar.Brand>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <NavDropdown title='Account' id='nav-title'>
              <NavDropdown.Item href='/login' disabled={state.isAuthed}>login</NavDropdown.Item>
              <NavDropdown.Item href='/register' disabled={state.isAuthed}>sign up</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item onSelect={logout} disabled={!state.isAuthed}>logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        { state.isAuthed &&
        <AddRun/>
        }
      </Navbar>
    </>
  )
}

export default Header
