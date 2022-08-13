import React, { useState } from "react";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import FileField from "../common/form/fileField";
import roomService from "../../services/room.service";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    role: "guest",
  });
  //   const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append("roomImage", data.img);
    try {
      const { content } = await roomService.uploadImage(form);
      dispatch(signUp({ ...data, img: content }));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
      <FileField name="img" onChange={handleChange} />
      <RadioField
        label="Тип аккаунта"
        name="role"
        value={data.role}
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
