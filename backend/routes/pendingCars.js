const express = require("express");
const PendingCar = require("../models/PendingCar");
const router = express.Router();

// İlan ekleme rotası
router.post("/", async (req, res) => {
  try {
    const newPendingCar = new PendingCar(req.body);
    const savedCar = await newPendingCar.save();
    res.status(201).json({
      message: "İlan başarıyla kaydedildi, admin onayı bekliyor.",
      data: savedCar,
    });
  } catch (error) {
    console.error("Hata Detayı:", error.message);
    res.status(500).json({ error: "Bir hata oluştu. İlan kaydedilemedi." });
  }
});

module.exports = router;
