const express = require("express");
const auth = require("../middleware/auth.middleware");
const Room = require("../models/Room");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  try {
    const list = await Room.find();
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});
router.get("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;

    const item = await Room.findById(roomId);

    res.send(item);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.post("/add", auth, async (req, res) => {
  try {
    const newRoom = await Room.create({
      ...req.body,
      available: "null",
      createdBy: req.user._id,
    });

    res.status(201).send(newRoom);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.put("/:roomId/edit", auth, async (req, res) => {
  try {
    const { roomId } = req.params;

    const item = await Room.findById(roomId);

    if (item.createdBy.toString() === req.user._id) {
      const updatedRoom = await Room.findByIdAndUpdate(roomId, req.body, {
        new: true,
      });
      res.send(updatedRoom);
    } else {
      res.status(401).json({ message: "Ошибка авторизации" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.patch("/:roomId/available", auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    console.log("available", req.body);
    console.log("roomId", roomId);
    await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    res.status(200).json(`Изменилось бронирование номера ${roomId}`);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.mergeParams;
    const removedRoom = await Room.findById({ roomId });

    if (removedRoom.createdBy.toString() === req.user._id) {
      await removedRoom.remove();
      return res.send(null);
    } else {
      res.status(401).json({ message: "Ошибка авторизации" });
    }
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

module.exports = router;
