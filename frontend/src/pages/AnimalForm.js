import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Dropdown, FormField, Form, Input, TextArea } from 'semantic-ui-react';
import axios from 'axios';
import SpeciesService from '../services/service';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import '../CSS/AnimalForm.css'; 
const provinces = [
  { key: 'adana', text: 'Adana', value: 'Adana' },
  { key: 'adiyaman', text: 'Adıyaman', value: 'Adıyaman' },
  { key: 'afyonkarahisar', text: 'Afyonkarahisar', value: 'Afyonkarahisar' },
  { key: 'ağrı', text: 'Ağrı', value: 'Ağrı' },
  { key: 'amasya', text: 'Amasya', value: 'Amasya' },
  { key: 'ankara', text: 'Ankara', value: 'Ankara' },
  { key: 'antalya', text: 'Antalya', value: 'Antalya' },
  { key: 'artvin', text: 'Artvin', value: 'Artvin' },
  { key: 'aydın', text: 'Aydın', value: 'Aydın' },
  { key: 'balıkesir', text: 'Balıkesir', value: 'Balıkesir' },
  { key: 'bilecik', text: 'Bilecik', value: 'Bilecik' },
  { key: 'bingöl', text: 'Bingöl', value: 'Bingöl' },
  { key: 'bitlis', text: 'Bitlis', value: 'Bitlis' },
  { key: 'bolu', text: 'Bolu', value: 'Bolu' },
  { key: 'burdur', text: 'Burdur', value: 'Burdur' },
  { key: 'bursa', text: 'Bursa', value: 'Bursa' },
  { key: 'çanakkale', text: 'Çanakkale', value: 'Çanakkale' },
  { key: 'çankırı', text: 'Çankırı', value: 'Çankırı' },
  { key: 'çorum', text: 'Çorum', value: 'Çorum' },
  { key: 'denizli', text: 'Denizli', value: 'Denizli' },
  { key: 'diyarbakır', text: 'Diyarbakır', value: 'Diyarbakır' },
  { key: 'edirne', text: 'Edirne', value: 'Edirne' },
  { key: 'elazığ', text: 'Elazığ', value: 'Elazığ' },
  { key: 'erzincan', text: 'Erzincan', value: 'Erzincan' },
  { key: 'erzurum', text: 'Erzurum', value: 'Erzurum' },
  { key: 'eskişehir', text: 'Eskişehir', value: 'Eskişehir' },
  { key: 'gaziantep', text: 'Gaziantep', value: 'Gaziantep' },
  { key: 'giresun', text: 'Giresun', value: 'Giresun' },
  { key: 'gümüşhane', text: 'Gümüşhane', value: 'Gümüşhane' },
  { key: 'hakkari', text: 'Hakkari', value: 'Hakkari' },
  { key: 'hatay', text: 'Hatay', value: 'Hatay' },
  { key: 'ığdır', text: 'Iğdır', value: 'Iğdır' },
  { key: 'ısparta', text: 'Isparta', value: 'Isparta' },
  { key: 'istanbul', text: 'İstanbul', value: 'İstanbul' },
  { key: 'izmir', text: 'İzmir', value: 'İzmir' },
  { key: 'kahramanmaraş', text: 'Kahramanmaraş', value: 'Kahramanmaraş' },
  { key: 'karabük', text: 'Karabük', value: 'Karabük' },
  { key: 'karaman', text: 'Karaman', value: 'Karaman' },
  { key: 'kars', text: 'Kars', value: 'Kars' },
  { key: 'kastamonu', text: 'Kastamonu', value: 'Kastamonu' },
  { key: 'kayseri', text: 'Kayseri', value: 'Kayseri' },
  { key: 'kırıkkale', text: 'Kırıkkale', value: 'Kırıkkale' },
  { key: 'kırklareli', text: 'Kırklareli', value: 'Kırklareli' },
  { key: 'kırşehir', text: 'Kırşehir', value: 'Kırşehir' },
  { key: 'kilis', text: 'Kilis', value: 'Kilis' },
  { key: 'kocaeli', text: 'Kocaeli', value: 'Kocaeli' },
  { key: 'konya', text: 'Konya', value: 'Konya' },
  { key: 'kütahya', text: 'Kütahya', value: 'Kütahya' },
  { key: 'malatya', text: 'Malatya', value: 'Malatya' },
  { key: 'manisa', text: 'Manisa', value: 'Manisa' },
  { key: 'mardin', text: 'Mardin', value: 'Mardin' },
  { key: 'mersin', text: 'Mersin', value: 'Mersin' },
  { key: 'muğla', text: 'Muğla', value: 'Muğla' },
  { key: 'muş', text: 'Muş', value: 'Muş' },
  { key: 'nevşehir', text: 'Nevşehir', value: 'Nevşehir' },
  { key: 'niğde', text: 'Niğde', value: 'Niğde' },
  { key: 'ordu', text: 'Ordu', value: 'Ordu' },
  { key: 'osmaniye', text: 'Osmaniye', value: 'Osmaniye' },
  { key: 'rize', text: 'Rize', value: 'Rize' },
  { key: 'sakarya', text: 'Sakarya', value: 'Sakarya' },
  { key: 'samsun', text: 'Samsun', value: 'Samsun' },
  { key: 'siirt', text: 'Siirt', value: 'Siirt' },
  { key: 'sinop', text: 'Sinop', value: 'Sinop' },
  { key: 'sivas', text: 'Sivas', value: 'Sivas' },
  { key: 'şanlıurfa', text: 'Şanlıurfa', value: 'Şanlıurfa' },
  { key: 'şırnak', text: 'Şırnak', value: 'Şırnak' },
  { key: 'tekirdağ', text: 'Tekirdağ', value: 'Tekirdağ' },
  { key: 'tokat', text: 'Tokat', value: 'Tokat' },
  { key: 'trabzon', text: 'Trabzon', value: 'Trabzon' },
  { key: 'tunceli', text: 'Tunceli', value: 'Tunceli' },
  { key: 'uşak', text: 'Uşak', value: 'Uşak' },
  { key: 'van', text: 'Van', value: 'Van' },
  { key: 'yalova', text: 'Yalova', value: 'Yalova' },
  { key: 'yozgat', text: 'Yozgat', value: 'Yozgat' },
  { key: 'zonguldak', text: 'Zonguldak', value: 'Zonguldak' },
];


const AnimalForm = () => {
  const { userId } = useParams(); 
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      animalName: '',
      speciesId: null,
      age: null,
      breed: '',
      gender: '',
      healthStatus: '',
      description: '',
      location: '',
      ownerId: userId
    }
  });
  const [success, setSuccess] = useState(false);
  const genderOptions = [
    { key: 'female', text: 'Dişi', value: 'dişi' },
    { key: 'male', text: 'Erkek', value: 'erkek' },
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

  const onSubmit = async (data) => {
    try {
      data.age = parseInt(data.age);
      data.ownerId = parseInt(data.ownerId);
      console.log("Form data", data);

      const animalResponse = await axios.post('http://localhost:8080/api/animals/add', data, {
        withCredentials: true // Kimlik doğrulama bilgilerini gönder
      });
      const animalId = animalResponse.data.animalId;

      if (selectedFiles.length > 0) {
        await Promise.all(
          selectedFiles.map(async (file) => {
            const formData = new FormData();
            console.log("animal id", animalId)
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
      setSuccess(true);
      toast.success("Kayıt başarılı!");
     
      setTimeout(() => {
        navigate(`/posts/${userId}`);
      }, 1000); 
    } catch (error) {
      console.error('Error adding animal:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFiles(Array.from(event.target.files));
  };

  return (
    <div className='animal-form-container'>
      <div className='form-content'>
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
            {errors.breed && <span>This field is required</span>}
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
            {errors.gender && <span>This field is required</span>}
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
              render={({ field }) => (
                <Dropdown
                  fluid
                  search
                  selection
                  options={provinces}
                  allowAdditions
                  {...field}
                  onChange={(e, { value }) => field.onChange(value)}
                  placeholder="Konum seçiniz"
                />
              )}
            />
            {errors.location && <span>Bu alan zorunludur</span>}
          </FormField>

          <FormField>
            <label>Fotoğraf</label>
            <input type="file" multiple onChange={handleFileChange} />
          </FormField>
          {success? ( <Button onClick = {()=> {navigate(`/posts/${userId}`)}} className='mb-4'>Geri dön</Button>) : ( <Button type='submit' className='mb-4'>Ekle</Button>)}
         
          <ToastContainer/>
        </Form>
      </div>
    </div>
  );
};

export default AnimalForm;