const form = document.getElementById("registerForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const successMessage = document.getElementById("successMessage");

// Helper: Show error with animation
function showError(input, message) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector(".error-message");
  errorDisplay.textContent = message;
  errorDisplay.style.opacity = 1;
  input.style.borderColor = "#ef4444";
  input.style.background = "#fef2f2";
}

// Helper: Show success with animation
function showSuccess(input) {
  const formControl = input.parentElement;
  const errorDisplay = formControl.querySelector(".error-message");
  errorDisplay.textContent = "";
  errorDisplay.style.opacity = 0;
  input.style.borderColor = "#22c55e";
  input.style.background = "#f0fdf4";
}

// Validation functions
function checkName() {
  const nameValue = nameInput.value.trim();
  if (nameValue === "") {
    showError(nameInput, "Name is required");
    return false;
  } else {
    showSuccess(nameInput);
    return true;
  }
}

function checkEmail() {
  const emailValue = emailInput.value.trim();
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (emailValue === "") {
    showError(emailInput, "Email is required");
    return false;
  } else if (!emailPattern.test(emailValue)) {
    showError(emailInput, "Enter a valid email");
    return false;
  } else {
    showSuccess(emailInput);
    return true;
  }
}

function checkPhone() {
  const phoneValue = phoneInput.value.trim();
  const phonePattern = /^[0-9]{10}$/;
  if (phoneValue === "") {
    showError(phoneInput, "Phone number is required");
    return false;
  } else if (!phonePattern.test(phoneValue)) {
    showError(phoneInput, "Enter a 10-digit phone number");
    return false;
  } else {
    showSuccess(phoneInput);
    return true;
  }
}

function checkPassword() {
  const passwordValue = passwordInput.value.trim();
  const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (passwordValue === "") {
    showError(passwordInput, "Password is required");
    return false;
  } else if (!strongPassword.test(passwordValue)) {
    showError(passwordInput, "Min 8 chars, 1 uppercase, 1 lowercase, 1 number");
    return false;
  } else {
    showSuccess(passwordInput);
    return true;
  }
}

// Real-time validation and interactivity
[nameInput, emailInput, phoneInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    switch (input) {
      case nameInput:
        checkName();
        break;
      case emailInput:
        checkEmail();
        break;
      case phoneInput:
        checkPhone();
        break;
      case passwordInput:
        checkPassword();
        break;
    }
  });
  input.addEventListener("blur", () => {
    switch (input) {
      case nameInput:
        checkName();
        break;
      case emailInput:
        checkEmail();
        break;
      case phoneInput:
        checkPhone();
        break;
      case passwordInput:
        checkPassword();
        break;
    }
  });
});

// Create or select a global notification bar
function showGlobalMessage(message, color = "#22c55e") {
  let notif = document.getElementById("global-notification");
  if (!notif) {
    notif = document.createElement("div");
    notif.id = "global-notification";
    notif.style.position = "fixed";
    notif.style.top = "0";
    notif.style.left = "0";
    notif.style.width = "100%";
    notif.style.zIndex = "9999";
    notif.style.padding = "1rem 0";
    notif.style.textAlign = "center";
    notif.style.fontWeight = "600";
    notif.style.fontSize = "1.1rem";
    notif.style.background = color;
    notif.style.color = "#fff";
    notif.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
    notif.style.transition = "top 0.4s";
    document.body.appendChild(notif);
  }
  notif.textContent = message;
  notif.style.background = color;
  notif.style.display = "block";

  // Hide after 2.5 seconds
  setTimeout(() => {
    notif.style.display = "none";
  }, 2500);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isNameValid = checkName();
  let isEmailValid = checkEmail();
  let isPhoneValid = checkPhone();
  let isPasswordValid = checkPassword();

  if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid) {
    successMessage.textContent = "";
    showGlobalMessage("🎉 Account created successfully!");
    form.reset();

    // Reset input styles after a short delay
    setTimeout(() => {
      [nameInput, emailInput, phoneInput, passwordInput].forEach((input) => {
        input.style.borderColor = "#d1d5db";
        input.style.background = "#f8fafc";
      });
    }, 2500);
  } else {
    successMessage.textContent = "";
  }
});
