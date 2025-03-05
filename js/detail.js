document.addEventListener("DOMContentLoaded", function () {
  const carDetail = document.getElementById("car-detail");

  // localStorage'dan veriyi al
  const carData = JSON.parse(localStorage.getItem("selectedCar"));

  if (!carData) {
    carDetail.innerHTML = "<p>Araba bilgisi bulunamadı. Lütfen geri dönüp bir araç seçin.</p>";
    return;
  }

  // Detayları göster
  carDetail.innerHTML = `
    <img src="images/default-car.jpg" alt="${carData["Marka"] || "Araç"}">
    <h1>${carData["Ürün Adı"] || "Bilinmeyen Araç"}</h1>
    <p><strong>Fiyat:</strong> ${carData.Fiyat || "Bilinmiyor"} TL</p>
    <p><strong>Marka:</strong> ${carData.Marka || "Bilinmiyor"}</p>
    <p><strong>Model:</strong> ${carData.Model || "Bilinmiyor"}</p>
    <p><strong>Yıl:</strong> ${carData["Yıl"] || "Bilinmiyor"}</p>
    <p><strong>Kilometre:</strong> ${carData.Kilometre || "Bilinmiyor"}</p>
    <p><strong>Yakıt Tipi:</strong> ${carData["Yakıt Tipi"] || "Bilinmiyor"}</p>
    <p><strong>Kasa Tipi:</strong> ${carData["Kasa Tipi"] || "Bilinmiyor"}</p>
    <p><strong>Renk:</strong> ${carData.Renk || "Bilinmiyor"}</p>
    <a href="list.html" class="btn">Geri Dön</a>
  `;
});
