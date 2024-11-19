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
function handleregister(event) {
  event.preventDefault();
  navigateTo("registerlanding");
}
function handlelogin(event) {
  event.preventDefault();
  navigateTo("clientlanding");
}

// datahandlers
// async function handleregister(event) {
//   event.preventDefault();
//   const password = document.getElementById("password").value;
//   const first_name = document.getElementById("first_name").value;
//   const last_name = document.getElementById("last_name").value;
//   const email = document.getElementById("email").value;

//   const payload = {
//     username: email,
//     password,
//     first_name,
//     last_name,
//     email,
//     role: "user",
//   };

//   const responseElement = document.getElementById("response");
//   responseElement.innerHTML = "<p>Sending request...</p>";

//   console.log(JSON.stringify(payload));
//   try {
//     // const result = await response.json();
//     const response = await fetch(
//       "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/",
//       {
//         method: "POST",
//         headers: {
//           accept: "application/json",
//           "Content-Type": "application/json",
//           "X-CSRFTOKEN":
//             "UV9VKKgfS13D4cHMgUeAhoGrD2eijGIvUV6L8QUa9KMXPfVZPDC6bmxqFTvIHuwT",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     const result = await response.json();

//     if (response.ok) {
//       responseElement.innerHTML = `
//       <h3>Registration Successful</h3>
//       <p><strong>Username:</strong> ${result.username}</p>
//       <p><strong>Email:</strong> ${result.email}</p>
//       <p><strong>First Name:</strong> ${result.first_name}</p>
//       <p><strong>Last Name:</strong> ${result.last_name}</p>
//     `;
//     } else {
//       responseElement.innerHTML = `
//       <h3 class="error">Registration Failed</h3>
//       <p><strong>Status:</strong> ${response.status}</p>
//       <p><strong>Message:</strong> ${result.detail || "An error occurred"}</p>
//     `;
//     }
//   } catch (error) {
//     responseElement.innerHTML = `
//     <h3 class="error">Error</h3>
//     <p>${error.message}</p>
//   `;
//   }
// }
