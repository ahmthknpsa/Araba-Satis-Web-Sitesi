const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const ADMIN_CREDENTIALS = {
  username: "admin", // Yönetici kullanıcı adı
  password: "admin123", // Yönetici şifre
};

// Admin giriş rotası
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Kullanıcı adı ve şifreyi kontrol et
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    // Token oluştur
    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  // Hatalı giriş
  res.status(401).json({ error: "Geçersiz kullanıcı adı veya şifre." });
});

module.exports = router;
