import React from 'react';

//Componente layout para dar estilo a la pagina
const Layout = ({ children }) => {
  return (
    <>
      <h1 className='font-black text-5xl text-center md:w-2/3 mx-auto mt-10'>
        ToDo<span className=' text-sky-600'>List</span>
      </h1>
      <div className='w-full min-h-screen px-40 py-20'>{children}</div>
    </>
  );
};

export default Layout;
