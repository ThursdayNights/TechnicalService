// Conole messsaging system
var globalmessage = "";
window.addEventListener("load", function () {
  console.log(window.location.href);
  console.log("globalmessage:", globalmessage);
});

var globalemail = "";

// navigation
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

async function handleregister(event) {
  // print event.path to console
  event.preventDefault();
  alert("Registering user...");
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

  console.log("Payload:", JSON.stringify(payload));

  try {
    // Send the request to the callapi Function
    const response = await callapi({
      path: "register",
      payload: JSON.stringify(payload),
    });
  } catch (error) {
    console.error("Error during registration:", error);
  } finally {
    document.getElementById("loading-bar").style.display = "none";
  }
  return payload;
}

async function handlelogin(event) {
  event.preventDefault();
  alert("Log In user...");
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const supplier_key = "h3st1c0";
  const payload = {
    username: email,
    password,
    supplier_key,
  };

  console.log("Payload:", JSON.stringify(payload));
  let message = "";
  try {
    // Send the request to the Netlify Function instead of Azure
    const response = await fetch("/.netlify/functions/azureProxy/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const resp_status = response.status;
    const resp_statustext = response.statusText;
    console.log("Response status here....:", resp_status);
    console.log("Response statusText:", resp_statustext);
    let result;
    try {
      result = await response.json();
    } catch (e) {
      console.error("Invalid JSON response:", e);
      result = { message: "Invalid JSON response" };
    }

    if (response.ok) {
      console.log("Log In successful:", result);
      message = "Log In successful";
    } else {
      console.log("Log In failed:", result);
      message = "Log In failed: " + (result.message || "Unknown error");
    }
  } catch (error) {
    console.log("Fetch error (Server Side):", error);
    message = "Fetch error (Server Side): " + error.message;
  }

  globalmessage = message; // Update globalmessage before navigating
  console.log("Global message:", globalmessage);
  alert(message);
}

function handleregistercompany(event) {
  event.preventDefault();
  navigateTo("confirmcompany");
}

async function callapi({ path, payload }) {
  console.log("Path:", path);
  console.log("Payload:", payload);

  let apiEndpoint;
  switch (path) {
    case "register":
      apiEndpoint =
        "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";
      break;
    case "login":
      apiEndpoint =
        "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/login/";
      break;
    default:
      throw new Error("Invalid API path");
  }

  await fetch(apiEndpoint, {
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
    .then((data) => {
      console.log(JSON.stringify(data, null, 2));
    })
    .catch((error) => {
      console.error("Error:", error); // Added line to show console errors
      let errorMessage = "An error occurred: ";
      if (error.message.includes("NetworkError")) {
        errorMessage +=
          "Network error. Please check if the server is running and accessible.";
      } else if (error.message.includes("Failed to fetch")) {
        errorMessage +=
          "Unable to connect to the server. Please ensure the URL is correct and the server is up.";
      } else {
        errorMessage += error.message;
      }
      console.log(errorMessage);
    });
}
