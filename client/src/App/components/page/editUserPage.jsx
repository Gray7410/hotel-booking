import React, { useState } from "react";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUserData } from "../../store/users";

const EditUserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUserData());
  const [data, setData] = useState({
    email: user.email,
    password: "",
    name: user.name,
  });
  //   const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateUserData(data));
  };
  return (
    <div className="container mt-5 col-4">
      <h3>Редактирование профиля</h3>
      <div className="card p-3 mt-4 mb-5">
        <form onSubmit={handleSubmit}>
          <TextField
            label="Имя"
            name="name"
            value={data.name}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Почта"
            name="email"
            value={data.email}
            onChange={handleChange}
          ></TextField>
          <TextField
            label="Пароль"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          ></TextField>
          <div className="d-grid gap-2 col-6 mx-auto mt-5">
            <button className="btn btn-outline-success">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserPage;
