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

function extractErrorMessage(error) {
  if (typeof error === "string") {
    return error; // Return plain string errors
  }

  if (typeof error === "object" && error !== null) {
    // Check if the error object has specific keys like "message" or "details"
    if (error.message) return error.message;
    if (error.error) return error.error; // Adjust based on your API structure
    if (typeof error === "object") {
      return JSON.stringify(error, null, 2); // Fallback: stringify the object
    }
  }

  return "An unknown error occurred"; // Default error message
}

function parseErrorMessage(error) {
  try {
    // Parse the error message string into a JavaScript object
    const errorObject = JSON.parse(error.message);

    // Check if the "password" key exists
    if (errorObject.password) {
      return "This password is too common.";
    }
    // Check if the "email" key exists
    if (errorObject.email) {
      return "This email is already registered";
    }
  } catch (e) {
    // If parsing fails, treat it as a plain message
    console.error("Error parsing message:", e);
  }

  // Return the original error message if no "password" key is found
  return error.message;
}

// Handle registration
async function handleregister(event) {
  event.preventDefault();
  const errors = [];

  // Run form validation
  if (!validateForm()) {
    return; // Exit if validation fails
  }

  const password = document.getElementById("password").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  let phone_number = document.getElementById("mobile").value;
  if (phone_number.length === 10) {
    phone_number = "+27" + phone_number.slice(1);
  }

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

    if (!response.success) {
      const errorMessage = extractErrorMessage(response.message);
      throw new Error(errorMessage);
    }

    console.log("API Response Data:", response);
    // Handle success (e.g., navigate or show success message)
    document.getElementById("response").innerText = "Registration successful!";
  } catch (error) {
    console.error("Error during registration:", error);
    const clienterror = parseErrorMessage(error);
    errors.push("System Error: " + clienterror);
    displayerrors(errors);
  }
}

// Handle login
async function handleregister(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const payload = {
    email,
    password,
  };

  try {
    const response = await callapi({
      path: "login",
      payload: JSON.stringify(payload),
    });

    if (!response.success) {
      const errorMessage = extractErrorMessage(response.message);
      throw new Error(errorMessage);
    }

    console.log("API Response Data:", response);
    // Handle success (e.g., navigate or show success message)
    document.getElementById("response").innerText = "Registration successful!";
  } catch (error) {
    console.error("Error during registration:", error);
    const clienterror = parseErrorMessage(error);
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
  if (!/^\+?\d{10,11}$/.test(mobile))
    errors.push(
      "Mobile number must be 10 digits or 11 digits preceded by a +."
    );
  if (!password) {
    errors.push("Password is required.");
  } else if (password.length < 8) {
    errors.push("Password must be at least 8 characters long.");
  } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
    errors.push("Password must contain both numbers and letters.");
  }
  if (password !== confirmPassword) errors.push("Passwords do not match.");

  displayerrors(errors);
  if (errors.length > 0) return false;

  return true;
}

function displayerrors(errors) {
  const errorList = document.getElementById("form-errors");
  errorList.innerHTML = "";
  errors.forEach((error) => {
    const listItem = document.createElement("li");
    listItem.innerText = error;
    errorList.appendChild(listItem);
  });
}

// Validate email format
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Call API
async function callapi({ path, payload }) {
  const endpoints = {
    register:
      "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/",
    login:
      "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/login/",
  };
  const apiEndpoint = endpoints[path];
  if (!apiEndpoint) {
    throw new Error("Invalid API path");
  }
  const methods = {
    register: "POST",
    login: "POST",
  };
  const method = methods[path];

  try {
    const response = await fetch(apiEndpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: payload,
    });

    const responseBody = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: responseBody,
      };
    }

    return {
      success: true,
      data: responseBody,
    };
  } catch (error) {
    console.error("API Call Error:", error);
    return {
      success: false,
      message: error.message,
    };
  }
}
