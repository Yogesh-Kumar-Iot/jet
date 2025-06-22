document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (toggleButton && navLinks) {
    toggleButton.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }
});
