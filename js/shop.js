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

  // Load a single gas card initially
  await loadSingleGasCard();

  // Event listener to increase quantity
  document
    .getElementById("increase-quantity")
    .addEventListener("click", function () {
      updateQuantity(1);
    });

  // Event listener to decrease quantity
  document
    .getElementById("decrease-quantity")
    .addEventListener("click", function () {
      updateQuantity(-1);
    });

  // Event listener to add item to cart
  document.getElementById("add-to-cart").addEventListener("click", function () {
    addToCart();
  });

  // Event listener to show the cart modal
  cartIcon.addEventListener("click", function () {
    showCartModal();
  });

  // Event listener to close the cart modal
  document.getElementById("close-modal").addEventListener("click", function () {
    cartModal.style.display = "none";
  });
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

  // Add the selected item to the cart
  function addToCart() {
    const selectedOption = document.querySelector(
      'input[name="gas-size"]:checked'
    );
    const name = selectedOption.dataset.name;
    const price = parseFloat(selectedOption.value);
    const quantity = parseInt(quantityInput.value);

    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(quantity + " item(s) added to cart.");
  }

  // Update the cart count badge
  function updateCartCount() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
  }
  // Show the cart modal with cart items and order summary
  function showCartModal() {
    cartItemsElement.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item) => {
      subtotal += item.price * item.quantity;
      const row = document.createElement("tr");
      row.innerHTML = `
                    <td>${item.name}</td>
                    <td>
                        <button onclick="updateCartItem('${
                          item.name
                        }', -1)">-</button>
                        ${item.quantity}
                        <button onclick="updateCartItem('${
                          item.name
                        }', 1)">+</button>
                    </td>
                    <td>$ ${(item.price * item.quantity).toFixed(2)}</td>
                    <td><button onclick="removeCartItem('${
                      item.name
                    }')"><i class="fas fa-trash"></i></button></td>
                `;
      cartItemsElement.appendChild(row);
    });

    const taxes = subtotal * 0.05;
    const total = subtotal + taxes;

    document.getElementById("subtotal").textContent = subtotal.toFixed(2);
    document.getElementById("taxes").textContent = taxes.toFixed(2);
    document.getElementById("total").textContent = total.toFixed(2);

    cartModal.style.display = "block";
  }

  // Update the quantity of an item in the cart
  window.updateCartItem = function (name, change) {
    const item = cart.find((item) => item.name === name);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        cart = cart.filter((cartItem) => cartItem.name !== name);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      showCartModal();
    }
  };

  // Remove an item from the cart
  window.removeCartItem = function (name) {
    cart = cart.filter((item) => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartModal();
  };
});
