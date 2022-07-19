import React, { useState } from "react";
import RoomsListPage from "../components/page/roomsListPage";
import { useSelector } from "react-redux";
import { getRoomsList } from "../store/rooms";
import { paginate } from "../utils/paginate";
import Pagination from "../components/common/pagination";

const Rooms = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const rooms = useSelector(getRoomsList());
  const count = rooms.length;
  const roomsCrop = paginate(rooms, currentPage, pageSize);
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  return (
    <>
      <RoomsListPage rooms={roomsCrop} />
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Rooms;
