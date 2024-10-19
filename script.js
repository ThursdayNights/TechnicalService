let globalState = {
  username: "",
  password: "",
  type: "",
};

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  globalState.username = username;
  globalState.password = password;

  let clients = ["BIC", "ADV", "Pharma-Pack", "Bowler"];
  let service = ["Lourens", "Andries", "Craig", "Gus"];

  //   set type to client or service based on the username
  if (clients.includes(username)) {
    globalState.type = "client";
  } else if (service.includes(username)) {
    globalState.type = "service";
  } else {
    globalState.type = "invalid";
  }

  alert(globalState.type);
}

function handleButtonNavigation(href) {
  // navigate to href specified
  // e.g. "approve-works-order" navigates to href="#approve-works-order"
  window.location.href = `#${href}`;
}
