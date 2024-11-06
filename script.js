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
function handlebuttonlogin(data) {
  alert(data);
  // check user name and password
  // set type of user
  // navigate
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
