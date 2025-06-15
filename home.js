const toggleBtn = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
