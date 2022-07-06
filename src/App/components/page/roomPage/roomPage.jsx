import React from "react";

const RoomPage = ({ room }) => {
  console.log(room);
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src="..." className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Номер "{room.name}"</h5>
              <p className="card-text">{room.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomPage;
