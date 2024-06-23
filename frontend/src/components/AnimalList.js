import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnimals } from '../store/thunks/fetchAnimals';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import defaultImage from '../images/foto.png';
import '../CSS/App.css';
import { Form, Pagination } from 'react-bootstrap';

const AnimalList = ({ selectedCategory }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const animals = useSelector((state) => state.animals.animals);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const animalsPerPage = 12;

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const filteredAnimals = animals
    .filter(animal => selectedCategory ? animal.speciesId === selectedCategory : true)
    .filter(animal => animal.animalName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(animal => selectedCity ? animal.location === selectedCity : true)
    .filter(animal => selectedGender ? animal.gender === selectedGender : true);

  const indexOfLastAnimal = currentPage * animalsPerPage;
  const indexOfFirstAnimal = indexOfLastAnimal - animalsPerPage;
  const currentAnimals = filteredAnimals.slice(indexOfFirstAnimal, indexOfLastAnimal);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleDetailClick(animalId) {
    navigate(`/animal/post/detail/${animalId}`);
  }

  return (
    <Container className='h-full flex-col justify-center items-center'>
      <h1 className='italic font-bold'>Yuva Arıyorum..</h1>
      <div className='w-full flex justify-center items-center mt-8'>
        <Form.Control
          type="text"
          placeholder="Hayvan ismi ara..."
          className='h-12'
          style={{ width: '250px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select
          className='h-12 ml-4'
          style={{ width: '200px' }}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Şehir Seç...</option>
          {/* Şehir seçenekleri */}
          <option value="Adana">Adana</option>
          <option value="Ankara">Ankara</option>
          <option value="Istanbul">Istanbul</option>
          {/* Diğer şehirler */}
        </Form.Select>
        <Form.Select
          className='h-12 ml-4'
          style={{ width: '200px' }}
          value={selectedGender}
          onChange={(e) => setSelectedGender(e.target.value)}
        >
          <option value="">Cinsiyet Seç...</option>
          <option value="Erkek">Erkek</option>
          <option value="Dişi">Dişi</option>
        </Form.Select>
      </div>
      <Row>
        {currentAnimals.map((animal) => (
          <Col key={animal.animalId} lg={4} md={6} sm={12} className="mt-3 flex items-center justify-center ">
            <Card className="ml-4 shadow-[20px_21px_15px_-3px_rgba(0,0,0,0.1)] mb-4" style={{ width: '100%', height: '430px', overflow: 'hidden' }}>
              {animal.photos && animal.photos.length > 0 ? (
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${animal.photos[0].photo}`}
                  className='h-[256px] border-bottom border-2 border-grey'
                />
              ) : (
                <Card.Img
                  variant="top"
                  className='h-[256px] border-bottom border-2 border-grey'
                  src={defaultImage}
                />
              )}
              <Card.Body>
                <Card.Title>{animal.animalName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{animal.breed}</Card.Subtitle>
                <Card.Text>
                  {animal.description.length > 50 ? `${animal.description.substring(0, 50)}...` : animal.description}
                </Card.Text>
                <Button variant="warning" className="me-2" onClick={() => handleDetailClick(animal.animalId)}>Detay Görüntüle</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className='w-full flex justify-center items-center mt-4'>
        <Pagination>
          {[...Array(Math.ceil(filteredAnimals.length / animalsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </Container>
  );
};

export default AnimalList;
