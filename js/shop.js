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

  // Load the initial gas card
  async function loadSingleGasCard() {
    gasCardsContainer.innerHTML = "";
    const option = gasOptionsData[0];
    const card = document.createElement("div");
    card.classList.add("gas-card");
    card.innerHTML = `
                    <img src="${option.image}" alt="${option.name}">
                    <h3>${option.name}</h3>
                    <p>Click to view cooking gases and their prices</p>
                `;
    card.addEventListener("click", function () {
      gasDetailsContainer.style.display = "block";
      gasCardsContainer.style.display = "none";
      updateGasDetails(option.name, option.image, option.price);
      loadGasOptions();
    });
    gasCardsContainer.appendChild(card);
  }

  // Load gas options dynamically for selection
  function loadGasOptions() {
    gasOptionsContainer.innerHTML = "";
    gasOptionsData.forEach((option) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="gas-size" value="${option.price}" data-name="${option.name}" data-image="${option.image}"> ${option.name} - $${option.price}`;
      gasOptionsContainer.appendChild(label);
    });
    gasOptionsContainer.querySelector("input").checked = true;
    updateGasDetails(
      gasOptionsData[0].name,
      gasOptionsData[0].image,
      gasOptionsData[0].price
    );

    gasOptionsContainer.addEventListener("change", function (e) {
      if (e.target && e.target.matches('input[name="gas-size"]')) {
        const selectedOption = gasOptionsData.find(
          (option) => option.price == e.target.value
        );
        updateGasDetails(
          selectedOption.name,
          selectedOption.image,
          selectedOption.price
        );
      }
    });
  }

  // Update gas details (name, image, price) dynamically
  function updateGasDetails(name, image, price) {
    document.getElementById("selected-gas-name").textContent = name;
    document.getElementById("selected-gas-image").src = image;
    document.getElementById("selected-gas-price").textContent =
      "$ " + price.toFixed(2);
  }

  // Update the quantity input field
  function updateQuantity(change) {
    let quantity = parseInt(quantityInput.value);
    quantity += change;
    if (quantity < 1) quantity = 1;
    quantityInput.value = quantity;
  }
});
