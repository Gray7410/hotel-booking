const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
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
      type: Object,
    },
    role: {
      type: String,
      enum: ["guest", "owner", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("User", schema);
