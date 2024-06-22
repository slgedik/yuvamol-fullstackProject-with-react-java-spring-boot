import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Carousel, Container } from 'react-bootstrap';
import axios from 'axios';
import defaultImage from '../images/foto.png'
import { ToastContainer, toast } from 'react-toastify';
export default function UserPostDetail() {
  const { animalId } = useParams();
  const [animal, setAnimal] = useState(null);
console.log("animal ID ", animalId);
const navigate = useNavigate();
function handleInfoClick(animalId){
    navigate(`/post-edit/${animalId}`)
}

async function handleDeleteClick(animalId, ownerId) {
  try {
    const response = await axios.delete(`http://localhost:8080/api/animals/${animalId}`, {
      withCredentials: true // Kimlik doğrulama bilgilerini gönder
    });
    setAnimal(null); // Animal verisini null yaparak ilanı kaldırın
    alert("İlan silindi");

      navigate(`/posts/${ownerId}`);

  } catch (error) {
    console.error('Error deleting animal:', error);
    toast.error("İlan silme işlemi başarısız oldu.");
  }
}

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/animals/${animalId}`, {
          withCredentials: true,
        });
        setAnimal(response.data);
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

    fetchAnimal();
  }, [animalId]);

  if (!animal) {
    return <div>Animal not found</div>; // Hayvan bulunamazsa gösterilecek mesaj
  }

  return (
    <Container className="mt-12">
      <Card>
      {animal.photos && animal.photos.length > 0 ? (
          <Carousel data-bs-theme="dark" className="w-full flex justify-center items-center">
            {animal.photos.map((photo, index) => (
              <Carousel.Item key={index} className="flex justify-center items-center">
                <img
                  className="d-block mx-auto max-h-[400px] max-w-[600px] object-contain"
                  src={`data:image/jpeg;base64,${photo.photo}`}
                  alt={`Slide ${index}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        ) : (
          <img
            className="d-block mx-auto max-h-[400px] max-w-[600px] object-contain"
            src={defaultImage}
            alt="Default"
          />
        )}
        <Card.Body>
        <Card.Title>{animal.animalName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{animal.breed}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">{animal.gender} / {animal.age} yaşında</Card.Subtitle>
          <Card.Text><strong> Açıklama: </strong>{animal.description}</Card.Text>
          <Card.Text><strong>Sağlık Durumu: </strong> {animal.healthStatus}</Card.Text>
          <Card.Text><strong>Konum: </strong>{animal.location}</Card.Text>
          <Button variant="warning" onClick={()=> handleInfoClick(animal.animalId)} className='mr-4'>Bilgileri düzenle</Button>
          <Button variant="danger" onClick={()=> handleDeleteClick(animal.animalId, animal.ownerId)}>İlanı Sil</Button>
          <ToastContainer/>
        </Card.Body>
      </Card>
    </Container>
  );
}
