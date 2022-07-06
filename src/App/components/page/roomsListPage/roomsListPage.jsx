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
        <h3 className="mt-5">Список доступных номеров</h3>
        <div className="card p-3 mt-4 mb-5">
          {rooms.map((room) => {
            return <RoomPage room={room} key={room._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default RoomsListPage;
