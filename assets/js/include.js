document.addEventListener("DOMContentLoaded", function () {
  includeHTML();
});

function includeHTML() {
  const elements = document.querySelectorAll("[include-html]");
  elements.forEach(el => {
    const file = el.getAttribute("include-html");
    if (file) {
      fetch(file)
        .then(response => {
          if (response.ok) return response.text();
          throw new Error("Page not found");
        })
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute("include-html");

          // Re-run scripts inside included file
          const scripts = el.querySelectorAll("script");
          scripts.forEach(oldScript => {
            const newScript = document.createElement("script");
            newScript.textContent = oldScript.textContent;
            oldScript.replaceWith(newScript);
          });

          // Recursively include any new includes inside loaded content
          includeHTML();
        })
        .catch(err => {
          el.innerHTML = "Content not found.";
          console.error(err);
        });
    }
  });
}