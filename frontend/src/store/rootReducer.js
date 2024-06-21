import { combineReducers } from 'redux';
import animalPostReducer from './reducers/animalPostReducer';
//import speciesReducer from './reducers/speciesReducer';

const rootReducer = combineReducers({
  animals: animalPostReducer,
  //species: speciesReducer,
});

export default rootReducer;