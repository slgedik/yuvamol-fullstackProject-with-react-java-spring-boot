import { ADD_ANIMAL, DELETE_ANIMAL, SET_ANIMALS } from "../actions/animalPostAction";
const initialState = {
    animals: [],
  };
  
  const animalPostReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_ANIMAL:
        return { ...state, animals: [...state.animals, action.payload] };
      case SET_ANIMALS:
        return { ...state, animals: action.payload };
      case DELETE_ANIMAL:
        return { ...state, animals: state.animals.filter(animal => animal.id !== action.payload) };
      default:
        return state;
    }
  };
  
  export default animalPostReducer;