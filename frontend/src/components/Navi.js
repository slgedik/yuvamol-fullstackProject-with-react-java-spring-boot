import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SignedOut from './SignedOut';
import SignedIn from './SignedIn';
import MessagesButton from './MessagesButton';

export default function Navi({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  
  function handleHome() {
    if (isAuthenticated) {
      window.location.href = `/home/${userId}`;
    } else {
      navigate("/");
    }
  }

  function handlePosts() {
    console.log("navi IDDDD : ", userId);
    navigate(`/posts/${userId}`);
    console.log("userId", userId);
  }

  return (
    <Navbar className='bg-sky-900' variant='light' expand="lg" fixed="top">
      <Navbar.Brand className=' cursor-pointer pl-12  ' onClick={handleHome}><h1 className='font-sans text-5xl text-bold italic text-white'>Yuvam Ol</h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className='mr-4'/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
         
        </Nav>
        <Nav>
          <div>
          {isAuthenticated ? 
              (<div className='flex mr-8' >
              <Button onClick={handlePosts} className='mx-2 my-2'>İlanlarınız</Button>
              <MessagesButton/>
              <SignedIn setIsAuthenticated={setIsAuthenticated} />
              </div>)

              
           :  <SignedOut setIsAuthenticated={setIsAuthenticated} />}
          </div>
        
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
