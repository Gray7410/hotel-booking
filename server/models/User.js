const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: ["guest", "owner"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
