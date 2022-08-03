import React from "react";
import {
  updateRoom,
  getRoomById,
  getRoomAvailableStatus,
} from "../../store/rooms";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const AvailableButton = () => {
  const params = useParams();
  const { roomId } = params;
  const room = useSelector(getRoomById(roomId));
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const status = useSelector(getRoomAvailableStatus(roomId));

  const handleClick = () => {
    if (status === "null") {
      const updatedRoom = {
        ...room,
        available: userId,
      };
      dispatch(updateRoom(updatedRoom));
    } else {
      const updatedRoom = {
        ...room,
        available: "null",
      };
      dispatch(updateRoom(updatedRoom));
    }
  };
  return (
    <>
      <button
        className="btn btn-outline-warning m-2"
        onClick={() => handleClick()}
      >
        {status === "null" ? "Забронировать" : "Снять бронь"}
      </button>
    </>
  );
};

export default AvailableButton;
