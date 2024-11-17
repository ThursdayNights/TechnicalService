function navigateTo(page) {
  if (page === "register") {
    alert("Navigating to Register Page");
    // Replace the alert with actual navigation code
    window.location.href = "register.html";
  } else if (page === "login") {
    alert("Navigating to Login Page");
    // Replace the alert with actual navigation code
    // Example: window.location.href = 'login.html';
  }
}

function handleregister(event) {
  event.preventDefault(); // Prevent the default form submission

  const form = event.target.closest("form");
  if (form) {
    registeruser(form);
  }
}

async function registeruser(form) {
  // Get the form data
  const formData = new FormData(form);

  // Convert form data to a JSON object
  const jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });

  // Convert the JSON object to a string
  const jsonString = JSON.stringify(jsonObject);
  // remove mobile
  delete jsonObject.mobile;
  // add "role": "user"
  jsonObject.role = "user";
  // add "username":  and set it to email
  jsonObject.username = jsonObject.email;

  // Print debug information to the console
  console.log("Form Data Object:", jsonObject);
  console.log("Form Data JSON String:", jsonString);

  // Send the JSON string to the server
  try {
    const response = await fetch(
      "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFTOKEN":
            "UV9VKKgfS13D4cHMgUeAhoGrD2eijGIvUV6L8QUa9KMXPfVZPDC6bmxqFTvIHuwT",
        },
        body: jsonString,
      }
    );

    const result = await response.json();
    console.log("Server Response:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}

// const response = await fetch(
//   "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/",
//   {
//     method: "POST",
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "X-CSRFTOKEN":
//         "UV9VKKgfS13D4cHMgUeAhoGrD2eijGIvUV6L8QUa9KMXPfVZPDC6bmxqFTvIHuwT",
//     },
//     body: JSON.stringify(payload),
//   }
// );

// const result = await response.json();
