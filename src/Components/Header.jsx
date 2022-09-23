import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import {useNavigate} from 'react-router-dom'
import { AiOutlineStock } from 'react-icons/ai';


const Header = () => {
  const navigateTo = useNavigate();

  return (

   <Navbar bg="dark" variant="dark">
    {/* <AiOutlineStock className='StockIcon' style={{backgroundColor:'white'}}/> */}
    <Container>
      <AiOutlineStock className='StockIcon' style={{backgroundColor:'white'}}/>
      <Navbar.Brand onClick={()=>navigateTo('/')}>Stock Market</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
      <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={()=>navigateTo('/')}>Home</Nav.Link>
            <Nav.Link onClick={()=>navigateTo('/stock')}>Stock</Nav.Link>
            <Nav.Link onClick={()=>navigateTo('/Fav')}>Favourite</Nav.Link>
            {/* <Nav.Link onClick={()=>navigateTo('/Input')}>Search</Nav.Link> */}
            {/* <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
