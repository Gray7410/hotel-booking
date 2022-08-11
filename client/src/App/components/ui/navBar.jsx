import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";
import ThemeSwitch from "./themeSwitch";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar bg-secondary mb-3">
      <div className="container">
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
        </ul>
        <ThemeSwitch />
        <div className="d-flex">
          {!isLoggedIn ? (
            <Link className="nav-link text-light" to="/auth">
              Авторизация
            </Link>
          ) : (
            <NavProfile />
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
