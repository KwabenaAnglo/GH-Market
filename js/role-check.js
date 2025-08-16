// role-check.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAAtZOmFXjhIIAn9inACS-ThLU2lmMmeo4",
  authDomain: "gh-market-21605.firebaseapp.com",
  projectId: "gh-market-21605",
  storageBucket: "gh-market-21605.appspot.com",
  messagingSenderId: "3593596960",
  appId: "1:3593596960:web:c61dfe9671e6f0860c8c45",
  measurementId: "G-LSGYM1WWCQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function checkUserRole(requiredRole) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const docSnap = await getDoc(doc(db, "users", user.uid));
    if (!docSnap.exists() || docSnap.data().role !== requiredRole) {
      alert("Access denied!");
      window.location.href = "index.html";
    }
  });
}

export function logoutUser() {
  signOut(auth).then(() => {
    window.location.href = "index.html";
  });
}
