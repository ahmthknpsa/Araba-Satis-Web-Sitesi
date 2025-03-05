document.addEventListener("DOMContentLoaded", function () {
  const carList = document.getElementById("car-list");
  const filterForm = document.getElementById("filter-form");

  // Tüm araçları listeleme
  async function fetchCars(query = "") {
    carList.innerHTML = "<p>Veriler yükleniyor...</p>"; // Yükleniyor mesajı
    try {
      const response = await fetch(`http://localhost:5024/api/cars${query}`);
      const cars = await response.json();
      carList.innerHTML = ""; // Önceki içeriği temizle

      if (cars.length === 0) {
        carList.innerHTML = "<p>Aradığınız kriterlere uygun araç bulunamadı.</p>";
        return;
      }

      cars.forEach((car) => {
        const carItem = document.createElement("div");
        carItem.classList.add("car-item");
        carItem.innerHTML = `
          <h2>${car.urunAdi || "Bilinmeyen Ürün Adı"}</h2>
          <p><strong>Fiyat:</strong> ${car.fiyat || "Bilinmiyor"}</p>
          <p><strong>Marka:</strong> ${car.marka || "Bilinmiyor"}</p>
          <p><strong>Model:</strong> ${car.model || "Bilinmiyor"}</p>
          <p><strong>Yıl:</strong> ${car.yil || "Bilinmiyor"}</p>
        `;
        carList.appendChild(carItem);
      });
    } catch (error) {
      console.error("Veriler alınırken bir hata oluştu:", error);
      carList.innerHTML = "<p>Veri alınırken bir sorun oluştu.</p>";
    }
  }

  // Sayfa yüklendiğinde tüm araçları getir
  fetchCars();

  // Filtreleme işlemi
  filterForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Formun varsayılan davranışını engelle

    const marka = document.getElementById("marka").value;
    const fiyatMin = document.getElementById("fiyatMin").value;
    const fiyatMax = document.getElementById("fiyatMax").value;

    let query = "?";
    if (marka) query += `marka=${marka}&`;
    if (fiyatMin) query += `fiyatMin=${fiyatMin}&`;
    if (fiyatMax) query += `fiyatMax=${fiyatMax}&`;

    fetchCars(query); // API'den filtrelenmiş verileri getir
  });
});
