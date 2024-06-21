import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import background from '../images/arkaPlan.png';
import "../CSS/App.css";
export default function Login({ setIsAuthenticated}) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({ ...prevCredentials, [name]: value }));
  };

 // Login componenti
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8080/login', new URLSearchParams({
      username: credentials.username,
      password: credentials.password
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    });

    // Giriş başarılı, şimdi kullanıcı bilgilerini al
    const userResponse = await axios.get('http://localhost:8080/api/users/user-details', {
      withCredentials: true
    });
    const userId = userResponse.data.id;
    setSuccess(true);
    setError(null);
    setIsAuthenticated(true);
 
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('userId', userResponse.data.id);
    
    // Kullanıcı ID'si ile yönlendirme
    navigate(`/home/${userId}`);
  } catch (err) {
    console.error('Error response:', err.response);
    if (err.response) {
      setError(`Giriş işlemi başarısız oldu: ${err.response.status}`);
    } else if (err.request) {
      setError('Giriş işlemi başarısız oldu: Sunucuya ulaşılamıyor.');
    } else {
      setError(`Giriş işlemi başarısız oldu: ${err.message}`);
    }
    setSuccess(false);
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

    
    <Container  className=" d-flex align-items-center justify-content-center login-box rounded-2xl" style={{width:'300px', height: '35%'}}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label><strong>Kullanıcı Adı</strong></Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Kullanıcı Adı"
            required
          />
        </Form.Group>
        <Form.Group  className='mt-4 mb-2' controlId="formPassword">
          <Form.Label><strong>Şifre</strong></Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Şifre"
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className='mt-3'>Giriş Yap</Button>
        {error && <Alert variant="danger" className='mt-3'>{error}</Alert>}
        {success && <Alert variant="success" className='mt-3'>Giriş başarılı!</Alert>}
      </Form>
    </Container>
    </div>
  );
}
