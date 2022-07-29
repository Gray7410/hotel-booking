import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Auth = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const registerFormType = () => {
    setFormType("register");
  };
  const loginFormType = () => {
    setFormType("login");
  };
  return (
    <>
      <div className="container mt-5 col-4">
        <div className="card p-3 mt-4 mb-5">
          <div
            className="btn-group mb-5"
            role="group"
            aria-label="Auth toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="loginToggleButton"
              autoComplete="off"
              onClick={loginFormType}
              defaultChecked
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor="loginToggleButton"
            >
              Авторизация
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="registerToggleButton"
              autoComplete="off"
              onClick={registerFormType}
            />
            <label
              className="btn btn-outline-secondary"
              htmlFor="registerToggleButton"
            >
              Регистрация
            </label>
          </div>
          {formType === "register" ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </>
  );
};

export default Auth;
