const jwt = require("jsonwebtoken");

function authenticateAdmin(req, res, next) {
  // Authorization başlığından token'ı al
  const token = req.headers.authorization?.split(" ")[1]; // Bearer token

  if (!token) {
    // Token yoksa hata döner
    return res.status(401).json({ error: "Yetkilendirme gerekli." });
  }

  try {
    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Token geçerli mi ve admin yetkisi var mı?
    if (decoded.role === "admin") {
      next(); // Admin yetkisi varsa isteği devam ettir
    } else {
      return res.status(403).json({ error: "Erişim izni yok." });
    }
  } catch (error) {
    // Geçersiz veya süresi dolmuş token
    return res.status(401).json({ error: "Geçersiz veya süresi dolmuş token." });
  }
}

module.exports = authenticateAdmin;
