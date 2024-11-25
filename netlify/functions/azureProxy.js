import fetch from "node-fetch";

export const handler = async (event) => {
  console.log("Event:", JSON.stringify(event, null, 2)); // Log the event object

  let API_URL;
  // if (event.path.includes("register")) {
  API_URL =
    "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/register/";
  // } else if (event.path.includes("login")) {
  //   API_URL =
  //     "https://app-booking-test-zanorth-001-cfdwfmcjfgeuafdg.southafricanorth-01.azurewebsites.net/api/v1/login/";
  // } else {
  //   return {
  //     statusCode: 400,
  //     body: JSON.stringify({ message: "Invalid API path" }),
  //   };
  // }

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

    let responseData;
    try {
      responseData = await response.json();
    } catch (error) {
      responseData = {
        message: "Error parsing JSON response",
        error: error.message,
      };
    }

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
