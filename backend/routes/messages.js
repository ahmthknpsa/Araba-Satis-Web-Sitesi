// routes/messages.js
const express = require("express");
const Message = require("../models/Message");
const authenticateUser = require("../middlewares/authenticateUser");
const mongoose = require("mongoose");
const User = require('../models/user'); // Modelin bulunduğu doğru yolu kontrol edin

const router = express.Router();

// Mesaj gönderme
router.post("/send", authenticateUser, async (req, res) => {
  const { receiver, content } = req.body;

  if (!receiver || !content) {
    return res
      .status(400)
      .json({ error: "Alıcı ve mesaj içeriği gereklidir." });
  }

  if (!mongoose.Types.ObjectId.isValid(receiver)) {
    return res.status(400).json({ error: "Geçersiz alıcı ID'si." });
  }

  const receiverExists = await User.findById(receiver);
  if (!receiverExists) {
    return res.status(404).json({ error: "Alıcı bulunamadı." });
  }

  try {
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      content,
    });

    await newMessage.save();
    res.status(201).json({ message: "Mesaj gönderildi.", data: newMessage });
  } catch (error) {
    console.error("Mesaj gönderme hatası:", error);
    res.status(500).json({ error: "Mesaj gönderilirken bir hata oluştu." });
  }
});

// Kullanıcının tüm mesajlarını getir
router.get("/", authenticateUser, async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    })
      .populate("sender", "username")
      .populate("receiver", "username")
      .sort({ createdAt: -1 });

    const validMessages = messages.filter(
      (message) => message.sender && message.receiver
    );

    res.json({ data: validMessages });
  } catch (error) {
    console.error("Mesajlar alınırken hata:", error.message);
    res.status(500).json({ error: "Mesajlar alınırken bir hata oluştu." });
  }
});


module.exports = router;
