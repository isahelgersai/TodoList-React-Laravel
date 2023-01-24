import axios from 'axios';

//Variable con la ruta de la API
const API_ROUTE = 'http://localhost:8000/api';

//Endpoint para cargar la lista
export const getToDoList = async () => {
  const response = await axios.get(`${API_ROUTE}/todolist/`);
  const { data } = response;
  return data;
};

//Endpoint para crear nuevo item en la lista
export const createItem = async ({ nombre, descripcion, estado }) => {
  const response = await axios.post(`${API_ROUTE}/todoitem`, { nombre, descripcion, estado });
  return response;
};

//Endpoint para editar item en la lista
export const editItem = async ({ id, nombre, descripcion, estado }) => {
  const response = await axios.put(`${API_ROUTE}/todoitem/${id}`, { nombre, descripcion, estado });
  return response;
};

//Endpoint para buscar un item por ID en la lista
export const findItem = async (id) => {
  const response = await axios.get(`${API_ROUTE}/todoitem/${id}`);
  return response;
};

//Para borrar un item en la lista por ID
export const deleteItemList = async (id) => {
  const response = await axios.delete(`${API_ROUTE}/todoitem/${id}`);
  return response;
};
