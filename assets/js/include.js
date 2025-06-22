function includeHTML(callback) {
  var elements = document.querySelectorAll("[include-html]");
  var count = elements.length;

  elements.forEach(function(elm) {
    var file = elm.getAttribute("include-html");
    if (file) {
      fetch(file)
        .then(response => {
          if (response.ok) return response.text();
          throw new Error('Page not found.');
        })
        .then(data => {
          elm.innerHTML = data;
          elm.removeAttribute("include-html");
          count--;
          if (count === 0 && typeof callback === "function") callback();
        })
        .catch(() => {
          elm.innerHTML = "Component not found.";
          count--;
          if (count === 0 && typeof callback === "function") callback();
        });
    }
  });
}

// ✅ Call the function and only then load other scripts
includeHTML(function () {
  // Now run toggle script safely
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("navLinks");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }
});
