import { useState } from 'react';
import { createItem } from '../../services';
import Alert from './alert';

const Form = ({ lista, setLista }) => {
  //State Iniciales del Formulario
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  //State para validacion de error
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Validacion del formulario
    if ([nombre, descripcion].includes('')) {
      setError(true);
      return;
    }
    setError(false);

    //Objeto con la nueva Tarea
    const nuevaTarea = {
      nombre,
      descripcion,
      estado: 'Pendiente',
    };

    //LLamado al endpoint a traves del metodo post para guardar el registro
    createItem(nuevaTarea)
      .then((res) => {
        if (res.status >= 200 || res.status < 300) {
          //Actualiza el state de lista con la nueva informmacion si es correcta la respuesta
          setLista([...lista, res.data]);
          setSucces(true);
        }
      })
      .catch((err) => {
        //Mostrar en consola si existe un error
        console.log('Error', err.message);
      });

    //LimpiarFormulario
    setNombre('');
    setDescripcion('');
  };

  return (
    //JSX para el cuerpo del Formulario
    <div className='h-full w-full flex items-center flex-col'>
      <h2 className='font-black text-2xl text-center'>Crear Tarea</h2>
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

        <input
          type='submit'
          className='bg-blue-600 w-full p-3 text-white uppercase font-bold hover:bg-blue-700
         cursor-pointer transition-colors'
          value='Agregar'
        />
      </form>
      {succes && <Alert mensaje='Tarea agregada con éxito!' setSucces={setSucces} />}
    </div>
  );
};

export default Form;
