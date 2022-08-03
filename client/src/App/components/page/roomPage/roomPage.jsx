import React from "react";
import { getRoomById } from "../../../store/rooms";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AvailableButton from "../../ui/availableButton";

const RoomPage = () => {
  const params = useParams();
  const { roomId } = params;
  const room = useSelector(getRoomById(roomId));
  return (
    <div className="container">
      <h1>Страница номера {room.name}</h1>
      <img
        src="http://almode.ru/uploads/posts/2021-07/1625115962_20-almode_ru-p-spalnya-v-otele-21.jpg"
        className="img-fluid rounded mb-3"
        alt={room.name}
        width="500"
      />

      <AvailableButton />
      <Link to={`${roomId}/edit`}>
        <button className="btn btn-outline-success m-2">Редактировать</button>
      </Link>
      <button className="btn btn-outline-danger m-2">Удалить</button>
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
