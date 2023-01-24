import { useState, useEffect, React } from 'react';
import Modal from 'react-modal';
import { editItem } from '../../services';
import Alert from '../Form/alert';

function EditModal({ lista, setLista, item, modalIsOpen, onClose }) {
  //Estilos para el Modal
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '30%',
      transform: 'translate(-50%, -50%)',
    },
  };

  //Especifica en que elemento del DOM se va a cargar el Modal
  Modal.setAppElement('#root');

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [estado, setEstado] = useState('');
  const [id, setId] = useState('');
  //State para validacion de error
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      setNombre(item.nombre);
      setDescripcion(item.descripcion);
      setEstado(item.estado);
      setId(item.id);
      setError(false);
      setSucces(false);
    }
  }, [modalIsOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del formulario que ningun campo este vacio
    if ([nombre, descripcion].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    //Objeto con la nueva Tarea
    const tareaEditada = {
      id,
      nombre,
      descripcion,
      estado,
    };

    //LLamado al endpoint a traves del metodo post para guardar el registro
    editItem(tareaEditada)
      .then((res) => {
        if (res.status >= 200 || res.status < 300) {
          //Actualiza el state de lista con la nueva informmacion si es correcta la respuesta
          const newList = lista.map((item) => (item.id === res.data.id ? { ...res.data } : item));
          setLista(newList);
          setSucces(true);
        }
      })
      .catch((err) => {
        //Mostrar en consola si existe un error
        console.log('Error', err.message);
      });

    //CerrarFormulario
    onClose();
  };

  return (
    <div className='bg-white'>
      <Modal isOpen={modalIsOpen} onRequestClose={onClose} style={customStyles} contentLabel='Example Modal'>
        <h2 className='font-black text-2xl text-center'>Editar Tarea</h2>
        <form onSubmit={handleSubmit} className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
          {error && <Alert mensaje='Todos los campos son obligatorios' setError={setError} />}
          <div className='mb-5'>
            <label htmlFor='nombre' className='block text-grey-700 font-bold'>
              Nombre:
            </label>

            <input
              type='text'
              id='nombre'
              placeholder='Nombre de la Tarea'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='sintomas' className='block text-grey-700 font-bold'>
              Descripción:
            </label>

            <textarea
              id='descripcion'
              className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
              placeholder='Descripción de la Tarea'
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div className='mb-5'>
            <label htmlFor='estado' className='block text-grey-700 font-bold'>
              Estado:
            </label>
            <div className='mt-2 mx-2 inline-block text-center'>
              <input
                type='radio'
                id='pendiente'
                value='Pendiente'
                className='mr-2 cursor-pointer'
                checked={estado === 'Pendiente' ? true : false}
                onChange={(e) => setEstado(e.target.value)}
              />
              <label htmlFor='pendiente' className='cursor-pointer'>
                Pendiente
              </label>
            </div>
            <div className='mt-2 mx-2 inline-block'>
              <input
                type='radio'
                id='terminado'
                value='Terminada'
                className='mr-2 cursor-pointer'
                checked={estado !== 'Pendiente' ? true : false}
                onChange={(e) => setEstado(e.target.value)}
              />
              <label htmlFor='terminada' className='cursor-pointer'>
                Terminada
              </label>
            </div>
          </div>

          <input
            type='submit'
            className='bg-blue-600 block m-0 w-full p-3 text-white uppercase font-bold hover:bg-blue-700
         cursor-pointer transition-colors'
            value='Editar'
          />
        </form>

        <span className=' text-xl text-bold absolute right-3.5 top-2.5 cursor-pointer' onClick={onClose}>
          X
        </span>
      </Modal>
      {succes && <Alert mensaje='Tarea editada con éxito!' setSucces={setSucces} />}
    </div>
  );
}

export default EditModal;
