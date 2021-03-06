import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUserData());
  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!currentUser) return "Загрузка...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2 text-light">{currentUser.name}</div>
        <img
          src={
            currentUser.image
              ? currentUser.image
              : "https://e7.pngegg.com/pngimages/518/376/png-clipart-technological-university-thanlyin-information-email-telephone-number-sugarcrm-others-miscellaneous-rectangle.png"
          }
          alt=""
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Профиль
        </Link>
        <Link to={`/rooms/add`} className="dropdown-item">
          Добавить номер
        </Link>
        <Link to="/logout" className="dropdown-item">
          Выход
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
