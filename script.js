let globalState = {
  username: "",
  password: "",
  type: "",
  currentstate: "login",
  client: "",
  service: "",
  id: 0,
  status: "",
};
let clients = ["BIC", "ADV", "Pharma-Pack", "Bowler"];
let service = ["Lourens", "Andries", "Craig", "Gus", "Victor"];

function handleLogin(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  globalState.username = username;
  globalState.password = password;
  globalState.client = username;

  //   set type to client or service based on the username
  if (clients.includes(username)) {
    globalState.type = "client";
  } else if (service.includes(username)) {
    globalState.type = "service";
  } else {
    globalState.type = "invalid";
  }

  console.log(globalState.type);
}

function handleNewRequest(event) {
  event.preventDefault();
  // create a new record in the works order array worksorders
  // let worksorders = JSON.parse(localStorage.getItem("worksorders")) || [];
  let id =
    worksorders.length > 0
      ? Math.max(...worksorders.map((wo) => wo.id)) + 1
      : 1;
  let newWorkOrder = {
    id: id,
    client: globalState.client,
    servicetype: document.getElementById("service-type-new-request").value,
    equipment: document.getElementById("equipment-new-request").value,
    technician: document.getElementById("technician-new-request").value,
    description: document.getElementById("wo-description-new-request").value,
    status: "Service Requested",
    created: new Date().toISOString().split("T")[0],
    servicecall: {
      date: document.getElementById("date-new-request").value,
      time: document.getElementById("time-new-request").value,
    },
    worksordernumber: "WO-00" + id,
    worksorderdetails: [],
  };
  worksorders.push(newWorkOrder);
  localStorage.setItem("worksorders", JSON.stringify(worksorders));
  console.log("New work order created:", newWorkOrder);
  console.log(worksorders);
}

function goToSection(href) {
  window.location.href = `#${href}`;
  globalState.currentstate = href;
  console.log(globalState.currentstate);
  console.log("-------------------");
}

function handleNavigation(href) {
  console.log(href);
  console.log("to");
  // Client handler
  if (globalState.type === "client") {
    if (href === "login") {
      goToSection("client-landing");
      return;
    }
    if (href === "client-landing-new-request") {
      goToSection("new-request");
      return;
    }
    if (href === "client-landing-existing-request") {
      getRequestHistory();
      goToSection("view-requests");
      return;
    }
    if (href === "view-requests-new-request") {
      goToSection("new-request");
      return;
    }
    if (href === "new-request") {
      getRequestHistory();
      goToSection("view-requests");
      return;
    }
    if (href === "works-history-table") {
      goToSection("view-request");
      return;
    }
  }

  // Service handler
  if (globalState.type === "service") {
    if (href === "login") {
      goToSection("view-requests");
      return;
    }
  }

  // Default handler
  goToSection("login");
}

function getRequestHistory() {
  const table = document.getElementById("works-history-table");
  //  clear table before loading new data
  table.innerHTML = "";
  // create new array of worksorders, only include where workOrder.client == globalState.client and sort by created date descending
  let filteredWorkOrders = worksorders
    .filter((workOrder) => workOrder.client === globalState.client)
    .sort((a, b) => new Date(b.created) - new Date(a.created));
  console.log(filteredWorkOrders);
  // Loop through the array of work orders
  filteredWorkOrders.forEach((workOrder) => {
    // if the work order is not for the current client, skip it
    // Create a new row
    const row = table.insertRow();
    // Create and populate cells
    const worksOrderNumber = row.insertCell(0);
    worksOrderNumber.textContent = workOrder.worksordernumber;
    const cellCreated = row.insertCell(1);
    cellCreated.textContent = workOrder.created;
    // make status a button and display the works order details
    // standard button style and width

    const cellStatus = row.insertCell(2);
    const statusButton = document.createElement("button");
    // class="btn btn-dark"
    statusButton.classList.add("btn", "btn-dark", "w-100");
    statusButton.textContent = workOrder.status;
    statusButton.onclick = function () {
      // navigate to div id="works-order"
      onclick = "handleNavigation('view-request')";
      // call loadWorksOrderDetails(workOrder)
      loadWorksOrderDetails(workOrder.id, "works-history-table");
    };
    cellStatus.appendChild(statusButton);
  });
}

function populateDropowns() {
  var equipment = [
    "Arburg",
    "Engel",
    "Haitian",
    "Husky",
    "Krauss Maffei",
    "Negri Bossi",
    "Netstal",
    "Sumitomo",
    "Toshiba",
    "Van Dorn",
  ];

  var serviceTypes = [
    "Service",
    "Repair",
    "Installation",
    "Training",
    "Consultation",
    "Other",
  ];

  var wostatus = [
    "Service Requested",
    "Service Booked",
    "Please Approve",
    "Works Order Approved",
    "Qoute",
    "Cancelled",
  ];

  var serviceTypeDropdown = document.getElementById("service-type-new-request");
  var technicianDropdown = document.getElementById("technician-new-request");
  var equipmentDropdown = document.getElementById("equipment-new-request");
  var serviceTypeUpdateDropdown = document.getElementById(
    "service-type-update-request"
  );
  // technician-update-request
  var technicianUpdateDropdown = document.getElementById(
    "technician-update-request"
  );
  // equipment-update-request
  var equipmentUpdateDropdown = document.getElementById(
    "equipment-update-request"
  );

  serviceTypes.forEach((type) => {
    var option = document.createElement("option");
    option.text = type;
    serviceTypeDropdown.add(option);
    serviceTypeUpdateDropdown.add(option);
  });

  service.forEach((tech) => {
    var option = document.createElement("option");
    option.text = tech;
    technicianDropdown.add(option);
    technicianUpdateDropdown.add(option);
  });

  equipment.forEach((equip) => {
    var option = document.createElement("option");
    option.text = equip;
    equipmentDropdown.add(option);
    equipmentUpdateDropdown.add(option);
  });
}

function loadWorksOrderDetails(id, href) {
  globalState.id = id;

  let workOrder = worksorders.find((wo) => wo.id === id);
  globalState.status = workOrder.status;
  // manage button visibility based on status
  manageButtons();

  alert("Loading works order details for " + workOrder.worksordernumber);

  // // service-number
  document.getElementById("service-number").value = workOrder.worksordernumber;
  // service-type-view-request
  document.getElementById("service-type-view-request").value =
    workOrder.servicetype;
  // technician-view-request
  document.getElementById("technician-view-request").value =
    workOrder.technician;
  // equipment-view-request
  document.getElementById("equipment-view-request").value = workOrder.equipment;
  // wo-description-view-request
  document.getElementById("wo-description-view-request").value =
    workOrder.description;

  console.log(workOrder);
  handleNavigation(href);

  function manageButtons() {
    // hide div id="cancel-service" , except when status is "Service Requested"
    if (workOrder.status === "Service Requested") {
      document.getElementById("cancel-service").style.display = "block";
    } else {
      document.getElementById("cancel-service").style.display = "none";
    }

    // hide div id="approve-service" , except when status is "Please Approve"
    if (workOrder.status === "Please Approve") {
      document.getElementById("approve-service").style.display = "block";
    } else {
      document.getElementById("approve-service").style.display = "none";
    }
  }
}

function handleCancelServiceRequest() {
  id = globalState.id;
  alert("Service Request Cancelled Process... #todo");
  updateStatus(id, "Cancelled");
  goToSection("view-requests");
}

function updateStatus(id, status) {
  let workOrder = worksorders.find((wo) => wo.id === id);
  workOrder.status = status;

  // update worksorders in local storage
  localStorage.setItem("worksorders", JSON.stringify(worksorders));
  getRequestHistory();

  // navigate to view-requests
  goToSection("view-requests");
}

function handleUpdateRequest() {
  alert(globalState.id);
  loadUpdateRequest();
  goToSection("update-request");
}

function handleUpdate() {
  let id = globalState.id;
  let workOrder = worksorders.find((wo) => wo.id === id);
  workOrder.servicetype = document.getElementById(
    "service-type-update-request"
  ).value;
  workOrder.technician = document.getElementById(
    "technician-update-request"
  ).value;
  workOrder.equipment = document.getElementById(
    "equipment-update-request"
  ).value;
  workOrder.description = document.getElementById(
    "wo-description-update-request"
  ).value;
  workOrder.servicecall.date = document.getElementById(
    "date-update-request"
  ).value;
  workOrder.servicecall.time = document.getElementById(
    "time-update-request"
  ).value;
  localStorage.setItem("worksorders", JSON.stringify(worksorders));
  getRequestHistory();
  goToSection("view-requests");
}

function loadUpdateRequest() {
  let workOrder = worksorders.find((wo) => wo.id === globalState.id);
  console.log(workOrder.technician);
  document.getElementById("wo-number").value = workOrder.worksordernumber;

  // default value of service-type-update-request  with workOrder.servicetype
  document.getElementById("service-type-update-request").value =
    workOrder.servicetype;
  document.getElementById("technician-update-request").value =
    workOrder.technician;
  document.getElementById("equipment-update-request").value =
    workOrder.equipment;
  document.getElementById("wo-description-update-request").value =
    workOrder.description;
  document.getElementById("date-update-request").value =
    workOrder.servicecall.date;
  document.getElementById("time-update-request").value =
    workOrder.servicecall.time;
}

// run function populateDropowns() when the page loads
window.onload = populateDropowns;
