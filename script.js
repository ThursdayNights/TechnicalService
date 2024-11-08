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
    servicecall: { date: "2024-10-10", time: "10:00" },
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
var worksorders = [
  {
    id: 1,
    client: "BIC",
    servicetype: "Repair",
    equipment: "Arburg",
    technician: "Victor",
    description: "This is the first work order",
    status: "Works Order",
    created: "2024-10-02",
    servicecall: { date: "2024-10-10", time: "10:00" },
    worksordernumber: "WO-001",
    worksorderdetails: [
      {
        Item: "Parts",
        Qoute: "QouteBarrel.pdf",
        price: "R6300",
        status: "Pending",
        date: "2024-10-11",
      },
      {
        Item: "Labour",
        technicians: "Victor",
        hours: "4",
        rate: "500",
        price: "R2000",
        status: "Accepted",
        date: "2024-10-12",
      },
      {
        Item: "Labour",
        technicians: "Lourens",
        hours: "6",
        rate: "500",
        price: "R3000",
        status: "Accepted",
        date: "2024-10-11",
      },
    ],
  },
  {
    id: 2,
    client: "Pharma-Pack",
    servicetype: "Repair",
    equipment: "Macquire",
    technician: "Gus",
    description: "Dryer not drying",
    status: "Service Call",
    created: "2024-10-03",
    servicecall: { date: "2024-10-15", time: "14:00" },
    worksordernumber: "WO-002",
    worksorderdetails: [],
  },
  {
    id: 3,
    client: "BIC",
    servicetype: "Repair",
    equipment: "Arburg",
    technician: "Lourens",
    description: "Straws paper like",
    status: "Please Approve",
    created: "2024-10-04",
    servicecall: { date: "2024-10-11", time: "09:00" },
    worksordernumber: "WO-003",
    worksorderdetails: [
      {
        Item: "Parts",
        Qoute: "parts.pdf",
        price: "R15000",
        status: "Accepted",
        date: "2024-10-11",
      },
      {
        Item: "Labour",
        technicians: "Gus",
        hours: "10",
        rate: "650",
        price: "R6500",
        status: "Accepted",
        date: "2024-10-12",
      },
    ],
  },
];
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
    servicecall: { date: "2024-10-10", time: "10:00" },
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
var users = [
  { username: "vicus", password: "123", type: "client" },
  { username: "juanita", password: "123", type: "service" },
];

// SCRIPT
document.addEventListener("DOMContentLoaded", function () {
  var elements = document.querySelectorAll(".container.mt-5.content");
  elements.forEach(function (element) {
    element.style.display = "none";
  });
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
// navigate to the element with the id passed in the function
// extend with to , from, id
function scrollToElement(target) {
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
  var { userverified, passwordverified, type } = checklogin(username, password);
  alert(userverified + " " + passwordverified + " " + type);
}

function handlebuttonupdatepassword(data) {
  alert(data);
  // update password
  // navigate
}

function handlebuttonresetpassword(data) {
  alert(data);
  // reset password
  // sendmessage(data)
  // navigate
}

function handlebuttonregister(data) {
  alert(data);
  // some process to be defined
  // sendmessage(data)
}

function handlebuttonlogout(data) {
  alert(data);
  // log out code
  // navigate
}

function handlebuttonnewrequest(data) {
  alert(data);
  // createid
  // createcase
  // navigate
}

function handlebuttonexistingrequests(data) {
  alert(data);
  // loadrequesthistory()
  // navigate
}

function handlebuttonviewmessages(data) {
  alert(data);
  // loadmessagehistory()
  // navigate
}

function handlebuttonrequeststatus(data) {
  alert(data);
  // loadrequest()
  // navigate
}

function handlebuttonapproverequest(data) {
  alert(data);
  // approverequest()
  // navigate
}

function handlebuttoneditrequest(data) {
  alert(data);
  // editrequest()
  // navigate
}

function handlebuttoncancelrequest(data) {
  alert(data);
  // cancelrequest()
  // navigate
}

function handlebuttonaddlabour(data) {
  alert(data);
  // addlabour()
  // navigate
}

function handlebuttoneditlabour(data) {
  alert(data);
  // editlabour()
  // navigate
}

function handlebuttonaddparts(data) {
  alert(data);
  // addparts()
  // navigate
}

function handlebuttoneditparts(data) {
  alert(data);
  // editparts()
  // navigate
}

function handlebuttonaddnotes(data) {
  alert(data);
  // addnotes()
  // navigate
}

function handlebuttoneditnotes(data) {
  alert(data);
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
    // Check password
    if (user.password === password) {
      userverified = true;
      passwordverified = true;
      type = user.type;
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
