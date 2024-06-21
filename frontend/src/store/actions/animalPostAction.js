
export const ADD_ANIMAL = 'ADD_ANIMAL';
export const SET_ANIMALS = 'SET_ANIMALS';
export const DELETE_ANIMAL = 'DELETE_ANIMAL';

export const addAnimal = (animal) => ({
  type: ADD_ANIMAL,
  payload: animal,
});

export const setAnimals = (animals) => ({
  type: SET_ANIMALS,
  payload: animals,
});

export const deleteAnimal = (id) => ({
  type: DELETE_ANIMAL,
  payload: id,
});
