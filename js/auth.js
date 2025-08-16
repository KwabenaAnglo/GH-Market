// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsXfGcgdpr6Mr4Uh30y1AC0dVVrBM0lKk",
  authDomain: "gh-market-7e974.firebaseapp.com",
  projectId: "gh-market-7e974",
  storageBucket: "gh-market-7e974.firebasestorage.app",
  messagingSenderId: "604688735048",
  appId: "1:604688735048:web:22ff1492955ceb3381717d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup
document.getElementById("signup-btn").addEventListener("click", () => {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById("message").innerText = "Signup successful!";
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
});

// Login
document.getElementById("login-btn").addEventListener("click", () => {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            document.getElementById("message").innerText = "Login successful!";
        })
        .catch((error) => {
            document.getElementById("message").innerText = error.message;
        });
});
