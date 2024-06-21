import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default function UserProfile({setIsAuthenticated}) {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
    profilePhoto: null,
  });
  const { userId } = useParams();
  const [isEditable, setIsEditable] = useState(false);
 const [isChange, setIsChange] = useState(false);
 const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/user-details`, {
          withCredentials: true,
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if(name === "username" && value !== userInfo.username){
        setIsChange(true);
    }

    
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateClick = () => {
    isEditable?(setIsEditable(false)):(setIsEditable(true));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserInfo((prevState) => ({
        ...prevState,
        profilePhoto: reader.result.split(',')[1], // Base64 string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("user infoooo, ", userInfo);
      await axios.put(`http://localhost:8080/api/users/updateProfile/${userId}`, userInfo, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      
      if(isChange){
        alert('Kullanıcı adını değiştirdiniz tekrar giriş yapınız ! ');
        navigate("/login");
        setIsAuthenticated(false);
      }else{
        alert('Profil başarıyla güncellendi!');
        window.location.reload();
      }
    } catch (error) {
      console.error('Profil güncelleme hatası:', error);
      alert('Profil güncelleme işlemi başarısız oldu.');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center mt-5">
      <h1 className="mb-4">Kullanıcı Profili</h1>
      <form onSubmit={handleSubmit} className="w-50">
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={userInfo.username}
            onChange={handleInputChange}
            required
            disabled={!isEditable}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={userInfo.email}
            placeholder={userInfo.email}
            onChange={handleInputChange}
            required
            disabled={!isEditable}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="profilePhoto" className="form-label">
            Profil Fotoğrafı:
          </label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            className="form-control"
            onChange={handlePhotoChange}
            disabled={!isEditable}
          />
        </div>
        {userInfo.profilePhoto && (
          <div className="mb-3">
            <img
              src={`data:image/jpeg;base64,${userInfo.profilePhoto}`}
              alt="Profile"
              className="img-thumbnail"
              width="100"
              height="100"
            />
          </div>
        )}
        {!isEditable ? (
          <Button onClick={handleUpdateClick} className="btn btn-warning">
            Bilgileri Güncelle
          </Button>
        ) : (
          <div>
          <button type="submit" className="btn btn-success mr-4">
            Kaydet
          </button>
          <Button onClick={handleUpdateClick} className="btn btn-danger">
            Geri
        </Button>
        </div>
        )}
      </form>
    </div>
  );
}
