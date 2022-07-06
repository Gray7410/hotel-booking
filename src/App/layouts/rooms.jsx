import React from "react";
import RoomsListPage from "../components/page/roomsListPage";
import CreateRoomForm from "../components/ui/createRoomForm";

const Rooms = () => {
  return (
    <>
      <h1>Список номеров</h1>
      <RoomsListPage />
      <CreateRoomForm />
    </>
  );
};

export default Rooms;
