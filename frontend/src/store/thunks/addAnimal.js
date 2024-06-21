import axios from 'axios';
import { setAnimals, ADD_ANIMAL } from '../actions/animalPostAction';

export const addAnimal = (animalData) => async dispatch => {
  try {
    const response = await axios.post('http://localhost:8080/api/animals/add', animalData);
    const newAnimal = response.data;
    dispatch({
      type: ADD_ANIMAL,
      payload: newAnimal,
    });
    // İsteğe bağlı olarak: dispatch(fetchAnimals()); // Yeni hayvan eklendikten sonra hayvan listesini güncellemek için
  } catch (error) {
    console.error('Error adding animal:', error);
    // Hata durumunu yönetmek için istenilen şekilde dispatch veya diğer işlemler yapılabilir
  }
};

