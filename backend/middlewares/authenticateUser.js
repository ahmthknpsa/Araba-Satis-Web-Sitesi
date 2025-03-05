// middlewares/authenticateUser.js
const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Yetkilendirme gerekli." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Kullanıcı bilgilerini istek objesine ekle
    next();
  } catch (error) {
    return res.status(401).json({ error: "Geçersiz veya süresi dolmuş token." });
  }
}

module.exports = authenticateUser;
