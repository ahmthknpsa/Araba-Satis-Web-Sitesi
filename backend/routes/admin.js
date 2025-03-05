const express = require("express");
const authenticateAdmin = require("../middlewares/authenticateAdmin");
const PendingCar = require("../models/PendingCar");
const Car = require("../models/Car");
const router = express.Router();

// Tüm bekleyen ilanları listele
// Bekleyen ilanları listele
router.get("/pending", authenticateAdmin, async (req, res) => {
  try {
    const pendingCars = await PendingCar.find();
    res.json({ total: pendingCars.length, data: pendingCars });
  } catch (error) {
    res.status(500).json({ error: "Bekleyen ilanlar alınırken bir hata oluştu." });
  }
});

// İlanı onayla
// İlanı onayla
router.post("/approve/:id", authenticateAdmin, async (req, res) => {
  try {
    const pendingCarId = req.params.id;
    const pendingCar = await PendingCar.findById(pendingCarId);
    if (!pendingCar) {
      return res.status(404).json({ error: "İlan bulunamadı." });
    }

    const approvedCar = new Car({
      ...pendingCar.toObject(),
      kaynak: "kullanici",
    });
    await approvedCar.save();
    await PendingCar.findByIdAndDelete(pendingCarId);

    res.json({ message: "İlan başarıyla onaylandı.", data: approvedCar });
  } catch (error) {
    res.status(500).json({ error: "İlan onaylanırken bir hata oluştu." });
  }
});

// İlanı reddet
router.delete("/reject/:id", authenticateAdmin,async (req, res) => {
  try {
    const pendingCarId = req.params.id;

    // Bekleyen ilanı sil
    const deletedCar = await PendingCar.findByIdAndDelete(pendingCarId);
    if (!deletedCar) {
      return res.status(404).json({ error: "İlan bulunamadı." });
    }

    res.json({ message: "İlan başarıyla reddedildi." });
  } catch (error) {
    console.error("İlan reddedilirken hata:", error.message);
    res.status(500).json({ error: "İlan reddedilirken bir hata oluştu." });
  }
});

module.exports = router;
