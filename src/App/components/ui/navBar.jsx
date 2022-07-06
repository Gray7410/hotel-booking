import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar bg-secondary mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">
              Главная
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/rooms">
              Номера
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/rooms/add">
              Добавить номер
            </Link>
          </li>
        </ul>
        <div className="d-flex">Авторизация</div>
      </div>
    </nav>
  );
};

export default NavBar;
