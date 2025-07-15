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

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// DOM references
const popupContainer = document.getElementById('popup-messages');
const contactContainer = document.getElementById('contact-messages');
const popupCount = document.getElementById('popup-count');
const contactCount = document.getElementById('contact-count');

// Load Popup Contact Messages
db.ref("contactPopupMessages").on("value", snapshot => {
  const data = snapshot.val();
  popupContainer.innerHTML = "";
  popupCount.textContent = data ? Object.keys(data).length : 0;

  if (data) {
    Object.entries(data).reverse().forEach(([key, msg]) => {
      const card = document.createElement("div");
      card.className = "message-card";

      let attachmentHTML = "";
      if (msg.fileURL) {
        const fileURL = msg.fileURL;
        const lower = fileURL.toLowerCase();

        if (/\.(jpg|jpeg|png|gif|bmp|webp)$/.test(lower)) {
          attachmentHTML = `
            <a class="attachment-link" href="${fileURL}" target="_blank">
              <img src="${fileURL}" alt="attachment" style="max-height:100px; border-radius:6px; margin-top:5px;">
            </a>`;
        } else if (lower.endsWith(".pdf")) {
          attachmentHTML = `
            <a class="attachment-link" href="${fileURL}" target="_blank">📄 View PDF</a>`;
        } else {
          attachmentHTML = `
            <a class="attachment-link" href="${fileURL}" target="_blank">🔗 View File</a>`;
        }
      }

      card.innerHTML = `
        <h3>${msg.name}</h3>
        <p><strong>Company:</strong> ${msg.company || "-"}</p>
        <p><strong>Subject:</strong> ${msg.subject || "-"}</p>
        <p><strong>Description:</strong><br>${msg.description || "-"}</p>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Phone:</strong> ${msg.phone}</p>
        ${attachmentHTML ? `<p><strong>Attachment:</strong><br>${attachmentHTML}</p>` : ""}
        <p class="timestamp">${new Date(msg.timestamp).toLocaleString()}</p>
        <button class="delete-btn" data-type="popup" data-key="${key}">Delete</button>
      `;

      popupContainer.appendChild(card);
    });

    attachDeleteHandlers();
  }
});

// Load Normal Contact Messages
db.ref("messages").on("value", snapshot => {
  const data = snapshot.val();
  contactContainer.innerHTML = "";
  contactCount.textContent = data ? Object.keys(data).length : 0;

  if (data) {
    Object.entries(data).reverse().forEach(([key, msg]) => {
      const card = document.createElement("div");
      card.className = "message-card";

      card.innerHTML = `
        <h3>${msg.name}</h3>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong><br>${msg.message || "-"}</p>
        <p class="timestamp">${new Date(msg.timestamp).toLocaleString()}</p>
        <button class="delete-btn" data-type="contact" data-key="${key}">Delete</button>
      `;

      contactContainer.appendChild(card);
    });

    attachDeleteHandlers();
  }
});

// Handle Delete
function attachDeleteHandlers() {
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-key");
      const type = btn.getAttribute("data-type");
      const path = type === "popup" ? "contactPopupMessages" : "messages";

      if (confirm("Are you sure you want to delete this message?")) {
        db.ref(`${path}/${key}`).remove();
      }
    });
  });
}
