import React, { useState } from "react";
import TextField from "../../common/form/textField";
import TextAreaField from "../../common/form/textAreaField";
import { useDispatch, useSelector } from "react-redux";
import { getRoomById, updateRoom } from "../../../store/rooms";
import { useParams } from "react-router-dom";
import roomService from "../../../services/room.service";
import FileField from "../../common/form/fileField";

const EditRoomPage = () => {
  const params = useParams();
  const { roomId } = params;
  const room = useSelector(getRoomById(roomId));
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: room.name,
    places: room.places,
    qualities: room.qualities,
    description: room.description,
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("roomImage", data.img);
    try {
      const { content } = await roomService.uploadImage(form);
      dispatch(updateRoom({ ...room, ...data, img: content }));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="container mt-5 col-4">
        <h3>Редактирование номера</h3>
        <div className="card p-3 mt-4 mb-5">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Название"
              name="name"
              value={data.name}
              onChange={handleChange}
            />
            <TextField
              label="Количество мест"
              type="number"
              name="places"
              value={data.places}
              onChange={handleChange}
            />
            <FileField name="img" onChange={handleChange} />
            <TextAreaField
              label="Описание"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <button className="btn btn-success mt-2">Сохранить</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditRoomPage;
