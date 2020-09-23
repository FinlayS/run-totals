import React, {useEffect, useState} from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { useRouter } from 'next/router'
import AddRun from '../components/runs/AddRun';

import { userLogout } from '../routers/api/user';

const Header = () => {
  const router = useRouter()
  const [state , setState] = useState({
    isAuthed: false
  })

  useEffect(() => {
    async function getAuthState() {
      if (window.localStorage.getItem('token')) {
        setState(prevState => ({
          ...prevState,
          isAuthed: true
        }))
      }
    }

    getAuthState().then(() => {
    });
  }, [])

  const logout = async () => {
    try {
      const res = await userLogout()
      if (res.status === 200) {
      }
    } catch (e) {
    }
    await router.push('/Home')
  }

  return (
    <>
      <title>Run Totals</title>
      <link rel='icon' type='image/png' href='../../public/favicon.ico'/>
      <Navbar fixed='top' collapseOnSelect expand='lg' bg='dark' variant='dark'>
        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
        <Navbar.Brand className='navBar-title'>Run Totals</Navbar.Brand>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <NavDropdown title='Account' id='nav-title'>
              <NavDropdown.Item href='/Login' disabled={state.isAuthed}>login</NavDropdown.Item>
              <NavDropdown.Item href='/Register' disabled={state.isAuthed}>sign up</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item onSelect={logout} disabled={!state.isAuthed}>logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {state.isAuthed && <AddRun/>}
      </Navbar>
    </>
  )
}

export default Header
