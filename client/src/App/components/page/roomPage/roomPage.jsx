import React from "react";
import { getRoomById, getRoomAvailableStatus } from "../../../store/rooms";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AvailableButton from "../../ui/availableButton";
import { getIsLoggedIn, getCurrentUserId } from "../../../store/users";

const RoomPage = () => {
  const params = useParams();
  const { roomId } = params;
  const room = useSelector(getRoomById(roomId));
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getCurrentUserId());
  const status = useSelector(getRoomAvailableStatus(roomId));
  return (
    <div className="container">
      <h1>{room.name}</h1>
      <img
        src="http://almode.ru/uploads/posts/2021-07/1625115962_20-almode_ru-p-spalnya-v-otele-21.jpg"
        className="img-fluid rounded mb-3"
        alt={room.name}
        width="500"
      />
      {isLoggedIn ? (
        <>
          <div className="mb-3 d-flex flex-row">
            <AvailableButton />
            {currentUser === room.createdBy && (
              <>
                <Link to={`${roomId}/edit`}>
                  <button className="btn btn-outline-success m-2">
                    Редактировать
                  </button>
                </Link>
                <button className="btn btn-outline-danger m-2">Удалить</button>
              </>
            )}
          </div>
        </>
      ) : status !== "null" && status !== currentUser ? (
        <div className="alert alert-danger" role="alert">
          Номер не доступен для бронирования
        </div>
      ) : (
        <div className="alert alert-warning" role="alert">
          Для бронирования номера необходима авторизация.
        </div>
      )}

      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-8">
            <div className="card-body">
              <p className="card-text">{room.description}</p>
              <p className="card-text">
                <b>Количество мест:</b> {room.places}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
