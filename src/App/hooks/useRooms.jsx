import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import roomService from "../services/room.service";

const RoomContext = React.createContext();

export const useRooms = () => {
  return useContext(RoomContext);
};

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getRooms();
  }, []);
  async function createRoom(data) {
    try {
      console.log("createRoom", data);
      roomService.create(data);
    } catch (error) {
      errorCatcher(error);
    }
  }
  async function getRooms() {
    try {
      const { content } = await roomService.get();
      setRooms(content);
      setLoading(false);
    } catch (error) {
      errorCatcher(error);
    }
  }
  function errorCatcher(error) {
    const { message } = error.responce.data;
    setError(message);
  }
  console.log(error);
  return (
    <RoomContext.Provider value={{ createRoom, rooms }}>
      {!isLoading ? children : "Загрузка..."}
    </RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RoomProvider;
