document.addEventListener('DOMContentLoaded', function () {
  const modal     = document.getElementById('contactModal');
  const closeBtn  = document.querySelector('.close-button');
  const form      = document.getElementById('popupContactForm');

  // — Firebase Config
  const firebaseConfig = {
    apiKey:    "AIzaSyDk9ZmhrCXXbQzBXgvHP4k7LYNGH7efT2k",
    authDomain:"jetdata-bc3be.firebaseapp.com",
    databaseURL:"https://jetdata-bc3be-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jetdata-bc3be",
    storageBucket:"jetdata-bc3be.appspot.com",
    messagingSenderId:"505978811729",
    appId:     "1:505978811729:web:c5882b170e5959ecd60f70"
  };
  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  // — Modal open/close
  document.querySelectorAll('.cad-service-box:not(.other-services-box), .component-card')
    .forEach(el => el.addEventListener('click', () => modal.style.display = 'block'));
  closeBtn?.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

  // — Form submit
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name        = form.name.value.trim();
    const company     = form.company.value.trim();
    const subject     = form.subject.value.trim();
    const description = form.description.value.trim();
    const email       = form.email.value.trim();
    const phone       = form.phone.value.trim();
    const fileInput   = form.querySelector('input[type="file"]');
    const file        = fileInput.files[0];
    let   fileURL     = '';

    try {
      if (file) {
        // 1) Upload to Cloudinary raw endpoint
        const cloudName = 'drplypzss';
        const preset    = 'jet_unsigned';
        const url       = `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`;

        const fd = new FormData();
        fd.append('file', file);
        fd.append('upload_preset', preset);
        fd.append('resource_type', 'raw');      // ◀ tell Cloudinary it’s raw

        const res   = await fetch(url, { method: 'POST', body: fd });
        const data  = await res.json();

        if (!res.ok || !data.secure_url) {
          console.error('Cloudinary raw upload error:', data);
          throw new Error('❌ File upload failed.');
        }

        fileURL = data.secure_url;
      }

      // 2) Save form + fileURL to Firebase
      const snap  = await database.ref('contactPopupMessages').once('value');
      const count = snap.exists() ? Object.keys(snap.val()).length : 0;
      const key   = 'msg' + (count + 1);

      await database.ref(`contactPopupMessages/${key}`).set({
        name, company, subject, description, email, phone,
        fileURL, timestamp: new Date().toISOString()
      });

      alert('✅ Message sent successfully!');
      form.reset();
      modal.style.display = 'none';

    } catch (err) {
      console.error(err);
      alert('❌ Error sending message. Please try again.');
    }
  });
});
