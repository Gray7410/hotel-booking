import React from "react";
import { useSelector } from "react-redux";
import { getRoomsList } from "../store/rooms";

const Admin = () => {
  const rooms = useSelector(getRoomsList());
  return (
    <div className="container">
      <h1 className="mb-5">Страница администратора</h1>
      <ol className="list-group list-group-numbered">
        {rooms.map((r) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-start"
            key={r._id}
          >
            {/* <div className="ms-2 me-auto"> */}
            <div className="ms-2 me-auto fw-bold">{r.name}</div>
            {/* Content for list item
            </div> */}
            {r.available === "null" ? (
              <span className="badge bg-success rounded-pill">Свободен</span>
            ) : (
              <span className="badge bg-danger rounded-pill">Забронирован</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Admin;
