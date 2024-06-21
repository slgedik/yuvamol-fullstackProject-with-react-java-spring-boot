import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import Categories from '../components/Categories';
import AnimalList from '../components/AnimalList';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS dosyasını içe aktarın

export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);


  return (
    <div className='bg-slate-200 mt-8'>
      <Container className="flex items-center justify-center">
        <ToastContainer position="bottom-right" />
        <Row>
          <Col lg={3} md={4} sm={12} >
            <Categories setSelectedCategory={setSelectedCategory} />
          </Col>
          <Col lg={9} md={8} sm={12}>
            <AnimalList selectedCategory={selectedCategory}  />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
