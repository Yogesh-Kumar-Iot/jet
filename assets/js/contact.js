// Firebase SDK v9 (compat)
const firebaseConfig = {
  apiKey: "AIzaSyDk9ZmhrCXXbQzBXgvHP4k7LYNGH7efT2k",
  authDomain: "jetdata-bc3be.firebaseapp.com",
  databaseURL: "https://jetdata-bc3be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "jetdata-bc3be",
  storageBucket: "jetdata-bc3be.firebasestorage.app",
  messagingSenderId: "505978811729",
  appId: "1:505978811729:web:c5882b170e5959ecd60f70"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("form-response");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Get current message count
  database.ref("messages").once("value")
    .then(snapshot => {
      const messages = snapshot.val();
      const count = messages ? Object.keys(messages).length : 0;
      const msgKey = "msg" + (count + 1);  // like msg1, msg2, etc.

      // Save message with custom key
      return database.ref("messages/" + msgKey).set({
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toISOString()
      });
    })
    .then(() => {
      responseMsg.textContent = "✅ Message saved to Firebase!";
      responseMsg.style.color = "green";
      form.reset();
    })
    .catch((error) => {
      console.error("❌ Firebase Error:", error);
      responseMsg.textContent = "❌ Failed to send. Try again.";
      responseMsg.style.color = "red";
    });
});
