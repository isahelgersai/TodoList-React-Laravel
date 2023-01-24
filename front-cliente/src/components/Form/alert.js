const Alert = ({ mensaje, setError, setSucces }) => {
  return (
    <>
      {setError ? (
        <div className='text-white p-3 bg-red-500 rounded-md mb-2'>
          {mensaje}
          <span className='cursor-pointer text-bold ml-2' onClick={() => setError(null)}>
            X
          </span>
        </div>
      ) : (
        <div role='alert' className='text-white p-3 bg-green-500 rounded-md mb-2 right-3.5 fixed bottom-0'>
          {mensaje}
          <span className='cursor-pointer text-bold ml-2' onClick={() => setSucces(null)}>
            X
          </span>
        </div>
      )}
    </>
  );
};

export default Alert;
