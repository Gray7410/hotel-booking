const express = require("express");
const auth = require("../middleware/auth.middleware");
const Room = require("../models/Room");
const router = express.Router({ mergeParams: true });
const hasRole = require("../middleware/admin.middleware");
const file = require("../middleware/file.middleware");
const User = require("../models/User");
const config = require("config");

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

router.post("/add", auth, hasRole(["admin", "owner"]), async (req, res) => {
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

router.put(
  "/:roomId/edit",
  auth,
  hasRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const { roomId } = req.params;
      const room = await Room.findById(roomId);
      const user = await User.findById(req.user._id);
      if (room.createdBy.toString() === req.user._id || user.role === "admin") {
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
  }
);

router.patch("/:roomId/available", auth, async (req, res) => {
  try {
    const { roomId } = req.params;
    await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    res.status(200).json(`Изменилось бронирование номера ${roomId}`);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка. Попробуйте позже",
    });
  }
});

router.delete(
  "/:roomId",
  auth,
  hasRole(["admin", "owner"]),
  async (req, res) => {
    try {
      const { roomId } = req.params;
      const removedRoom = await Room.findById(roomId);
      const user = await User.findById(req.user._id);
      if (
        removedRoom.createdBy.toString() === req.user._id ||
        user.role === "admin"
      ) {
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
  }
);

router.post(
  "/uploadImage",
  auth,
  hasRole(["admin", "owner"]),
  file.single("roomImage"),
  async (req, res) => {
    try {
      const imagePath = `${config.get("url")}/images/${req.file.filename}`;
      res.send(imagePath);
    } catch (error) {
      res.status(500).json({
        message: "Ошибка загрузки файлов",
      });
    }
  }
);

module.exports = router;
