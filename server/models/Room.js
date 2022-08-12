const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    places: {
      type: String,
      required: true,
    },
    available: {
      type: String,
      required: true,
    },
    img: {
      type: Object,
    },
    qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Room", schema);
