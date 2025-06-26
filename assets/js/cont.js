// === cont.js ===
document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById('contactModal');
  const closeBtn = document.querySelector('.close-button');
  const form = document.getElementById('popupContactForm');

  // ✅ Firebase Config
  const firebaseConfig = {
    apiKey: "AIzaSyDk9ZmhrCXXbQzBXgvHP4k7LYNGH7efT2k",
    authDomain: "jetdata-bc3be.firebaseapp.com",
    databaseURL: "https://jetdata-bc3be-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jetdata-bc3be",
    storageBucket: "jetdata-bc3be.appspot.com",
    messagingSenderId: "505978811729",
    appId: "1:505978811729:web:c5882b170e5959ecd60f70"
  };

  // ✅ Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  const storage = firebase.storage();

  // ✅ Open modal when clicking on relevant boxes
  document.querySelectorAll('.cad-service-box:not(.other-services-box), .component-card')
    .forEach(el => el.addEventListener('click', () => {
      if (modal) modal.style.display = 'block';
    }));

  // ✅ Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  // ✅ Close on outside click
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // ✅ Form Submit with optional file upload
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const company = form.company.value.trim();
      const subject = form.subject.value.trim();
      const description = form.description.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const fileInput = form.querySelector('input[type="file"]');
      const file = fileInput?.files[0];

      let fileURL = '';

      try {
        // ✅ Upload file if provided
        if (file) {
          const storageRef = storage.ref('attachments/' + Date.now() + '_' + file.name);
          const snapshot = await storageRef.put(file);
          fileURL = await snapshot.ref.getDownloadURL();
        }

        // ✅ Store form data in Realtime Database
        const snapshot = await database.ref('contactPopupMessages').once('value');
        const count = snapshot.exists() ? Object.keys(snapshot.val()).length : 0;
        const msgKey = 'msg' + (count + 1);

        await database.ref('contactPopupMessages/' + msgKey).set({
          name,
          company,
          subject,
          description,
          email,
          phone,
          fileURL: fileURL || '',
          timestamp: new Date().toISOString()
        });

        alert("✅ Message sent successfully!");
        form.reset();
        if (modal) modal.style.display = 'none';
      } catch (err) {
        console.error("❌ Firebase Error:", err);
        alert("❌ Error sending message. Please try again.");
      }
    });
  }
});
