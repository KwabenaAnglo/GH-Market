// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsXfGcgdpr6Mr4Uh30y1AC0dVVrBM0lKk",
  authDomain: "gh-market-7e974.firebaseapp.com",
  projectId: "gh-market-7e974",
  storageBucket: "gh-market-7e974.firebasestorage.app",
  messagingSenderId: "604688735048",
  appId: "1:604688735048:web:22ff1492955ceb3381717d"
};

// Initialize Firebase (using compat SDK for consistency)
console.log('Initializing Firebase with config:', firebaseConfig);

// Check if Firebase is already initialized
let app, auth, db;
try {
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  
  auth = firebase.auth();
  db = firebase.firestore();
  
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.error('❌ Firebase initialization error:', error);
}

// Enable persistence for better offline support
if (db) {
  db.enablePersistence()
    .then(() => console.log('✅ Firestore persistence enabled'))
    .catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('⚠️ Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('⚠️ Firestore persistence not supported in this browser');
      } else {
        console.warn('⚠️ Firestore persistence error:', err);
      }
    });
}

// Set auth persistence
if (auth) {
  auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log('✅ Auth persistence set to LOCAL'))
    .catch((err) => console.error('❌ Error setting auth persistence:', err));
}

// Make auth and db available globally for other scripts
window.firebaseAuth = auth;
window.firebaseDb = db;
