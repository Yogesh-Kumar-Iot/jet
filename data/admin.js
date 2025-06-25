// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDk9ZmhrCXXbQzBXgvHP4k7LYNGH7efT2k",
  authDomain: "jetdata-bc3be.firebaseapp.com",
  databaseURL: "https://jetdata-bc3be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jetdata-bc3be",
  storageBucket: "jetdata-bc3be.appspot.com",
  messagingSenderId: "505978811729",
  appId: "1:505978811729:web:c5882b170e5959ecd60f70"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const messagesList = document.getElementById("messages-list");
const messageCount = document.getElementById("message-count");

// Listen for messages in real time
database.ref("messages").on("value", snapshot => {
  const messages = snapshot.val();
  messagesList.innerHTML = "";
  let total = 0;

  if (messages) {
    const keys = Object.keys(messages).reverse();
    total = keys.length;
    keys.forEach(key => {
      const msg = messages[key];

      const card = document.createElement("div");
      card.className = "message-card";
      card.innerHTML = `
        <div class="message-header">
          <h3>${msg.name}</h3>
          <span class="timestamp">${new Date(msg.timestamp).toLocaleString()}</span>
        </div>
        <p><strong>Email:</strong> ${msg.email}</p>
        <p><strong>Message:</strong><br>${msg.message}</p>
        <button class="delete-btn" data-key="${key}">Delete</button>
      `;
      messagesList.appendChild(card);
    });

    // Attach delete handlers
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const key = this.getAttribute("data-key");
        if (confirm("Are you sure you want to delete this message?")) {
          database.ref("messages/" + key).remove();
        }
      });
    });
  }

  messageCount.textContent = total;
});
