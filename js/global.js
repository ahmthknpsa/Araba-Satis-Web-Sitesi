document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("userToken");
  
    if (token) {
      const user = JSON.parse(atob(token.split(".")[1])); // Token'dan kullanıcı verisi alınır
      const userInfoDiv = document.createElement("div");
      userInfoDiv.textContent = `Hoş geldiniz, ${user.username}!`;
      document.body.prepend(userInfoDiv);
    }
  });
  