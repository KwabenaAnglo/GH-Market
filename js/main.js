// Use Firebase compat SDK for consistency with other files
// Firebase services are initialized in firebase-config.js

// Wait for Firebase to be initialized
function waitForFirebase() {
  return new Promise((resolve, reject) => {
    if (typeof firebase !== 'undefined' && window.firebaseAuth && window.firebaseDb) {
      resolve();
    } else {
      // Wait up to 5 seconds for Firebase to initialize
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (typeof firebase !== 'undefined' && window.firebaseAuth && window.firebaseDb) {
          clearInterval(checkInterval);
          resolve();
        } else if (attempts > 50) { // 5 seconds
          clearInterval(checkInterval);
          reject(new Error('Firebase initialization timeout'));
        }
      }, 100);
    }
  });
}

// Get Firebase services
const getFirebaseServices = () => {
  return {
    auth: window.firebaseAuth || firebase.auth(),
    db: window.firebaseDb || firebase.firestore()
  };
};

// --- SIGN UP ---
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await waitForFirebase();
    console.log('✅ Firebase ready for main.js');
    
    const signupBtn = document.getElementById("signup-btn");
    if (signupBtn) {
      signupBtn.addEventListener("click", async () => {
        const email = document.getElementById("signup-email")?.value;
        const password = document.getElementById("signup-password")?.value;
        const role = document.getElementById("signup-role")?.value;

        if (!email || !password || !role) {
          alert("Please fill in all fields");
          return;
        }

        try {
          const { auth, db } = getFirebaseServices();
          const userCredential = await auth.createUserWithEmailAndPassword(email, password);
          const user = userCredential.user;

          // Save role to Firestore
          await db.collection("users").doc(user.uid).set({ 
            role: role,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });

          alert("Sign-up successful!");
        } catch (error) {
          console.error("Signup error:", error);
          alert("Signup failed: " + error.message);
        }
      });
    }
  } catch (error) {
    console.error("Firebase initialization failed:", error);
  }
});

    // --- LOGIN ---
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
      loginBtn.addEventListener("click", async (event) => {
        event.preventDefault(); // Prevent form reload if inside a form
        const email = document.getElementById("login-email")?.value;
        const password = document.getElementById("login-password")?.value;

        if (!email || !password) {
          alert("Please enter both email and password");
          return;
        }

        try {
          const { auth, db } = getFirebaseServices();
          const userCredential = await auth.signInWithEmailAndPassword(email, password);
          const user = userCredential.user;

          // Check if Firestore document exists
          const docSnap = await db.collection("users").doc(user.uid).get();

          if (!docSnap.exists) {
            alert("User data not found. Please contact support.");
            return;
          }

          const userData = docSnap.data();
          const role = userData.role;
          console.log("User role:", role); // Debugging

          // Update last login
          await db.collection("users").doc(user.uid).update({
            lastLogin: firebase.firestore.FieldValue.serverTimestamp()
          });

          // Redirect based on role
          if (role === "buyer") {
            try {
              window.location.href = "buyer-dashboard.html";
            } catch (redirectError) {
              console.error("Redirect error:", redirectError);
              alert("Redirect failed. See console for details.");
            }
          } else if (role === "seller") {
            try {
              window.location.href = "seller-dashboard.html";
            } catch (redirectError) {
              console.error("Redirect error:", redirectError);
              alert("Redirect failed. See console for details.");
            }
          } else {
            alert("Unknown user role: " + role);
          }
        } catch (error) {
          console.error("Login error:", error);
          let errorMessage = "Login failed: ";
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              errorMessage += "Invalid email or password.";
              break;
            case 'auth/too-many-requests':
              errorMessage += "Too many failed attempts. Please try again later.";
              break;
            default:
              errorMessage += error.message;
          }
          alert(errorMessage);
        }
      });
    }
