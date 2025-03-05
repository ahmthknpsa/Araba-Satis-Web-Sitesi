const Car = require("../models/Car");

// Tüm araçları veya türüne göre araçları getir
const getCars = async (req, res) => {
  const { type } = req.query; // `type` parametresi (örneğin, Sedan)
  try {
    const cars = await Car.find(type ? { type } : {}); // Tür filtreleme
    res.json(cars);
  } catch (error) {
    res.status(500).send("Error fetching cars");
  }
};

module.exports = { getCars };
