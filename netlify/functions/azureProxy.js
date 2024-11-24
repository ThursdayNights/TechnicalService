const fetch = require("node-fetch");

exports.handler = async (event) => {
  const API_URL =
    "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";

  const payload = JSON.parse(event.body);

  try {
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
