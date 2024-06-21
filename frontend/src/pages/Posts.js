import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import defaultImage from '../images/foto.png'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Posts() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [animals, setAnimals] = useState([]);
  function handleDetailClick(animalId){
    navigate(`/post-detail/${animalId}`)
  }
  function handleButton(){
    navigate(`/animals/add/${userId}`);
  }
  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/animals/owner/${userId}`, {
          withCredentials: true 
        });
        setAnimals(response.data); 
        
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        if (error.response) {
          console.error('Sunucu yanıtı hatası:', error.response.status);
        } else if (error.request) {
          console.error('İstek gönderilemedi:', error.request);
        } else {
          console.error('Hata mesajı:', error.message);
        }
      }
    };

    fetchAnimals();
   
  }, [userId]);
  return (
    <div className='mt-16 flex items-center justify-center bg-slate-200'>
      {animals.length>0 ? 
      
      (
      <Row>
        <div className='flex item-center justify-start ml-3 mb-4'><Button onClick={handleButton} variant="success" className='h-12 w-32'>İlan oluştur</Button></div>
       
      {animals.map((animal) => (
        <Col key={animal.animalId} md={4} className="mt-3 flex item-center justify-center">
          <Card className='mt-8 mb-4 shadow-[20px_21px_15px_-3px_rgba(0,0,0,0.1)]' style={{ width: '80%', height: '430px', overflow: 'hidden'}}>
            {animal.photos && animal.photos.length > 0 ? (
              <Card.Img
                variant="top"
                src={`data:image/jpeg;base64,${animal.photos[0].photo}`}
                className='h-[256px]'
              />
            ) : (
              <Card.Img
                variant="top"
                src={defaultImage}
                className='h-[256px]'
              />
            )}
            <Card.Body>
              <Card.Title>{animal.animalName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{animal.breed}</Card.Subtitle>
              <Card.Text>
                  {animal.description.length > 50 ? `${animal.description.substring(0, 50)}...` : animal.description}
              </Card.Text>
              <Button variant="success" className="me-2" onClick={()=>handleDetailClick(animal.animalId)}>Detay Görüntüle</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
      
    </Row>) : <div><h1> Aktif ilanınız yok </h1>
              <Button onClick={handleButton}>İlan oluştur</Button></div>}
      
            
    </div>
  );
}
