import Head from "next/head";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import React from "react";
import {useRouter} from 'next/router'
import {userLogout} from "../routers/utils/api";

const Header = () => {
  const router = useRouter()

  const logout = async () => {
    try {
      const res = await userLogout()
      if (res.status === 200) {
      }
    } catch (e) {
    }
    await router.push('/')
  }

  return (
    <>
      <Head>
        <title>Run Totals</title>
        <link rel="icon" type="image/png" href="../../public/favicon.ico"/>
      </Head>
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="navBar-title">Run Totals</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavDropdown title="Account" id="nav-title">
              <NavDropdown.Item href='/login'>login</NavDropdown.Item>
              <NavDropdown.Item href='/register'>sign up</NavDropdown.Item>
              <NavDropdown.Divider/>
              <NavDropdown.Item onSelect={logout}>logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
