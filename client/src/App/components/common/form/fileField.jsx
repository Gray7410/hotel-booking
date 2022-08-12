import React from "react";

const FileField = ({ name, onChange }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange({ name: name, value: e.target.files[0] });
  };
  return (
    <input
      type="file"
      id={name}
      name={name}
      accept="image/*"
      onChange={handleChange}
    />
  );
};

export default FileField;
