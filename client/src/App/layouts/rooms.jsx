import React, { useState } from "react";
import RoomsListPage from "../components/page/roomsListPage";
import { useSelector } from "react-redux";
import { getRoomById, getRoomsList } from "../store/rooms";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";
import RoomsLoader from "../components/ui/hoc/roomsLoader";
import RoomPage from "../components/page/roomPage/roomPage";
import { useParams } from "react-router-dom";
import EditRoomPage from "../components/page/editRoomPage/editRoomPage";
import { getCurrentUserData, getIsLoggedIn } from "../store/users";
import AccessDenied from "../components/ui/accessDenied";

const Rooms = () => {
  const params = useParams();
  const { roomId, edit } = params;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const rooms = useSelector(getRoomsList());
  const count = rooms.length;
  const roomsCrop = paginate(rooms, currentPage, pageSize);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const isLoggedIn = useSelector(getIsLoggedIn());
  const user = useSelector(getCurrentUserData());
  const room = useSelector(getRoomById(roomId));
  return (
    <RoomsLoader>
      {roomId ? (
        edit ? (
          isLoggedIn ? (
            user.role === "admin" || user._id === room.creatorBy ? (
              <EditRoomPage />
            ) : (
              <AccessDenied />
            )
          ) : (
            <AccessDenied />
          )
        ) : (
          <RoomPage room={roomId} />
        )
      ) : (
        <>
          <RoomsListPage rooms={roomsCrop} />
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </RoomsLoader>
  );
};

export default Rooms;
