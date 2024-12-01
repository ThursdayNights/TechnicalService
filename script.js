// Global messaging system
var globalmessage = "";

window.addEventListener("load", function () {
  console.log(window.location.href);
  console.log("globalmessage:", globalmessage);
});

var globalemail = "";

// Navigation
function navigateTo(page) {
  if (page) {
    window.location.href = `${page}.html`;
  } else {
    console.error("Invalid page name");
  }
}

function handlenavigateTo(event, page) {
  event.preventDefault();
  navigateTo(page);
}

// Handle registration
async function handleregister(event) {
  event.preventDefault();

  // Run form validation
  if (!validateForm()) {
    return; // Exit if validation fails
  }

  const password = document.getElementById("password").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const phone_number = document.getElementById("mobile").value;

  const supplier_key = "h3st1c0";
  const payload = {
    username: email,
    password,
    first_name,
    last_name,
    email,
    role: "user",
    phone_number,
    supplier_key,
  };

  try {
    const response = await callapi({
      path: "register",
      payload: JSON.stringify(payload),
    });
    document.getElementById("response").innerText = JSON.stringify(
      response,
      null,
      2
    );
    console.log("Registration successful:", response);
  } catch (error) {
    console.error("Error during registration:", error);
    document.getElementById("response").innerText =
      "Error during registration: " + error.message;
  } finally {
    document.getElementById("loading-bar").style.display = "none";
  }
}

// Validate form fields
function validateForm() {
  const errors = [];
  const firstName = document.getElementById("first_name").value.trim();
  const lastName = document.getElementById("last_name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmpassword").value;

  if (!firstName) errors.push("First name is required.");
  if (!lastName) errors.push("Last name is required.");
  if (!email || !validateEmail(email))
    errors.push("A valid email is required.");
  if (!mobile) errors.push("Mobile number is required.");
  if (!password) errors.push("Password is required.");
  if (password !== confirmPassword) errors.push("Passwords do not match.");

  const errorContainer = document.getElementById("form-errors");
  if (errorContainer) {
    if (errors.length > 0) {
      errorContainer.innerHTML = errors.join("<br>");
      return false;
    }
    errorContainer.innerHTML = "";
  } else {
    console.error("Error container not found in DOM.");
  }

  return true;
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Call API
async function callapi({ path, payload }) {
  console.log("Path:", path);
  console.log("Payload:", payload);

  let apiEndpoint;
  switch (path) {
    case "register":
      apiEndpoint =
        "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";
      break;
    default:
      throw new Error("Invalid API path");
  }

  return await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: payload,
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Server Error: " + response.status + " - " + errorText);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
