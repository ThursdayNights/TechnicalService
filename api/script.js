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
function handlelogin(event) {
  event.preventDefault();
  navigateTo("register");
}

// Register handler
async function handleregister(event) {
  event.preventDefault();
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
    const response = await fetch(
      "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFTOKEN":
            "UV9VKKgfS13D4cHMgUeAhoGrD2eijGIvUV6L8QUa9KMXPfVZPDC6bmxqFTvIHuwT",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("Response status:", response.status);
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
  // Hide the loading bar
  document.getElementById("loading-bar").style.display = "none";
  navigateTo("confirmuser");
}
