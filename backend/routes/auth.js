const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

// Kullanıcı kaydı
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "Kayıt başarılı." });
  } catch (error) {
    res.status(500).json({ error: "Kayıt sırasında bir hata oluştu." });
  }
});

// Kullanıcı Giriş
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Yanlış şifre." });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ message: "Giriş başarılı.", token });
  } catch (error) {
    res.status(500).json({ error: "Giriş sırasında bir hata oluştu." });
  }
});



router.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Kullanıcı adı ve şifre gerekli." });
  }

  const userExists = users.find((u) => u.username === username);

  if (userExists) {
    return res.status(409).json({ error: "Bu kullanıcı adı zaten alınmış." });
  }

  users.push({ username, password, role: "user" });
  res.status(201).json({ message: "Kayıt başarılı!" });
});


module.exports = router;
