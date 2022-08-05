import React from "react";
import { updateAvailable, getRoomAvailableStatus } from "../../store/rooms";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserId } from "../../store/users";

const AvailableButton = () => {
  const params = useParams();
  const { roomId } = params;
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const status = useSelector(getRoomAvailableStatus(roomId));

  const handleClick = () => {
    if (status === "null") {
      const updatedAvailable = {
        _id: roomId,
        available: userId,
      };
      dispatch(updateAvailable(updatedAvailable));
    } else if (status === userId) {
      const updatedAvailable = {
        _id: roomId,
        available: "null",
      };
      dispatch(updateAvailable(updatedAvailable));
    }
  };
  return (
    <>
      {(status === userId || status === "null") && (
        <button
          className="btn btn-outline-warning m-2"
          onClick={() => handleClick()}
        >
          {status === "null" ? "Забронировать" : "Снять бронь"}
        </button>
      )}
    </>
  );
};

export default AvailableButton;
