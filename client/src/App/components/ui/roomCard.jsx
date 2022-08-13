import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Link
      to={`/rooms/${room._id}`}
      className="text-decoration-none text-reset text-center"
    >
      <div className="card m-2" style={{ width: 415 }}>
        <img src={room.img} className="card-img-top" alt={room.name} />
        <div className="card-body">
          <h5 className="card-text fw-light">{room.name}</h5>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
