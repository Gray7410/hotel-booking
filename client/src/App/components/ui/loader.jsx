const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="spinner-border text-secondary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};

export default Loader;
