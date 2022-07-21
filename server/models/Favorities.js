const { Schema, model } = require("mongoose");

const schema = new Schema({
  favorities: [{ type: Schema.Types.ObjectId, ref: "Room" }],
});

module.exports = model("Favorities", schema);
