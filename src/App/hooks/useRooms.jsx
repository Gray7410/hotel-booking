import React, { useContext } from "react";
import PropTypes from "prop-types";

const RoomContext = React.createContext();

export const useRoom = () => {
  return useContext(RoomContext);
};

const RoomProvider = ({ children }) => {
  return (
    <RoomContext.Provider value={{ rooms }}>{children}</RoomContext.Provider>
  );
};

RoomProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default RoomProvider;
