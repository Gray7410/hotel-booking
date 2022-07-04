import React from "react";
import { useSelector } from "react-redux";
import { getRoomsList } from "../../../store/rooms";
import RoomPage from "../roomPage/roomPage";

const RoomsListPage = () => {
  const rooms = useSelector(getRoomsList());
  console.log("RoomsListPage", rooms);
  return (
    <>
      <div className="container">
        <div className="card p-3 mt-5">
          <h3>Список доступных номеров</h3>
          {rooms.map((room) => {
            return <RoomPage room={room} key={room._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default RoomsListPage;
