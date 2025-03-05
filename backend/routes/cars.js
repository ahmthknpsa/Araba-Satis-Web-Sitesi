const express = require("express");
const Car = require("../models/Car");
const router = express.Router();

// Tüm araçları listeleme
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find().lean(); // Tüm verileri çek
    res.json({ total: cars.length, data: cars }); // JSON formatında döndür
  } catch (error) {
    console.error("Veri alma hatası:", error.message);
    res.status(500).json({ error: "Veri alınırken bir hata oluştu." });
  }
});

// Filtreleme ile araç getir
router.get("/filter", async (req, res) => {
  const { marka, fiyatMin, fiyatMax, yil } = req.query;

  try {
    const query = {};

    // Marka filtresi
    if (marka) query["Marka"] = { $regex: new RegExp(marka, "i") };

    // Fiyat filtresi
    if (fiyatMin) query["Fiyat"] = { $gte: fiyatMin };
    if (fiyatMax) query["Fiyat"] = { $lte: fiyatMax };

    // Yıl filtresi
    if (yil) query["Yıl"] = yil;

    const cars = await Car.find(query).lean();
      // Resim URL'lerini normalize et
      const normalizeURL = (url) => decodeURIComponent(url);

      cars.forEach((car) => {
        car["resimURL"] = normalizeURL(car["resimURL"] || "images/default-car.jpg");
      });


    res.json({ total: cars.length, data: cars });
  } catch (error) {
    console.error("Filtreleme hatası:", error.message);
    res.status(500).json({ error: "Veriler alınırken bir hata oluştu." });
  }
});

// Sedan araçları getir
router.get("/sedan", async (req, res) => {
  try {
    const cars = await Car.find({ "Kasa Tipi": "Sedan" }).lean(); // Doğru alan adı "Kasa Tipi"

    if (cars.length === 0) {
      return res.status(404).json({ message: "Hiç Sedan araç bulunamadı." });
    }
    res.json({ total: cars.length, data: cars });
  } catch (error) {
    console.error("Sedan araçları alırken bir hata oluştu:", error.message);
    res
      .status(500)
      .json({ error: "Sedan araçları alınırken bir hata oluştu." });
  }
});
// Coupe araçları getir
router.get("/coupe", async (req, res) => {
  try {
    // Kasa tipi "Coupe" olan araçları filtreliyoruz
    const cars = await Car.find({ "Kasa Tipi": "Coupe" }).lean();

    if (cars.length === 0) {
      return res.status(404).json({ message: "Hiç Coupe araç bulunamadı." });
    }
    res.json({ total: cars.length, data: cars });
  } catch (error) {
    console.error("Coupe araçları alırken bir hata oluştu:", error.message);
    res
      .status(500)
      .json({ error: "Coupe araçları alınırken bir hata oluştu." });
  }
});
// Roadster araçları getir
router.get("/roadster", async (req, res) => {
  try {
    // Kasa tipi "Roadster" olan araçları filtreliyoruz
    const cars = await Car.find({ "Kasa Tipi": "Roadster" }).lean();

    if (cars.length === 0) {
      return res.status(404).json({ message: "Hiç Roadster araç bulunamadı." });
    }
    res.json({ total: cars.length, data: cars });
  } catch (error) {
    console.error("Roadster araçları alırken bir hata oluştu:", error.message);
    res
      .status(500)
      .json({ error: "Roadster araçları alınırken bir hata oluştu." });
  }
});

// Hatchback araçları getir
router.get("/hatchback", async (req, res) => {
  try {
    // Kasa tipi "Hatchback/5" olan araçları filtreliyoruz
    const cars = await Car.find({ "Kasa Tipi": "Hatchback/5" }).lean();

    if (cars.length === 0) {
      return res
        .status(404)
        .json({ message: "Hiç Hatchback araç bulunamadı." });
    }
    res.json({ total: cars.length, data: cars });
  } catch (error) {
    console.error("Hatchback araçları alırken bir hata oluştu:", error.message);
    res
      .status(500)
      .json({ error: "Hatchback araçları alınırken bir hata oluştu." });
  }
});

// Benzersiz markaları getir
router.get("/marka", async (req, res) => {
  try {
    const brands = await Car.distinct("Marka"); // Veritabanındaki benzersiz markaları alır
    if (brands.length === 0) {
      return res.status(404).json({ message: "Hiç marka bulunamadı." });
    }
    res.json({ total: brands.length, data: brands });
  } catch (error) {
    console.error("Marka verileri alınırken hata oluştu:", error.message);
    res
      .status(500)
      .json({ error: "Marka verileri alınırken bir hata oluştu." });
  }
});

router.get("/:id", async (req, res) => {
  console.log("Gelen ID:", req.params.id); // Gelen ID'yi logla
  try {
    const car = await Car.findById(req.params.id).lean();
    console.log("Bulunan Araç:", car); // Bulunan aracı logla
    if (!car) {
      return res.status(404).json({ message: "Araç bulunamadı." });
    }
    res.json(car);
  } catch (error) {
    console.error("Hata:", error.message);
    res.status(500).json({ error: "Araç alınırken bir hata oluştu." });
  }
});

module.exports = router;
