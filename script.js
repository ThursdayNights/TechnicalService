let globalState = {
  username: "",
  password: "",
  type: "",
  currentstate: "login",
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

function goToSection(href) {
  window.location.href = `#${href}`;
  globalState.currentstate = href;
}

function handleNavigation(href) {
  // Client handler
  if (globalState.type === "client") {
    if (href === "login") {
      goToSection("client-landing");
      return;
    } else {
      goToSection("login");
    }
  }
  // Service handler
  if (globalState.type === "service") {
    if (href === "login") {
      goToSection("view-requests");
      return;
    } else {
      goToSection("login");
    }

    // Default handler
    goToSection("login");
  }
}
