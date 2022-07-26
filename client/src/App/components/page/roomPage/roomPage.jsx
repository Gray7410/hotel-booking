import React from "react";

const RoomPage = ({ room }) => {
  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="http://almode.ru/uploads/posts/2021-07/1625115962_20-almode_ru-p-spalnya-v-otele-21.jpg"
              className="img-fluid rounded-start"
              alt="Номер"
              width="300"
            />
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
