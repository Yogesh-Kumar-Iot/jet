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
const db = firebase.database();

// ✅ Login Function
function login() {
  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value;

  db.ref("adminUsers").once("value")
    .then(snapshot => {
      const users = snapshot.val();
      let isValid = false;

      for (let key in users) {
        const user = users[key];
        if (user.username === usernameInput && user.password === passwordInput) {
          isValid = true;
          break;
        }
      }

      if (isValid) {
        sessionStorage.setItem("adminLoggedIn", "true");
        window.location.href = "/data/admin.html";
      } else {
        alert("❌ Invalid username or password.");
      }
    })
    .catch(err => {
      console.error("❌ Firebase error:", err);
      alert("❌ Login failed. Please try again.");
    });
}
