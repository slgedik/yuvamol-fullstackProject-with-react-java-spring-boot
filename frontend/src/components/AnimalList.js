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
      <div className='w-full flex flex-wrap justify-center items-center mt-8'>
        <Form.Control
          type="text"
          placeholder="Hayvan ismi ara..."
          className='h-12 mb-2 sm:mb-0 sm:mr-4'
          style={{ width: '250px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Form.Select
          className='h-12 mb-2 sm:mb-0 sm:mr-4'
          style={{ width: '200px' }}
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Şehir Seç...</option>
          <option value="Adana">Adana</option>
          <option value="Adıyaman">Adıyaman</option>
          <option value="Afyonkarahisar">Afyonkarahisar</option>
          <option value="Ağrı">Ağrı</option>
          <option value="Aksaray">Aksaray</option>
          <option value="Amasya">Amasya</option>
          <option value="Ankara">Ankara</option>
          <option value="Antalya">Antalya</option>
          <option value="Ardahan">Ardahan</option>
          <option value="Artvin">Artvin</option>
          <option value="Aydın">Aydın</option>
          <option value="Balıkesir">Balıkesir</option>
          <option value="Bartın">Bartın</option>
          <option value="Batman">Batman</option>
          <option value="Bayburt">Bayburt</option>
          <option value="Bilecik">Bilecik</option>
          <option value="Bingöl">Bingöl</option>
          <option value="Bitlis">Bitlis</option>
          <option value="Bolu">Bolu</option>
          <option value="Burdur">Burdur</option>
          <option value="Bursa">Bursa</option>
          <option value="Çanakkale">Çanakkale</option>
          <option value="Çankırı">Çankırı</option>
          <option value="Çorum">Çorum</option>
          <option value="Denizli">Denizli</option>
          <option value="Diyarbakır">Diyarbakır</option>
          <option value="Düzce">Düzce</option>
          <option value="Edirne">Edirne</option>
          <option value="Elazığ">Elazığ</option>
          <option value="Erzincan">Erzincan</option>
          <option value="Erzurum">Erzurum</option>
          <option value="Eskişehir">Eskişehir</option>
          <option value="Gaziantep">Gaziantep</option>
          <option value="Giresun">Giresun</option>
          <option value="Gümüşhane">Gümüşhane</option>
          <option value="Hakkari">Hakkari</option>
          <option value="Hatay">Hatay</option>
          <option value="Iğdır">Iğdır</option>
          <option value="Isparta">Isparta</option>
          <option value="Istanbul">Istanbul</option>
          <option value="İzmir">İzmir</option>
          <option value="Kahramanmaraş">Kahramanmaraş</option>
          <option value="Karabük">Karabük</option>
          <option value="Karaman">Karaman</option>
          <option value="Kars">Kars</option>
          <option value="Kastamonu">Kastamonu</option>
          <option value="Kayseri">Kayseri</option>
          <option value="Kırıkkale">Kırıkkale</option>
          <option value="Kırklareli">Kırklareli</option>
          <option value="Kırşehir">Kırşehir</option>
          <option value="Kilis">Kilis</option>
          <option value="Kocaeli">Kocaeli</option>
          <option value="Konya">Konya</option>
          <option value="Kütahya">Kütahya</option>
          <option value="Malatya">Malatya</option>
          <option value="Manisa">Manisa</option>
          <option value="Mardin">Mardin</option>
          <option value="Mersin">Mersin</option>
          <option value="Muğla">Muğla</option>
          <option value="Muş">Muş</option>
          <option value="Nevşehir">Nevşehir</option>
          <option value="Niğde">Niğde</option>
          <option value="Ordu">Ordu</option>
          <option value="Osmaniye">Osmaniye</option>
          <option value="Rize">Rize</option>
          <option value="Sakarya">Sakarya</option>
          <option value="Samsun">Samsun</option>
          <option value="Siirt">Siirt</option>
          <option value="Sinop">Sinop</option>
          <option value="Sivas">Sivas</option>
          <option value="Şanlıurfa">Şanlıurfa</option>
          <option value="Şırnak">Şırnak</option>
          <option value="Tekirdağ">Tekirdağ</option>
          <option value="Tokat">Tokat</option>
          <option value="Trabzon">Trabzon</option>
          <option value="Tunceli">Tunceli</option>
          <option value="Uşak">Uşak</option>
          <option value="Van">Van</option>
          <option value="Yalova">Yalova</option>
          <option value="Yozgat">Yozgat</option>
          <option value="Zonguldak">Zonguldak</option>
        </Form.Select>
        <Form.Select
          className='h-12'
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
          <Col key={animal.animalId} lg={4} md={6} sm={12} className="mt-3 flex items-center justify-center">
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
