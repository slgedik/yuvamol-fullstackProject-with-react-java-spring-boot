import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import background from "../images/arkaPlan.png";
export default function Register() {
  const [user, setUser] = useState({ username: '', email: '', password: '', profilePhoto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUser((prevUser) => ({ ...prevUser, profilePhoto: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/users/signup', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      toast.success('Kayıt başarılı!');
    } catch (err) {
      toast.error('Kayıt işlemi başarısız oldu.');
    }
  };

  const containerStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity : '0.7',
  };
  

  return (
    <div style={containerStyle}>

   
    <Container className= "d-flex align-items-center justify-content-center login-box rounded-2xl" style={{minWidth: '300px', width: '30%' ,height: '50%'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label><strong> Kullanıcı Adı </strong></Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Kullanıcı Adı"
            required
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="formEmail">
          <Form.Label> <strong>  Email </strong></Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="formPassword">
          <Form.Label> <strong>  Şifre </strong></Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Şifre"
            required
          />
        </Form.Group>
        <Form.Group className='mt-2' controlId="formProfilePhoto">
          <Form.Label> <strong>  Profil Fotoğrafı </strong></Form.Label>
          <Form.Control
            type="file"
            name="profilePhoto"
            onChange={handlePhotoChange}
          />
        </Form.Group>
        <Button type="submit" variant="primary" className='mt-4'>Kayıt Ol</Button>
      </Form>
      <ToastContainer />
    </Container>

    </div>
  );
}
