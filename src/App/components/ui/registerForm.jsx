import React, { useState } from "react";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "guest",
    licence: false,
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
    console.log("Отправлено: ", data);
    //dispatch
  };
  return (
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
      <RadioField
        label="Тип аккаунта"
        name="type"
        value={data.type}
        onChange={handleChange}
        options={[
          { name: "Гость", value: "guest" },
          { name: "Владелец отеля", value: "owner" },
        ]}
      ></RadioField>
      <div className="d-grid gap-2 col-6 mx-auto mt-5">
        <button className="btn btn-outline-success">Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default RegisterForm;
