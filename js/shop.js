document.addEventListener("DOMContentLoaded", async function () {
  // Sample data for gas options
  const gasOptionsData = [
    { name: "3kg M", price: 5.5, image: "../images/2.png" },
    { name: "6kg M", price: 10.0, image: "../images/8.png" },
    { name: "11kg M", price: 18.7, image: "../images/11.png" },
    { name: "13kg M", price: 22.0, image: "../images/33.png" },
  ];
  // Load cart from local storage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  const gasCardsContainer = document.getElementById("gas-cards-container");
  const gasDetailsContainer = document.getElementById("gas-details-container");
  const gasOptionsContainer = document.getElementById("gas-options");
  const quantityInput = document.getElementById("quantity");
  const cartModal = document.getElementById("cart-modal");
  const cartIcon = document.getElementById("cart-icon");
  const cartItemsElement = document.getElementById("cart-items");
});
