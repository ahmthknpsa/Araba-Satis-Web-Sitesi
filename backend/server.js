const express = require("express");
const cors = require("cors");
const path = require('path');

const mongoose = require("mongoose");
require("dotenv").config(); // dotenv kütüphanesini yükleyin
const connectDB = require("./config/db"); // Veritabanı bağlantısını dahil edin

// MongoDB bağlantısını başlat
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());

// Public klasörünü statik olarak ayarla
app.use(express.static(path.join(__dirname, "public")));

const pendingCarsRoute = require("./routes/pendingCars");
app.use("/api/pendingCars", pendingCarsRoute);

const carRoutes = require("./routes/cars");
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const messagesRoute = require("./routes/messages");
app.use("/api/messages", messagesRoute);

const messageRoutes = require("./routes/messages");
app.use("/api/messages", messageRoutes);

// Chat Route
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mesaj eksik!" });
  }

  // OpenAI API çağrısı
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(response.status).json({ error: data.error.message });
    }
  } catch (error) {
    console.error("Chat API hatası:", error.message);
    res.status(500).json({ error: "Sunucu hatası." });
  }
});

app.get("/api/chat", (req, res) => {
  res.send("API is ready for POST requests.");
});

//admin
const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

// Admin login rotası
const adminAuthRoute = require("./routes/adminAuth");
app.use("/api/admin/auth", adminAuthRoute);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const PORT = 5024;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
