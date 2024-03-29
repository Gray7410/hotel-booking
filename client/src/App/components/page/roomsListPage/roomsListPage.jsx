import React from "react";
import RoomCard from "../../ui/roomCard";

const RoomsListPage = ({ rooms }) => {
  return (
    <>
      <div className="container">
        <div className="d-flex flex-wrap mb-5 justify-content-center">
          {rooms.map((room) => {
            return <RoomCard room={room} key={room._id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default RoomsListPage;
