const toggleOpen = document.getElementById('toggleOpen');
const toggleClose = document.getElementById('toggleClose');
const collapseMenu = document.getElementById('collapseMenu');

toggleOpen.addEventListener('click', () => {
  collapseMenu.classList.add('active');
});

toggleClose.addEventListener('click', () => {
  collapseMenu.classList.remove('active');
});

