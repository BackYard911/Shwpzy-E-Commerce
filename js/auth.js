// Login Form Elements
const loginFormElm = document.querySelector("#loginForm");
const loginEmailElm = loginFormElm.querySelector("#loginForm__email");
const loginPasswordElm = loginFormElm.querySelector("#loginForm__password");
const loginFormLinkElm = document.querySelector("#loginFormLink");
const loginFormErrorElm = loginFormElm.querySelector(".loginForm__error");
// Sign Up Form Elements
const signUpFormElm = document.querySelector("#signUpForm");
const signUpNameElm = signUpFormElm.querySelector("#signUpForm__name");
const signUpEmailElm = signUpFormElm.querySelector("#signUpForm__email");
const signUpPasswordElm = signUpFormElm.querySelector("#signUpForm__password");
const signUpPhoneElm = signUpFormElm.querySelector("#signUpForm__phone");
const signUpAddressElm = signUpFormElm.querySelector("#signUpForm__address");
const signUpFormLinkElm = document.querySelector("#signUpFormLink");
const signUpFormErrorElm = signUpFormElm.querySelector(".signUpForm__error");

const innerContainerElm = document.querySelector(".inner-container");
// globals
// const users = [];
const BASE_URL = "http://powerful-crag-63009.herokuapp.com/api/";

async function authenticateUser(user) {
  const response = await fetch(BASE_URL + "login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  const result = await response.json();
  console.log(result);
  if (result.user) {
    localStorage.setItem("logged_user", JSON.stringify(result));
    return true;
  }
  return false;
}

async function addUser(user) {
  const response = await fetch(BASE_URL + "register", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(user),
  });
  const result = await response.json();
  console.log(result);
  if (result.user) {
    localStorage.setItem("logged_user", JSON.stringify(result));
    return true;
  }
  return false;
}
// Validations
function validateName(name) {
  return name.match(/^([a-z]{3,}\s?)+$/i) === null ? false : true;
}
function validateEmail(email) {
  return email.match(/^[a-z0-9_.]+@[a-z]+\.[a-z]+$/i) === null ? false : true;
}
function validatePassword(password) {
  return password.length >= 8;
}
// Forms
async function login() {
  const user = {
    email: loginEmailElm.value,
    password: loginPasswordElm.value,
  };
  clearErrors(loginFormElm);
  const curr_user = await authenticateUser(user);
  if (curr_user) {
    location.replace("./index.html");
  } else {
    showError(loginFormElm, "incorrect email/password");
  }
}
async function register() {
  const user = {
    name: signUpNameElm.value.trim(),
    email: signUpEmailElm.value,
    password: signUpPasswordElm.value,
    phone: signUpPhoneElm.value,
    address: signUpAddressElm.value,
  };
  clearErrors(signUpFormElm);
  if (!validateName(user.name)) {
    showError(signUpFormElm, "Name must be at least 3 letters");
    return;
  }
  if (!validateEmail(user.email)) {
    showError(signUpFormElm, "Enter a valid email");
    return;
  }
  if (!validatePassword(user.password)) {
    showError(signUpFormElm, "Password must be at least 8 letters");
    return;
  }
  if (await addUser(user)) {
    location.replace("./index.html");
  } else {
    showError(signUpFormElm, "User already exists");
    return;
  }
}

function showForm(form) {
  if (form === loginFormElm) {
    innerContainerElm.style.transform = "rotateY(0deg)";
  } else if (form === signUpFormElm) {
    innerContainerElm.style.transform = "rotateY(180deg)";
  }
}

// Form Errors
function showError(form, message) {
  if (form === loginFormElm) {
    loginFormErrorElm.innerText = message;
    loginFormErrorElm.style.display = "block";
  } else if (form === signUpFormElm) {
    signUpFormErrorElm.innerText = message;
    signUpFormErrorElm.style.display = "block";
  }
}
function clearErrors(form) {
  if (form === loginFormElm) {
    loginFormErrorElm.innerText = "";
    loginFormErrorElm.style.display = "none";
  } else if (form === signUpFormElm) {
    signUpFormErrorElm.style.display = "none";
    signUpFormErrorElm.innerText = "";
  }
}

// Event Listeners
loginFormElm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await login();
});
loginFormLinkElm.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(loginFormElm);
});
signUpFormElm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await register();
});
signUpFormLinkElm.addEventListener("click", (e) => {
  e.preventDefault();
  showForm(signUpFormElm);
});
