import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Carousel, Container } from 'react-bootstrap';
import axios from 'axios';
import '../CSS/App.css'; 
import defaultImage from '../images/foto.png';
import { ToastContainer, toast } from 'react-toastify';

export default function AnimalDetail({isAuthenticated}) {
  const navigate = useNavigate();
  const { animalId } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ownerName, setOwnerName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
  const fetchAnimal = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/animals/${animalId}`, {
        withCredentials: true,
      });
      setAnimal(response.data);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
      toast.error('Hayvan verileri alınamadı. Lütfen tekrar deneyin.');
      if (error.response && error.response.status === 401) {
        navigate("/login"); // Giriş sayfasına yönlendirin
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOwner = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/users/animal/${animalId}`, {
        withCredentials: true,
      });
      setOwnerName(response.data.username);
    } catch (error) {
      console.error('Sahip bilgisi alınamadı:', error);
      toast.error('Sahip bilgisi alınamadı. Lütfen tekrar deneyin.');
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/users/user-details', {
        withCredentials: true,
      });
      setCurrentUser(response.data);
    } catch (error) {
      console.error('Kullanıcı bilgisi alınamadı:', error);
      toast.error('Kullanıcı bilgisi alınamadı. Lütfen tekrar deneyin.');
    }
  };

  fetchAnimal().then(() => {
    if (!isAuthenticated) {
      toast.success("Mesaj göndermek için giriş yapın!");
    }
  });

  if(isAuthenticated){
    fetchCurrentUser();
    fetchOwner();
  }
  
}, [animalId, isAuthenticated, navigate]);


  function handleBackClick(){
    if(isAuthenticated){
      navigate(`/home/${currentUser.id}`);
    }else{
      navigate("/");
    }
    
  }

  const handleSendMessageClick = async () => {

        if (!currentUser || !animal) {
          console.error('Kullanıcı veya hayvan bilgisi eksik');
          return;
        }

        try {
          const messageDto = {
            senderId: currentUser.id,
            receiverId: animal.ownerId,
            content: `Merhaba, ${animal.animalName} hakkında konuşmak istiyorum.`,
            sentAt: new Date(),
            readAt: null,
          };

          alert("Mesaj gönderildi !");

          await axios.post('http://localhost:8080/api/messages/send', messageDto, {
            withCredentials: true,
          });

          navigate('/messages');
        } catch (error) {
          console.error('Mesaj gönderme hatası:', error);
        }
     
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!animal) {
    return <div>Animal not found</div>;
  }

  return (
    <Container className="mt-4 items-center justify-center">
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
          <Card.Subtitle className="mb-2 text-muted">{animal.age} yaşında</Card.Subtitle>
          <Card.Text><strong> Açıklama: </strong>{animal.description}</Card.Text>
          <Card.Text><strong>Sağlık Durumu: </strong> {animal.healthStatus}</Card.Text>
          <Card.Text><strong>Konum: </strong>{animal.location}</Card.Text>
          <hr style={{ width: '20%', margin: '10px auto' }} />
          <Card.Text><strong>İlan Sahibi: </strong>{ownerName}</Card.Text>
          {currentUser && isAuthenticated && animal.ownerId !== currentUser.id ? (
           (<div>
           <Button variant="success" className="me-2" onClick={handleSendMessageClick}>
              Mesaj at
            </Button>
            <Button variant="danger" onClick={handleBackClick}>Geri dön</Button>
            </div> 
          )
          ): <Button variant="danger" onClick={handleBackClick}>Geri dön</Button> }
        </Card.Body>
      </Card>
      <ToastContainer/>
    </Container>
  );
}
