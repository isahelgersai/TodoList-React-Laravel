import React, { useState, useMemo } from 'react';
import { deleteItemList, findItem } from '../../services';

function List({ editTask, lista, setLista }) {
  const [buscador, setBuscador] = useState('');
  const [found, setFound] = useState(null);
  const [error, setError] = useState(null);

  const deleteItem = (id) => {
    deleteItemList(id)
      .then((res) => {
        if (res.status >= 200 || res.status < 300) {
          //Renderizar nuevamente el componente con la nueva informacion si es correcta la respuesta
          setLista(lista.filter((item) => item.id !== res.data));
          setFound(null);
        }
      })
      .catch((err) => {
        //Mostrar en consola si existe un error
        console.log('Error', err.message);
      });
  };

  //Filtrar item desde endpoint
  const buscarItem = (id) => {
    findItem(id).then((res) => {
      if (res.data.id) {
        setFound(res.data.id);
        setBuscador('');
      } else {
        setError('Resultado no encontrado');
        setBuscador('');
      }
    });
  };

  //Hook useMemo para mantener ultimo valor luego de editarlo
  const searchTask = useMemo(() => {
    if (lista.length === 0 || found === null) {
      return null;
    }

    return lista.find((task) => task.id === found);
  }, [lista, found]);

  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='py-4 inline-block min-w-full sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-center'>
              <thead className='border-b bg-sky-600'>
                <tr>
                  <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                    ID
                  </th>
                  <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                    Nombre
                  </th>
                  <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                    Descripción
                  </th>
                  <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                    Estado
                  </th>
                  <th scope='col' className='text-sm font-medium text-white px-6 py-4'>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  //Conditional rendering para cargar solo el item buscado en la lista
                  searchTask !== null ? (
                    <tr
                      key={searchTask.id}
                      className={
                        searchTask.estado === 'Pendiente' ? 'border-b-2 border-red-500' : 'border-b-2 border-green-500'
                      }
                    >
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{searchTask.id}</td>
                      <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                        {searchTask.nombre}
                      </td>
                      <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                        {searchTask.descripcion}
                      </td>
                      <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                        {searchTask.estado}
                      </td>
                      <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                        <button
                          onClick={() => editTask(searchTask)}
                          className=' inline-block px-4 py-1.5 mx-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => deleteItem(searchTask.id)}
                          className='inline-block px-3 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
                        >
                          Eliminar
                        </button>
                        <button
                          onClick={() => setFound(null)}
                          className='inline-block ml-2 px-3 py-1.5 bg-gray-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out'
                        >
                          Volver
                        </button>
                      </td>
                    </tr>
                  ) : (
                    lista.map((item) => (
                      <tr
                        key={item.id}
                        className={
                          item.estado === 'Pendiente' ? 'border-b-2 border-red-500' : 'border-b-2 border-green-500'
                        }
                      >
                        <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{item.id}</td>
                        <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>{item.nombre}</td>
                        <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                          {item.descripcion}
                        </td>
                        <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>{item.estado}</td>
                        <td className='text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap'>
                          <button
                            onClick={() => editTask(item)}
                            className=' inline-block px-4 py-1.5 mx-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => deleteItem(item.id)}
                            className='inline-block px-3 py-1.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out'
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className='mb-5'>
        <label htmlFor='buscar' className='block text-grey-700 font-bold'>
          Buscar tarea por ID:
        </label>

        <input
          type='text'
          id='buscar'
          placeholder='ID de la tarea'
          className='border-2 wx-20 p-2 mt-2 placeholder-gray-400 rounded-md'
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
        <button
          disabled={buscador === ''}
          onClick={() => buscarItem(buscador)}
          className='inline-block p-3 mx-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out'
        >
          Buscar
        </button>
      </div>
      {error && (
        <div className='text-white p-3 bg-red-500 rounded-md w-1/4 flex justify-between'>
          {error}
          <span className='cursor-pointer text-bold' onClick={() => setError(null)}>
            X
          </span>
        </div>
      )}
    </div>
  );
}

export default List;
