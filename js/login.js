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
const logout = document.querySelector("#logout");

let signIn = true;

document.body.addEventListener("click", (e) => {
  if (e.target.id != "switchForm") return;

  switchAuthForm();
});

const authForm = document.querySelector("#authForm");

authForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = {
    username: signIn ? undefined : username.value,
    email: email.value,
    password: password.value,
  };

  if (signIn) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(
      (user) => user.email === email.value && user.password === password.value
    );

    if (existingUser) {
      localStorage.setItem("onlineUser", JSON.stringify(existingUser));
      localStorage.setItem("isAuthenticated", true);
      window.location.href = "../html/index.html";
    } else {
      window.location.href = "../html/login.html";
      alert("Invalid Credentials");
      return;
    }
  } else {
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

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered successfuly");
    switchAuthForm();
  }
});

logout.addEventListener("click", () => {
  localStorage.setItem("isAuthenticated", false);
});

function switchAuthForm() {
  signIn = !signIn;

  if (!signIn) {
    authButton.textContent = "Sign up";
    formTitle.textContent = "Sign up";
    username.style.display = "block";
    user_location.style.display = "block";
    user_number.style.display = "block";
    confirmPassword.style.display = "block";
    logout.style.display = "none";

    authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in </a>`;
  } else {
    authButton.textContent = "Sign in";
    formTitle.textContent = "Sign in";
    username.style.display = "none";

    confirmPassword.style.display = "none";
    user_location.style.display = "none";
    user_number.style.display = "none";
<<<<<<< HEAD
    logout.style.display = "block";
=======
>>>>>>> 83547472093cccc7b299660887b360cb5206227d
    username.value = "";
    confirmPassword.value = "";
    email.value = "";
    password.value = "";

    authSwitch.innerHTML = `Already have an account? <a href="#" id="switchForm">Sign in </a>`;
  }
}
