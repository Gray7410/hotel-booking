import React from "react";

const FileField = ({ name, onChange, error, required }) => {
  const handleChange = (e) => {
    e.preventDefault();
    onChange({ name: name, value: e.target.files[0] });
  };
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  return (
    <div className="mb-3">
      <input
        className={getInputClasses()}
        type="file"
        id={name}
        name={name}
        accept="image/*"
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FileField;
