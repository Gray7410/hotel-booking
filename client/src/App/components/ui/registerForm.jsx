import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import RadioField from "../common/form/radioField";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";
import FileField from "../common/form/fileField";
import roomService from "../../services/room.service";
import { validator } from "../../utils/validator";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    img: null,
    role: "guest",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Обязательно для заполнения",
      },
      isEmail: {
        message: "Email введен некорректно",
      },
    },
    password: {
      isRequired: {
        message: "Пароль обязателен для заполнения",
      },
      isCapitalSymbol: {
        message: "Пароль должен содержать хотя бы одну заглавную букву",
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число",
      },
      min: {
        message: "Пароль должен состоять минимум из 8 символов",
        value: 8,
      },
    },
    name: {
      isRequired: {
        message: "Имя обязательно для заполнения",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;
    const form = new FormData();
    form.append("roomImage", data.img);
    if (data.img) {
      try {
        const { content } = await roomService.uploadImage(form);
        dispatch(signUp({ ...data, img: content }));
      } catch (error) {
        console.log(error.message);
      }
    } else {
      dispatch(signUp({ ...data }));
    }
  };
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      ></TextField>
      <TextField
        label="Почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      ></TextField>
      <TextField
        label="Пароль"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
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
