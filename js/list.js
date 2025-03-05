document.addEventListener("DOMContentLoaded", async function () {
  const carList = document.getElementById("car-list");

  async function fetchCars() {
    try {
      carList.innerHTML = "<p>Yükleniyor...</p>"; // Yükleniyor mesajını göster

      const response = await fetch("http://localhost:5024/api/cars");
      const cars = await response.json();

      carList.innerHTML = ""; // Önceki içeriği temizle

      if (!cars.data || cars.data.length === 0) {
        carList.innerHTML = "<p>Hiç araç bulunamadı.</p>";
        return;
      }

      cars.data.forEach((car) => {
        const carItem = document.createElement("div");
        carItem.classList.add("car-item");

        carItem.innerHTML = `
          <div class="car-card">
            <img src="${car.ResimURL || "images/default-car.jpg"}" class="car-image" alt="${car["Ürün Adı"] || "Araç"}">
            <div class="car-info">
              <h2>${car["Ürün Adı"] || "Bilinmeyen Ürün Adı"}</h2>
              <p><strong>Fiyat:</strong> ${car.Fiyat || "Bilinmiyor"} TL</p>
              <p><strong>Marka:</strong> ${car.Marka || "Bilinmiyor"}</p>
              <p><strong>Model:</strong> ${car.Model || "Bilinmiyor"}</p>
              <p><strong>Yıl:</strong> ${car["Yıl"] || "Bilinmiyor"}</p>
              <button class="btn-detail" data-car='${JSON.stringify(car)}'>Detayları Gör</button>
            </div>
          </div>
        `;
        carList.appendChild(carItem);
      });

      // Detayları Gör butonları için event listener
      document.querySelectorAll(".btn-detail").forEach((button) => {
        button.addEventListener("click", function () {
          const carData = JSON.parse(this.getAttribute("data-car"));

          if (carData) {
            localStorage.setItem("selectedCar", JSON.stringify(carData));
            window.location.href = "detail.html"; // Detay sayfasına yönlendir
          } else {
            console.error("Butona tıklama sırasında veri eksik:", carData);
          }
        });
      });
    } catch (error) {
      console.error("Araçlar alınırken bir hata oluştu:", error);
      carList.innerHTML = "<p>Veri alınırken bir sorun oluştu.</p>";
    }
  }

  fetchCars(); // Araçları getir
});
