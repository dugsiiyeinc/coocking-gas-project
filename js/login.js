const authSwitch = document.querySelector("#authSwitch");

const authButton = document.querySelector("#authButton");

const switchForm = document.querySelector("#switchForm");
// const logoutBtn = document.getElementById("logout");
const formTitle = document.querySelector("#form-title");
const username = document.querySelector("#username");
const user_location = document.querySelector("#user-location");
const user_number = document.querySelector("#user-number");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const logout = document.getElementById("logout");
const login = document.getElementById("logins");

let signIn = true;

document.addEventListener("DOMContentLoaded", async () => {
  // Event listener for switching between sign-in and sign-up forms
  document.body.addEventListener("click", (e) => {
    if (e.target.id != "switchForm") return;
    switchAuthForm();
  });

  const authForm = document.querySelector("#authForm");
  authForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const user = {
      username: signIn ? undefined : username.value,
      email: email.value,
      password: password.value,
      location: signIn ? undefined : user_location.value, // Add location for sign-up
      number: signIn ? undefined : user_number.value, // Add phone number for sign-up
    };

    if (!signIn) {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) => user.username === username.value && user.email === email.value
      );

      if (existingUser) {
        alert(`User ${existingUser.username} Already exists`);
        return;
      }

      if (confirmPassword.value !== password.value) {
        alert("Password mismatch");
        return;
      }

      // Store new user details, including location and phone number
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Registered successfully");
      switchAuthForm();
    }

    if (signIn) {
      // Sign in logic: Check if the user exists in local storage and authenticate
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = users.find(
        (user) => user.email === email.value && user.password === password.value
      );

      if (existingUser) {
        // Store the authenticated user and update authentication status
        localStorage.setItem("onlineUser", JSON.stringify(existingUser));
        localStorage.setItem("isAuthenticated", true);
        alert("You have signed in successfully");
        window.location.href = "../html/Shop.html";
        await updateNavLinks();
      } else {
        alert("Invalid Credentials");
        return;
      }
    }
  });

  // Logout functionality
  logout.addEventListener("click", async () => {
    // Logout logic: Clear authentication status and redirect to login page
    localStorage.setItem("isAuthenticated", false);
    localStorage.removeItem("onlineUser");
    await updateNavLinks();
    window.location.href = "../html/login.html";
  });

  // Switch between sign-in and sign-up forms
  function switchAuthForm() {
    signIn = !signIn;

    if (!signIn) {
      // Update form for sign-up
      authButton.textContent = "Sign up";
      formTitle.textContent = "Sign up";
      username.style.display = "block";
      user_location.style.display = "block";
      user_number.style.display = "block";
      confirmPassword.style.display = "block";

      authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in </a>`;
    } else {
      // Update form for sign-in
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
    // Check if the user is authenticated and update the visibility of login/logout buttons
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    if (isAuthenticated) {
      const onlineUser = JSON.parse(localStorage.getItem("onlineUser"));
      if (onlineUser) {
        // Display user information (location and number) if available
        console.log(`Welcome back, ${onlineUser.username}`);
        console.log(`Location: ${onlineUser.location}`);
        console.log(`Number: ${onlineUser.number}`);
      }
      logout.style.display = "block";
      login.style.display = "none";
    } else {
      logout.style.display = "none";
      login.style.display = "block";
    }
  }
});
