// DATABASE PROXY
var cases = [
  {
    requestid: 1,
    company: "BritsPlas",
    servicetype: "Repair",
    technician: "Victor",
    equipment: "Arburg",
    serialnumber: "123456",
    description: "This is the first work order",
    status: "Request",
    created: "2024-10-02",
    date: "2024-10-10",
    time: "10:00",
    parts: [
      { partid: 1, parts: "This is a list of parts", partdate: "2024-10-02" },
    ],
  },
];
var messages = [
  {
    id: 1,
    requestid: 1,
    company: "BritsPlas",
    owner: "Lourens",
    message: "This is the first note",
    date: "2024-10-02",
  },
  {
    id: 2,
    requestid: 1,
    company: "BritsPlas",
    owner: "Juanita",
    message: "This is the second note",
    date: "2024-10-04",
  },
];

var labour = [
  {
    labourid: 1,
    technician: "Lourens",
    labourdetial: "Text Description",
    hourtype: "Service",
    labourhours: "3",
  },
  {
    labourid: 2,
    technician: "Gus",
    labourdetial: "Another Text Description",
    hourtype: "Travel",
    labourhours: "1",
  },
];

// Duplicate definition removed
var users = [
  { username: "vicus", password: "123", type: "client", company: "BritsPlas" },
  { username: "joe", password: "123", type: "client", company: "JoePlas" },
  { username: "juanita", password: "123", type: "service", company: "Hestico" },
  { username: "lourens", password: "123", type: "service", company: "Hestico" },
];
var global = {
  user: "",
  type: "",
  requestid: "",
  company: "",
};

// ON LOAD
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".container.mt-5.content");
  elements.forEach(function (element) {
    element.style.display = "none";
  });
  scrollToElement("login");
  populatedropdowns();
  updatenavbar("loggedout");
});

// BUTTON HANDLERS

function handlebuttonlogin(event) {
  event.preventDefault();
  var data = new FormData(event.target.form);
  var username = data.get("username");
  var password = data.get("password");
  var company = users.find((user) => user.username === username).company;

  var { userverified, passwordverified, type } = checklogin(username, password);
  if (userverified && passwordverified) {
    updateglobal({ user: username, type: type, company: company });

    updatenavbar("loggedin");
    showbuttons(type);
    loadmessagehistory();
    loadworkhistory();

    if (type === "client") {
      scrollToElement("client-landing");
    } else if (type === "service") {
      scrollToElement("work-history");
    }
  }
  if (!userverified) {
    alert("User not found");
  }
  if (!passwordverified) {
    alert("Password incorrect");
  }
}

function handlebuttonupdatepassword(event) {
  event.preventDefault();
  // update password
  // navigate
}

function handlebuttonresetpassword(event) {
  event.preventDefault();
  scrollToElement("reset-password");
}

function handlebuttonresetpasswordreset(event) {
  event.preventDefault();
  alert("Functionality Under Construction");
  scrollToElement("login");
}

function handlebuttonregister(event) {
  event.preventDefault();
  scrollToElement("register");
}

function handlebuttonregisterregister(event) {
  event.preventDefault();
  alert("Functionality Under Construction");
  scrollToElement("login");
}

function handlebuttonlogout(event) {
  event.preventDefault();
  updateglobal({ user: "", type: "", company: "" });
  updatenavbar("loggedout");
  scrollToElement("login");
  // reload html page
  location.reload();
}

function handlebuttoncancelogout(event) {
  event.preventDefault();
  loadworkhistory();
  scrollToElement("work-history");
}

function handlebuttonnewrequest(event) {
  event.preventDefault();
  createnewrequest();
  loadnewrequest();

  loadmessagehistoryrequest(global.requestid);
  scrollToElement("new-request");
}

function handlebuttonsubmitnewrequest(event) {
  event.preventDefault();
  submitnewrequest();
  loadworkhistory();
  scrollToElement("work-history");
}

function handlebuttonexistingrequests(event) {
  loadworkhistory();
  scrollToElement("work-history");
}

function handlebuttonviewmessages(event) {
  // loadmessagehistory();
  scrollToElement("all-messages");
}

function handlebuttonrequeststatus(event) {
  // loadrequest()
  // navigate
}

function handlebuttonapproverequest(event) {
  // approverequest()
  // navigate
}

function handlebuttoneditrequest(event) {
  // editrequest()
  // navigate
}

function handlebuttoncancelnewrequest(event) {
  scrollToElement("work-history");
}

function handlebuttonaddlabour(event) {
  // addlabour()
  // navigate
}

function handlebuttoneditlabour(event) {
  event.preventDefault();
  // editlabour()
  // navigate
}

function handlebuttonaddparts(event) {
  event.preventDefault();
  // addparts()
  // navigate
}

function handlebuttoneditparts(event) {
  event.preventDefault();
  // editparts()
  // navigate
}

function handlebuttonaddnotes(event) {
  event.preventDefault();
  // addnotes()
  // navigate
}

function handlebuttoneditnotes(event) {
  event.preventDefault();
  // editnotes()
  // navigate
}

// EVENT HANDLERS
function handleNavClick(id) {
  // for the id, find the href atribute
  var href = document.getElementById(id).getAttribute("href");
  // remove the leading # from the href this is the element we want to scroll to
  var target = href.substring(1);
  scrollToElement(target);
  // Collapse the navbar in mobile view
  var navbarCollapse = document.getElementById("navbarNav");
  if (navbarCollapse.classList.contains("show")) {
    navbarCollapse.classList.remove("show");
  }
}

function scrollToElement(target) {
  // navigate to the element with the id passed in the function
  // extend with to , from, id
  //  add "-screen" to the target
  target = target + "-screen";
  // find all elements with class="container mt-5 content" and hide them
  var elements = document.querySelectorAll(".container.mt-5.content");
  elements.forEach(function (element) {
    element.style.display = "none";
  });

  // unhide the id passed in the function
  var targetElement = document.getElementById(target);
  if (targetElement) {
    targetElement.style.display = "block";
    console.log(`Element with ID ${target} is now visible.`);
  } else {
    console.error(`Element with ID ${target} not found.`);
  }
}

function populatedropdowns() {
  // populate dropdowns
  var equipment = getdropdown("equipment");
  var editEquipment = document.getElementById("edit-equipment");
  var newEquipment = document.getElementById("new-equipment");
  equipment.forEach(function (equipment) {
    var option = document.createElement("option");
    option.text = equipment;
    editEquipment.add(option);
    var option = document.createElement("option");
    option.text = equipment;
    newEquipment.add(option);
  });

  var technician = getdropdown("technician");
  var editTechnician = document.getElementById("edit-technician");
  var newTechnician = document.getElementById("new-technician");
  var addlabourTechnician = document.getElementById("add-labour-technician");
  var editlabourTechnician = document.getElementById("edit-labour-technician");
  technician.forEach(function (technician) {
    var option = document.createElement("option");
    option.text = technician;
    editTechnician.add(option);
    var option = document.createElement("option");
    option.text = technician;
    newTechnician.add(option);
    var option = document.createElement("option");
    option.text = technician;
    addlabourTechnician.add(option);
    var option = document.createElement("option");
    option.text = technician;
    editlabourTechnician.add(option);
  });

  var servicetype = getdropdown("servicetype");
  var editServicetype = document.getElementById("edit-service-type");
  var newServicetype = document.getElementById("new-service-type");
  servicetype.forEach(function (servicetype) {
    var option = document.createElement("option");
    option.text = servicetype;
    editServicetype.add(option);
    var option = document.createElement("option");
    option.text = servicetype;
    newServicetype.add(option);
  });

  var hourstype = getdropdown("hourstype");
  var addlabourHourtype = document.getElementById("add-labour-hour-type");
  var editlabourHourtype = document.getElementById("edit-labour-hour-type");
  hourstype.forEach(function (hourstype) {
    var option = document.createElement("option");
    option.text = hourstype;
    addlabourHourtype.add(option);
    var option = document.createElement("option");
    option.text = hourstype;
    editlabourHourtype.add(option);
  });
}

function updateglobal({
  user = "",
  type = "",
  requestid = "",
  company = "",
} = {}) {
  if (user !== "") {
    global.user = user;
  }
  if (type !== "") {
    global.type = type;
  }
  if (requestid !== "") {
    global.requestid = requestid;
  }
  if (company !== "") {
    global.company = company;
  }
}

function update(element, display) {
  var element = document.getElementById(element);
  if (element) {
    element.style.display = display;
  } else {
    console.error(`Element with ID ${element} not found.`);
  }
}

function updatenavbar(status) {
  if (status === "loggedout") {
    update("new-request-nav", "none");
    update("work-history-nav", "none");
    update("messages-nav", "none");
    update("log-out-nav", "none");
    update("login-nav", "block");
  }
  if (status === "loggedin") {
    update("new-request-nav", "block");
    update("work-history-nav", "block");
    update("messages-nav", "block");
    update("log-out-nav", "block");
    update("login-nav", "none");
  }
}

function showbuttons(type) {
  if (type === "client") {
    document.getElementById("edit-request-button").style.display = "none";
    document.getElementById("add-labour-button").style.display = "none";
    document.getElementById("add-parts-button").style.display = "none";
  }
  if (type === "service") {
    document.getElementById("edit-request-button").style.display = "block";
    document.getElementById("add-labour-button").style.display = "block";
    document.getElementById("add-parts-button").style.display = "block";
  }
}

// DATA HELPER FUNCTIONS
function getdropdown(type) {
  if (type === "technician") {
    // return username from users where type is service
    return users
      .filter((user) => user.type === "service")
      .map((user) => user.username);
  }
  if (type === "equipment") {
    return [
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
  }
  if (type === "servicetype") {
    return [
      "Service",
      "Repair",
      "Installation",
      "Training",
      "Consultation",
      "Zero rated",
      "Other",
    ];
  }

  if (type === "hourstype") {
    return ["Waranty", "Travel", "Standard", "After-Hours", "Other"];
  }
}

function checklogin(username, password) {
  // check login credentials against users in users.js
  var userverified = false;
  var passwordverified = false;
  var type = null;

  // Check if user exists
  var user = users.find((user) => user.username === username);
  if (user) {
    userverified = true;
    type = user.type;
    // Check password
    if (user.password === password) {
      passwordverified = true;
    }
  }

  return { userverified, passwordverified, type };
}

function sendmessage(data) {
  // send message -- WhatsApp for business API integration
}

function loadmessagehistory() {
  var tablebody = document.getElementById("messages-table-body");
  // delete all rows in tablebody
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }

  var table = document.getElementById("messages-table");
  var loadmessages = [];
  console.log("company cases : " + global.company);
  if (global.company === "Hestico") {
    loadmessages = messages;
  } else {
    loadmessages = messages.filter(
      (message) => message.company === global.company
    );
  }
  console.log("messages loaded");
  console.log(loadmessages);
  loadmessages.forEach(function (message) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = message.id;
    cell2.innerHTML = message.owner;
    cell3.innerHTML = message.message;
    cell4.innerHTML = message.date;
  });
}

function loadmessagehistoryrequest(id) {
  console.log("loadmessagehistoryrequest");
  console.log(id);
  var tablebody = document.getElementById("view-messages-table-body");
  // delete all rows in tablebody
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }

  var table = document.getElementById("view-messages-table");
  var loadmessages = [];

  loadmessages = messages.filter((message) => message.requestid === id);
  console.log("messages loaded");
  console.log(loadmessages);

  console.log("messages loaded");
  console.log(loadmessages);
  loadmessages.forEach(function (message) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = message.id;
    cell2.innerHTML = message.owner;
    cell3.innerHTML = message.message;
    cell4.innerHTML = message.date;
  });
}

function loadlabourhistoryrequest(id) {
  var tablebody = document.getElementById("view-messages-table-body"); // VB
  // delete all rows in tablebody
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }

  var table = document.getElementById("view-messages-table");
  var loadmessages = [];

  loadmessages = messages.filter((message) => message.requestid === id);
  console.log("messages loaded");
  console.log(loadmessages);

  console.log("messages loaded");
  console.log(loadmessages);
  loadmessages.forEach(function (message) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = message.id;
    cell2.innerHTML = message.owner;
    cell3.innerHTML = message.message;
    cell4.innerHTML = message.date;
  });
}

function loadrequest() {
  // load request
}

function approverequest() {
  // approve request
}

function editrequest() {
  // edit request
}

function cancelrequest() {
  // cancel request
}

function addlabour() {
  // add labour
}

function editlabour() {
  // edit labour
}

function addparts() {
  // add parts
}

function editparts() {
  // edit parts
}

function addnotes() {
  // add notes
}

function editnotes() {
  // edit notes
}

function createnewrequest() {
  var newrequestid = Math.max(...cases.map((request) => request.requestid)) + 1;
  var newrequest = {
    requestid: newrequestid,
    company: global.company,
    servicetype: "Repair",
    technician: "",
    equipment: "",
    serialnumber: "",
    description: "",
    status: "Request",
    created: new Date().toISOString().split("T")[0],
    servicecall: {
      date: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      time: "10:00",
    },
    notes: [],
    parts: [],
    labour: [],
  };
  cases.push(newrequest);
  console.log("cases: createnewrequest");
  console.log(cases);
  updateglobal({ requestid: newrequestid });
}

function loadnewrequest() {
  // populate fields in new-request with value from cases where requestid = global.requestid
  var request = cases.find((request) => request.requestid === global.requestid);
  if (request) {
    document.getElementById("new-request-number").value = request.requestid;
    document.getElementById("new-service-type").value = request.servicetype;
    document.getElementById("new-technician").value = request.technician;
    document.getElementById("new-equipment").value = request.equipment;
    document.getElementById("new-serial-number").value = request.serialnumber;
    document.getElementById("new-problem-description").value =
      request.description;
    document.getElementById("new-date").value = request.servicecall.date;
    document.getElementById("new-time").value = request.servicecall.time;
  } else {
    console.error(`Request with ID ${global.requestid} not found.`);
  }

  console.log("cases: loadnewrequest");
  console.log(cases);
}

function submitnewrequest() {
  // use data from id="new-request-screen" to update cases where requestid = global.requestid
  var request = cases.find((request) => request.requestid === global.requestid);
  request.requestid = document.getElementById("new-request-number").value;
  request.servicetype = document.getElementById("new-service-type").value;
  request.technician = document.getElementById("new-technician").value;
  request.equipment = document.getElementById("new-equipment").value;
  request.serialnumber = document.getElementById("new-serial-number").value;
  request.description = document.getElementById(
    "new-problem-description"
  ).value;
  request.date = document.getElementById("new-date").value;
  request.time = document.getElementById("new-time").value;

  console.log("cases: submitnewrequest");
  console.log(cases);
}

function loadworkhistory() {
  // load work history into works-history-table
  // add a click event to the button
  // when the button is clicked, updateglobal({requestid: request.requestid})
  // scrollToElement("view-request")
  cleanupworkhistory();
  var tablebody = document.getElementById("work-history-table-body");
  // delete all rows in tablebody
  while (tablebody.firstChild) {
    tablebody.removeChild(tablebody.firstChild);
  }

  var table = document.getElementById("work-history-table");
  // if company = hestico loadcasescases = cases
  // else loadcases = cases where global.company = company
  console.log("company cases : " + global.company);
  if (global.company === "Hestico") {
    loadcases = cases;
  } else {
    loadcases = cases.filter((request) => request.company === global.company);
  }

  loadcases.forEach(function (request) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = request.requestid;
    cell2.innerHTML = request.date;

    var statusButton = document.createElement("button");
    statusButton.innerHTML = request.status;
    statusButton.className = "btn btn-link";
    statusButton.addEventListener("click", function () {
      updateglobal({ requestid: request.requestid });
      viewrequest();
      scrollToElement("view-request");
    });
    cell3.appendChild(statusButton);
  });
}

function cleanupworkhistory() {
  // delete all objects in cases date is not there
  cases = cases.filter((request) => request.date);
}

function viewrequest() {
  loadmessagehistoryrequest(global.requestid);
  // loadlabourhistoryrequest(global.requestid);
  // loadpartshistoryrequest(global.requestid);
  var request = cases.find((request) => request.requestid === global.requestid);
  if (request) {
    document.getElementById("view-request-number").value = request.requestid;
    document.getElementById("view-service-type").value = request.servicetype;
    document.getElementById("view-technician").value = request.technician;
    document.getElementById("view-equipment").value = request.equipment;
    document.getElementById("view-serial-number").value = request.serialnumber;
    document.getElementById("view-problem-description").value =
      request.description;
  } else {
    console.error(`Request with ID ${global.requestid} not found.`);
  }
}
