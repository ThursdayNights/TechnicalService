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
