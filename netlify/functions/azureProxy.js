const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Your Azure API endpoint
  const API_URL =
    "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";

  // Parse the request body from the event
  const payload = JSON.parse(event.body);

  try {
    // Forward the request to Azure
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFTOKEN":
          "UV9VKKgfS13D4cHMgUeAhoGrD2eijGIvUV6L8QUa9KMXPfVZPDC6bmxqFTvIHuwT",
      },
      body: JSON.stringify(payload),
    });

    // Get the response data from Azure
    const responseData = await response.json();

    // Return the response to the frontend
    return {
      statusCode: response.status,
      body: JSON.stringify(responseData),
    };
  } catch (error) {
    console.error("Error connecting to Azure API:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error connecting to Azure API",
        error: error.message,
      }),
    };
  }
};
