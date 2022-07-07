import React, { useState } from "react";
import TextField from "../common/form/textField";
import MultiSelectField from "../common/form/multiSelectField";
import TextAreaField from "../common/form/textAreaField";
import { useDispatch } from "react-redux";
import { createRoom } from "../../store/rooms";

const CreateRoomForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    places: "",
    qualities: [],
  });
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createRoom(data));
  };
  return (
    <>
      <div className="container mt-5">
        <h3>Добавление номера</h3>
        <div className="card p-3 mt-4 mb-5">
          <form onSubmit={handleSubmit}>
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
            <MultiSelectField
              onChange={handleChange}
              defaultValue={data.qualities}
              name="qualities"
              label="Качества"
            />
            <TextAreaField
              label="Описание"
              name="description"
              value={data.description}
              onChange={handleChange}
            />
            <button className="btn btn-success mt-2">Добавить</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoomForm;
