import React, { useState } from "react";
import TextField from "../common/form/textField";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Авторизация: ", data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Почта"
        name="email"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      <div className="d-grid gap-2 col-6 mx-auto mt-5">
        <button className="btn btn-outline-success">Войти</button>
      </div>
    </form>
  );
};

export default LoginForm;
