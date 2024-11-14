const authSwitch = document.querySelector("#authSwitch");
const authButton = document.querySelector("#authButton");
const switchForm = document.querySelector("#switchForm");
const formTitle = document.querySelector("#form-title");
const username = document.querySelector("#username");
const user_location = document.querySelector("#user-location");
const user_number = document.querySelector("#user-number");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");

let signIn = true;

document.addEventListener("DOMContentLoaded", async () => {
  const navbarLinks = document.querySelector(".navbar-links ul");
  const contactItem = document.querySelector(
    ".navbar-links ul li:nth-child(4)"
  ); // Select the Contact button

  // Create dynamic login and logout buttons
  const loginButton = document.createElement("li");
  loginButton.innerHTML = `<a id="login" href="login.html" style="cursor: pointer;">Login</a>`;

  const logoutButton = document.createElement("li");
  logoutButton.innerHTML = `<a id="logout" style="cursor: pointer;">Logout</a>`;

  let signIn = true;

  // Add login button by default on page load (next to Contact)
  contactItem.insertAdjacentElement("afterend", loginButton);

  // Event listener for switching between sign-in and sign-up forms
  document.body.addEventListener("click", (e) => {
    if (e.target.id !== "switchForm") return;
    switchAuthForm();
  });

  // Check authentication status on load
  await updateNavLinks();
  await checkShopPageAccess();

  const authForm = document.querySelector("#authForm");
  if (authForm) {
    authForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const user = {
        username: signIn ? undefined : username.value,
        email: email.value,
        password: password.value,
        location: signIn ? undefined : user_location.value,
        number: signIn ? undefined : user_number.value,
      };

      if (!signIn) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(
          (user) =>
            user.username === username.value && user.email === email.value
        );

        if (existingUser) {
          alert(`User ${existingUser.username} already exists`);
          return;
        }

        if (confirmPassword.value !== password.value) {
          alert("Password mismatch");
          return;
        }

        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registered successfully");
        switchAuthForm();
      }

      if (signIn) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(
          (user) =>
            user.email === email.value && user.password === password.value
        );

        if (existingUser) {
          localStorage.setItem("onlineUser", JSON.stringify(existingUser));
          localStorage.setItem("isAuthenticated", true);
          alert("You have signed in successfully");
          window.location.href = "../html/Shop.html";
          await updateNavLinks();
        }
      }
    });
  }

  // Logout functionality

  document.body.addEventListener("click", (e) => {
    if (e.target && e.target.id === "logout") {
      localStorage.setItem("isAuthenticated", false);
      localStorage.removeItem("onlineUser");
      updateNavLinks();
      window.location.href = "../html/login.html";
    }
  });

  // Switch between sign-in and sign-up forms
  function switchAuthForm() {
    signIn = !signIn;

    if (!signIn) {
      authButton.textContent = "Sign up";
      formTitle.textContent = "Sign up";
      username.style.display = "block";
      user_location.style.display = "block";
      user_number.style.display = "block";
      confirmPassword.style.display = "block";

      authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in</a>`;
    } else {
      authButton.textContent = "Sign in";
      formTitle.textContent = "Sign in";
      username.style.display = "none";
      confirmPassword.style.display = "none";
      user_location.style.display = "none";
      user_number.style.display = "none";
      username.value = "";
      confirmPassword.value = "";
      email.value = "";
      password.value = "";

      authSwitch.innerHTML = `New to Cooking Gas? <a href="#" id="switchForm">Register now</a>`;
    }
  }

  // Update login/logout button visibility based on authentication status
  async function updateNavLinks() {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const isShopPage = window.location.href.includes("Shop.html");

    // Remove existing login/logout buttons
    if (document.getElementById("login")) {
      loginButton.remove();
    }
    if (document.getElementById("logout")) {
      logoutButton.remove();
    }

    if (isAuthenticated || isShopPage) {
      // If authenticated or on the Shop page, add the logout button after the Contact button
      contactItem.insertAdjacentElement("afterend", logoutButton);
    } else {
      // If not authenticated, add the login button after the Contact button
      contactItem.insertAdjacentElement("afterend", loginButton);
    }
  }

  // Check if user is allowed to access the shop page
  async function checkShopPageAccess() {
    const isShopPage = window.location.href.includes("Shop.html");
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (isShopPage) {
      // Ensure the Logout button is visible on the Shop page
      await updateNavLinks();
    }

    // If user is not authenticated and trying to access the shop page, redirect to login
    if (isShopPage && !isAuthenticated) {
      window.location.href = "login.html";
    }
  }
});
