const fetch = require("node-fetch");

exports.handler = async (event) => {
  let API_URL;

  // Determine endpoint based on path
  if (event.path.includes("register")) {
    API_URL =
      "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";
  } else if (event.path.includes("login")) {
    API_URL =
      "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/login/";
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid API path" }),
    };
  }

  try {
    const payload = JSON.parse(event.body);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFTOKEN": process.env.CSRF_TOKEN || "default_token_value",
      },
      body: JSON.stringify(payload),
    });

    const responseData = await response.json();

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
