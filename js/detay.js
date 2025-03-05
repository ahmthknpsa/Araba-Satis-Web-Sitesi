document.addEventListener("DOMContentLoaded", () => {
    // URL'den carId'yi alma
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get("carId");
  
    if (!carId) {
      alert("Araba ID'si bulunamadı.");
      return;
    }
  
    console.log("Car ID:", carId);
  
    // Mesajları Görüntüle Butonuna Tıklama
    document.getElementById("toggle-messages-button").addEventListener("click", () => {
      fetchMessages(carId);
    });
  
    // Mesaj Gönder Butonuna Tıklama
    document.getElementById("send-message-button").addEventListener("click", () => {
      sendMessage(carId);
    });
  });
  