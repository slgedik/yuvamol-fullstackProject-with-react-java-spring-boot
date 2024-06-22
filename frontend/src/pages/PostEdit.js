import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { Button, Dropdown, FormField, Form, Input, TextArea, Image, Icon } from 'semantic-ui-react';
import axios from 'axios';
import SpeciesService from '../services/service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PostEdit() {
  const { animalId } = useParams(); 
  const [animal, setAnimal] = useState(null);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
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

  const genderOptions = [
    { key: 'female', text: 'Dişi', value: 'Dişi' },
    { key: 'male', text: 'Erkek', value: 'Erkek' },
  ];

  useEffect(() => {
    let speciesService = new SpeciesService();
    speciesService.getSpecies()
      .then(result => {
        const options = result.data.map(species => ({
          key: species.speciesId,
          text: species.speciesName,
          value: species.speciesId,
        }));
        setSpeciesOptions(options);
      })
      .catch(error => {
        console.error("Error fetching species:", error);
        setSpeciesOptions([]); // Set to empty array in case of error
      });
  }, []);

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    if (animal) {
      reset(animal); // Formu yeni değerlerle güncelle
    }
  }, [animal, reset]);

  const onSubmit = async (data) => {
    try {
      console.log("data", data);
      data.age = parseInt(data.age);
      data.ownerId = parseInt(data.ownerId);
      console.log("Form data", data);

      await axios.put(`http://localhost:8080/api/animals/${animalId}`, data, {
        withCredentials: true // Kimlik doğrulama bilgilerini gönder
      });

      if (selectedFiles.length > 0) {
        await Promise.all(
          selectedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append('animalId', animalId);
            formData.append('photo', file);

            try {
              const photoResponse = await axios.post('http://localhost:8080/api/animal-photos/add', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                withCredentials: true // Kimlik doğrulama bilgilerini gönder
              });
              console.log('Photo uploaded:', photoResponse.data);
            } catch (error) {
              console.error('Error uploading photo:', error);
            }
          })
        );
      }

      toast.success("Güncelleme tamamlandı");
      setSuccess(true);
      setTimeout(() => {
        navigate(`/posts/${animal.ownerId}`);
      }, 1000); 
    } catch (error) {
      console.error('Error updating animal:', error);
      toast.error("Güncelleme işlemi başarısız oldu.");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  const handlePhotoDelete = async (photoId) => {
    try {
      await axios.delete(`http://localhost:8080/api/animal-photos/${photoId}`, {
        withCredentials: true // Kimlik doğrulama bilgilerini gönder
      });
      setAnimal((prevAnimal) => ({
        ...prevAnimal,
        photos: prevAnimal.photos.filter((photo) => photo.photoId !== photoId)
      }));
      toast.success("Fotoğraf silindi");
    } catch (error) {
      console.error('Error deleting photo:', error);
      toast.error("Fotoğraf silme işlemi başarısız oldu.");
    }
  };

  if (!animal) {
    return <div>Loading...</div>; // Veri yüklenirken bir yükleme mesajı göster
  }

  return (
    <div className=''>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <label>İsim</label>
          <Controller
            name="animalName"
            control={control}
            render={({ field }) => <Input {...field} placeholder="İsim" />}
          />
          {errors.animalName && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Türü</label>
          <Controller
            name="speciesId"
            control={control}
            render={({ field }) => (
              <Dropdown
                fluid
                selection
                options={speciesOptions}
                {...field}
                onChange={(e, { value }) => field.onChange(value)}
                placeholder="Tür seçiniz"
              />
            )}
          />
          {errors.speciesId && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Cins</label>
          <Controller
            name="breed"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Cins" />}
          />
          {errors.breed && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Yaş</label>
          <Controller
            name="age"
            control={control}
            render={({ field }) => <Input type="number" {...field} placeholder="" />}
          />
          {errors.age && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Cinsiyet</label>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Dropdown
                fluid
                selection
                options={genderOptions}
                {...field}
                onChange={(e, { value }) => field.onChange(value)}
                placeholder="Cinsiyet seçiniz"
              />
            )}
          />
          {errors.gender && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Sağlık durumu</label>
          <Controller
            name="healthStatus"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Sağlık durumu" />}
          />
          {errors.healthStatus && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Açıklama</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextArea {...field} placeholder="Açıklama" />}
          />
          {errors.description && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Konum</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Konum " />}
          />
          {errors.location && <span>Bu alan zorunludur</span>}
        </FormField>

        <FormField>
          <label>Fotoğraf</label>
          <input type="file" multiple onChange={handleFileChange} />
        </FormField>
        {success? ( <Button onClick = {()=> {navigate(`/posts/${animal.ownerId}`)}} className='mb-4'>Geri dön</Button>) : (  <Button type='submit'>Güncelle</Button>)}
   
        <ToastContainer />
      </Form>
      {!success && (<div className="mt-4">
        <h3>Yüklenen Fotoğraflar</h3>
        <div className="photo-gallery grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {animal.photos && animal.photos.map(photo => (
            <div key={photo.photoId} className="photo-item relative">
              <img src={`data:image/jpeg;base64,${photo.photo}`} className="w-full h-auto rounded" alt="Animal" />
              <button 
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                onClick={() => handlePhotoDelete(photo.photoId)}
              >
                <Icon name="trash" />
              </button>
            </div>
          ))}
        </div>
      </div>)}
      
    </div>
  )
}
