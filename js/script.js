const navbar = document.querySelector(".navbar");
const toggleButton = document.querySelector(".toggle-button");
const themeToggle = document.getElementById("theme-toggle");

toggleButton.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

themeToggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.contains("dark-mode");

  // Toggle between dark and light modes
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  // Set appropriate colors for body and font
  if (isDarkMode) {
    document.body.style.backgroundColor = "#ffffff";
    document.body.style.color = "#000000";
    localStorage.setItem("theme", "light-mode");
  } else {
    document.body.style.backgroundColor = "#000000";
    document.body.style.color = "#ffffff";
    localStorage.setItem("theme", "dark-mode");
  }
});

window.addEventListener("load", function () {
  const theme = localStorage.getItem("theme");

  const isServices = window.location.href.includes("services");
  const isAuthenticated = JSON.parse(
    this.localStorage.getItem("isAuthenticated")
  );

  if (!isAuthenticated && isServices) {
    this.window.location.href = "login.html";
  }

  if (theme) {
    document.body.classList.add(theme);
    if (theme === "dark-mode") {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    }
  }
});
