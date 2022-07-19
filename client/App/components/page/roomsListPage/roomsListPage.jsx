import React from "react";
import RoomPage from "../roomPage/roomPage";

const RoomsListPage = ({ rooms }) => {
  return (
    <>
      <div className="container">
        <h3 className="mt-5 mb-3">Список доступных номеров</h3>
        {/* <div className="card p-3 mt-4 mb-5"> */}
        {rooms.map((room) => {
          return <RoomPage room={room} />;
        })}
        {/* </div> */}
      </div>
    </>
  );
};

export default RoomsListPage;
