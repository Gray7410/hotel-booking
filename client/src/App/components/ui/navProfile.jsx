import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
import Loader from "./loader";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUserData());
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!currentUser) return <Loader />;
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2 text-light">{currentUser.name}</div>
        <img
          src={
            currentUser.img
              ? currentUser.img
              : "https://e7.pngegg.com/pngimages/518/376/png-clipart-technological-university-thanlyin-information-email-telephone-number-sugarcrm-others-miscellaneous-rectangle.png"
          }
          alt=""
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/profile`} className="dropdown-item">
          Профиль
        </Link>
        {currentUser.role === "owner" ||
          (currentUser.role === "admin" && (
            <Link to={`/rooms/add`} className="dropdown-item">
              Добавить номер
            </Link>
          ))}
        {currentUser.role === "admin" && (
          <Link to={`/admin`} className="dropdown-item">
            Администратор
          </Link>
        )}

        <Link to="/logout" className="dropdown-item">
          Выход
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
