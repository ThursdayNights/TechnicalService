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

// buttonhandlers
// Register handler
async function handleregister(event) {
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
  let message = ""; // Declare message variable outside the try block
  document.getElementById("loading-bar").style.display = "block";

  try {
    // Send the request to the Netlify Function instead of Azure
    const response = await fetch("/.netlify/functions/azureProxy", {
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
    const result = await response.json();

    if (response.ok) {
      console.log("Registration successful:", result);
      message = "Registration successful";
    } else {
      console.log("Registration failed:", result);
      message = "Registration failed: " + (result.message || "Unknown error");
    }
  } catch (error) {
    console.log("Fetch error (Server Side):", error);
    message = "Fetch error (Server Side): " + error.message;
  }

  globalmessage = message; // Update globalmessage before navigating
  console.log("Global message:", globalmessage);
  document.getElementById("loading-bar").style.display = "none"; // Hide the loading bar
  alert(message);

  if (message === "Registration successful") {
    navigateTo("confirmuser");
  }
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
    const response = await fetch("/.netlify/functions/azureProxy", {
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
    const result = await response.json();

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

  // if (message === "Log In successful") {
  //   navigateTo("home");
  // }
}

function handleregistercompany(event) {
  event.preventDefault();
  navigateTo("confirmcompany");
}
