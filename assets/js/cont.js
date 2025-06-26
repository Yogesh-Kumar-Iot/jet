<script>
  // Open modal on any .cad-service-box click
  document.querySelectorAll('.cad-service-box').forEach(box => {
    box.addEventListener('click', () => {
      document.getElementById('contactModal').style.display = 'block';
    });
  });

  // Close modal on close button click
  document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('contactModal').style.display = 'none';
  });

  // Close modal when clicking outside the modal
  window.addEventListener('click', (e) => {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
</script>
