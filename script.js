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

  let message = ""; // Declare message variable outside the try block
  document.getElementById("loading-bar").style.display = "block";
  try {
    // Send the request to the Netlify Function instead of Azure
    const response = await fetch("/.netlify/functions/azureProxy/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const resp_status = response.status;
    const resp_statustext = response.statusText;
    console.log("Response status here....:", resp_status);

    const responseData = await response.json();
    message = responseData.message || "Registration successful";
  } catch (error) {
    console.error("Registration failed:", error);
    message = "Registration failed: " + error.message;
  }

  globalmessage = message; // Update globalmessage before navigating
  console.log("Global message:", globalmessage);
  document.getElementById("loading-bar").style.display = "none"; // Hide the loading bar
  alert(message);

  if (message === "Registration successful") {
    navigateTo("home");
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

  // if (message === "Log In successful") {
  //   navigateTo("home");
  // }
}

function handleregistercompany(event) {
  event.preventDefault();
  navigateTo("confirmcompany");
}

// const fetch = (...args) =>
//   import("node-fetch").then(({ default: fetch }) => fetch(...args));

// export const handler = async (event) => {
//   console.log("Event path:", event.path); // Log the event path

//   let API_URL;
//   if (event.path.includes("register")) {
//     API_URL =
//       "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";
//   } else if (event.path.includes("login")) {
//     API_URL =
//       "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/login/";
//   } else {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({ message: "Invalid API path" }),
//     };
//   }

//   const payload = JSON.parse(event.body);

//   try {
//     const response = await fetch(API_URL, {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//         "X-CSRFTOKEN":
//           "UV9VKKgfS13D4cHMgUeAhoGrD2eijGIvUV6L8QUa9KMXPfVZPDC6bmxqFTvIHuwT",
//       },
//       body: JSON.stringify(payload),
//     });

//     let responseData;
//     const responseText = await response.text();
//     try {
//       responseData = JSON.parse(responseText);
//     } catch (error) {
//       responseData = {
//         message: "Error parsing JSON response",
//         error: error.message,
//         rawResponse: responseText,
//       };
//     }

//     return {
//       statusCode: response.status,
//       body: JSON.stringify(responseData),
//     };
//   } catch (error) {
//     console.error("Error connecting to Azure API:", error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         message: "Error connecting to Azure API",
//         error: error.message,
//       }),
//     };
//   }
// };
