import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { useDispatch } from "react-redux";
import { createRoom } from "../../store/rooms";
import FileField from "../common/form/fileField";
import roomService from "../../services/room.service";
import { validator } from "../../utils/validator";

const CreateRoomForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    places: "",
    img: null,
    description: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: "Обязательно для заполнения",
      },
    },
    places: {
      isRequired: {
        message: "Обязательно для заполнения",
      },
    },
    img: {
      isImage: {
        message: "Необходимо загрузить изображение",
      },
    },
    description: {
      isRequired: {
        message: "Необходимо добавить описание",
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;
    const form = new FormData();
    form.append("roomImage", data.img);
    try {
      const { content } = await roomService.uploadImage(form);
      dispatch(createRoom({ ...data, img: content }));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <div className="container mt-5 col-4">
        <h3>Добавление номера</h3>
        <div className="card p-3 mt-4 mb-5">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Название"
              name="name"
              value={data.name}
              onChange={handleChange}
              error={errors.name}
            />
            <TextField
              label="Количество мест"
              type="number"
              name="places"
              value={data.places}
              onChange={handleChange}
              error={errors.places}
            />
            <FileField name="img" onChange={handleChange} error={errors.img} />
            {/* <MultiSelectField
              onChange={handleChange}
              defaultValue={data.qualities}
              name="qualities"
              label="Качества"
            /> */}
            <TextAreaField
              label="Описание"
              name="description"
              value={data.description}
              onChange={handleChange}
              error={errors.description}
            />
            <button className="btn btn-success mt-2">Добавить</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateRoomForm;
