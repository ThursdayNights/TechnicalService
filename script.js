// DATABASE PROXY
var cases = [
  {
    requestid: 1,
    servicetype: "Repair",
    technician: "Victor",
    equipment: "Arburg",
    serialnumber: "123456",
    description: "This is the first work order",
    status: "Request",
    created: "2024-10-02",
    date: "2024-10-10",
    time: "10:00",
    notes: [
      {
        noteid: 1,
        noteowner: "Lourens",
        note: "This is the first note",
        notedate: "2024-10-02",
      },
    ],
    parts: [
      { partid: 1, parts: "This is a list of parts", partdate: "2024-10-02" },
    ],
    labour: [
      {
        labourid: 1,
        technician: "Lourens",
        labourdetial: "Text Description",
        hourtype: "",
        labourhours: "",
      },
    ],
  },
];
// Duplicate definition removed
var users = [
  { username: "vicus", password: "123", type: "client", company: "BritsPlas" },
  { username: "juanita", password: "123", type: "service", company: "Hestico" },
  { username: "lourens", password: "123", type: "service", company: "Hestico" },
];
var global = {
  user: "",
  type: "",
  requestid: "",
  company: "",
};

// SCRIPT
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".container.mt-5.content");
  elements.forEach(function (element) {
    element.style.display = "none";
  });
  scrollToElement("login");
  populatedropdowns();
});

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

// BUTTON FUNCTIONS
function handlebuttonlogin(event) {
  event.preventDefault();
  var data = new FormData(event.target.form);
  var username = data.get("username");
  var password = data.get("password");
  var company = users.find((user) => user.username === username).company;

  var { userverified, passwordverified, type } = checklogin(username, password);
  if (userverified && passwordverified) {
    updateglobal({ user: username, type: type, company: company });
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
  // log out code
  // navigate
}

function handlebuttonnewrequest(event) {
  event.preventDefault();
  createnewrequest();
  loadnewrequest();
  scrollToElement("new-request");
}

function handlebuttonsubmitnewrequest(event) {
  event.preventDefault();
  submitnewrequest();
  loadworkhistory();
  scrollToElement("work-history");
}

function handlebuttonexistingrequests(event) {
  alert(data);
  // loadrequesthistory()
  // navigate
}

function handlebuttonviewmessages(event) {
  alert(data);
  // loadmessagehistory()
  // navigate
}

function handlebuttonrequeststatus(event) {
  alert(data);
  // loadrequest()
  // navigate
}

function handlebuttonapproverequest(event) {
  alert(data);
  // approverequest()
  // navigate
}

function handlebuttoneditrequest(event) {
  alert(data);
  // editrequest()
  // navigate
}

function handlebuttoncancelrequest(event) {
  alert(data);
  // cancelrequest()
  // navigate
}

function handlebuttonaddlabour(event) {
  alert(data);
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

// HELPER FUNCTIONS
// Assuming users is an array of user objects defined somewhere in your code

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
  alert(data);
  // send message -- WhatsApp for business API integration
}

function loadrequesthistory() {
  // load work history
}

function loadmessagehistory() {
  // load message history
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
  console.log("Company: " + global.company);
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
  var table = document.getElementById("work-history-table");
  if (!table) {
    console.error("Element with ID 'work-history-table' not found.");
    return;
  }
  cases.forEach(function (request) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = request.requestid;
    cell2.innerHTML = request.date;
    cell3.innerHTML = request.status;
  });
}

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

function populatedropdowns() {
  // populate dropdowns
  var equipment = getdropdown("equipment");
  var viewEquipment = document.getElementById("view-equipment");
  var editEquipment = document.getElementById("edit-equipment");
  var newEquipment = document.getElementById("new-equipment");
  equipment.forEach(function (equipment) {
    var option = document.createElement("option");
    option.text = equipment;
    viewEquipment.add(option);
    var option = document.createElement("option");
    option.text = equipment;
    editEquipment.add(option);
    var option = document.createElement("option");
    option.text = equipment;
    newEquipment.add(option);
  });

  var technician = getdropdown("technician");
  var viewTechnician = document.getElementById("view-technician");
  var editTechnician = document.getElementById("edit-technician");
  var newTechnician = document.getElementById("new-technician");
  var addlabourTechnician = document.getElementById("add-labour-technician");
  var editlabourTechnician = document.getElementById("edit-labour-technician");
  technician.forEach(function (technician) {
    var option = document.createElement("option");
    option.text = technician;
    viewTechnician.add(option);
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
  var viewServicetype = document.getElementById("view-service-type");
  var editServicetype = document.getElementById("edit-service-type");
  var newServicetype = document.getElementById("new-service-type");
  servicetype.forEach(function (servicetype) {
    var option = document.createElement("option");
    option.text = servicetype;
    viewServicetype.add(option);
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

function updateglobal({ user = "", type = "", requestid = "" } = {}) {
  if (user !== "") {
    global.user = user;
  }
  if (type !== "") {
    global.type = type;
  }
  if (requestid !== "") {
    global.requestid = requestid;
  }
}
