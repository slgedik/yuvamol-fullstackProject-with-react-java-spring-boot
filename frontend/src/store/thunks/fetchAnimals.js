
import axios from 'axios';
import { setAnimals } from '../actions/animalPostAction';

export const fetchAnimals = () => async dispatch => {
  try {
    const response = await axios.get('http://localhost:8080/api/animals/all');
    dispatch(setAnimals(response.data));
  } catch (error) {
    console.error('Error fetching animals:', error);
  }
};
