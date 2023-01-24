import List from './components/List';
import Form from './components/Form';
import Layout from './components/Layout';
import React, { useEffect, useState } from 'react';
import { getToDoList } from './services';
import Modal from './components/Modals';

const App = () => {
  //useState para manejar los datos de la lista en diferentes componentes
  const [lista, setLista] = useState([]);

  //useState para manejar el estado del boton Editar en diferentes componentes
  const [editTask, setEditTask] = useState({});

  //useState para manejar el comportamiento del Modal en diferentes componentes
  const [modalIsOpen, setIsOpen] = React.useState(false);

  //Funciones para manejar comportamiento del Modal
  function openModal(item) {
    setEditTask(item);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  //useEffect para cargar los datos en la renderizacion
  useEffect(() => {
    getToDoList()
      .then((data) => setLista(data))
      .catch((err) => console.log('Error', err.message));
  }, []);

  return (
    <Layout>
      <Form lista={lista} setLista={setLista} />
      <List editTask={openModal} lista={lista} setLista={setLista} />
      <Modal lista={lista} setLista={setLista} item={editTask} modalIsOpen={modalIsOpen} onClose={closeModal} />
    </Layout>
  );
};

export default App;
