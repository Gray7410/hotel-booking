import React, { useState } from "react";
import TextField from "../common/form/textField";
import { login } from "../../store/users";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
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
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: data, redirect }));
    history.push("/");
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
        type="password"
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
