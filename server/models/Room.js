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
    image: {
      type: String,
      required: true,
    },
    qualities: [{ type: Schema.Types.ObjectId, ref: "Quality" }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Room", schema);
