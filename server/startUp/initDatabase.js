const Quality = require("../models/Quality");
const qualitiesMock = require("../mock/qualities.json");
const Promo = require("../models/Promo");
const promoMock = require("../mock/promo.json");
const Room = require("../models/Room");
const roomMock = require("../mock/room.json");

module.exports = async () => {
  const quality = await Quality.find();
  if (quality.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock);
  }
  const promo = await Promo.find();
  if (promo.length !== promoMock.length) {
    await createInitialEntity(Promo, promoMock);
  }
  // const room = await Room.find();
  // if (room.length !== roomMock.length) {
  //   await createInitialEntity(Room, roomMock);
  // }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
