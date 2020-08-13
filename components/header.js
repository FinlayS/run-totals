import Head from "next/head";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import React from "react";

const Header = () => {
  return (
 <>
   {/*<style jsx>{`*/}
   {/*  marginBottom: 5%;*/}
   {/*`}</style>*/}
   <Head>
     <title>Run Totals</title>
     <link rel="icon" type="image/png" href="../public/favicon.png"/>
   </Head>
     <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark" >
       <Navbar.Brand text-align="center">Run Totals</Navbar.Brand>
       <Navbar.Toggle aria-controls="responsive-navbar-nav" />
       <Navbar.Collapse id="responsive-navbar-nav">
         <Nav>
           <NavDropdown title="Runs" id="nav-title">
             <NavDropdown.Item href='/bob'>Bob</NavDropdown.Item>
             <NavDropdown.Divider />
             <NavDropdown.Item href='/jon'>Jon</NavDropdown.Item>
           </NavDropdown>
         </Nav>
       </Navbar.Collapse>
     </Navbar>
 </>
  )
}

export default Header
