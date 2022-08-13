import React from "react";
import {
  getRoomById,
  getRoomAvailableStatus,
  deleteRoom,
} from "../../../store/rooms";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AvailableButton from "../../ui/availableButton";
import {
  getIsLoggedIn,
  getCurrentUserId,
  getCurrentUserData,
} from "../../../store/users";

const RoomPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { roomId } = params;
  const room = useSelector(getRoomById(roomId));
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getCurrentUserId());
  const status = useSelector(getRoomAvailableStatus(roomId));
  const user = useSelector(getCurrentUserData());

  return (
    <div className="container">
      <h1>{room.name}</h1>
      <img
        src={room.img}
        className="img-fluid rounded mb-3"
        alt={room.name}
        width="500"
      />
      {isLoggedIn ? (
        <>
          <div className="mb-3 d-flex flex-row">
            <AvailableButton />
            {(currentUser === room.createdBy || user.role === "admin") && (
              <>
                <Link to={`${roomId}/edit`}>
                  <button className="btn btn-outline-success m-2">
                    Редактировать
                  </button>
                </Link>
                <button
                  className="btn btn-outline-danger m-2"
                  onClick={() => dispatch(deleteRoom(roomId))}
                >
                  Удалить
                </button>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="alert alert-warning" role="alert">
          Для бронирования номера необходима авторизация.
        </div>
      )}
      {(status !== "null") & (status !== currentUser) ? (
        <div className="alert alert-danger" role="alert">
          Номер не доступен для бронирования
        </div>
      ) : null}

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
