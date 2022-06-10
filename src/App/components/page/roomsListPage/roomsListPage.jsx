import React from "react";
import { useRooms } from "../../../hooks/useRooms";
import RoomPage from "../roomPage/roomPage";

const RoomsListPage = () => {
  const { rooms } = useRooms();
  console.log("RoomsListPage", rooms);
  return (
    <>
      <div className="container">
        <div className="card p-3 mt-5">
          <h3>Список доступных номеров</h3>
          <RoomPage rooms={rooms} />
        </div>
      </div>
    </>
  );
};

export default RoomsListPage;
