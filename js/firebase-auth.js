// Firebase Authentication Logic - This file should be included after firebase-config.js

// Test Firebase Connection
function testFirebaseConnection() {
    console.log('Testing Firebase connection...');
    
    // Test Authentication
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log('✅ Firebase Auth connected. Current user:', user.email);
        } else {
            console.log('✅ Firebase Auth connected. No user signed in.');
        }
    });
    
    // Test Firestore
    const testDoc = firebase.firestore().collection('test').doc('connection');
    testDoc.set({
        test: 'connection',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => console.log('✅ Firestore write successful'))
    .catch(err => console.error('❌ Firestore write failed:', err));
}

document.addEventListener('DOMContentLoaded', function() {
    // Check for email verification status in URL
    const urlParams = new URLSearchParams(window.location.search);
    const emailVerified = urlParams.get('verified') === 'true';
    const email = urlParams.get('email');
    
    if (emailVerified && email) {
        showStatus(`A verification link has been sent to ${email}. Please check your inbox.`, 'success');
        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // Run connection test
    testFirebaseConnection();
    
    // Check if Firebase is already initialized
    if (typeof firebase === 'undefined') {
        console.error('Firebase is not loaded. Make sure firebase-config.js is included before this file.');
        return;
    }

    // Use globally available Firebase services from firebase-config.js
    const auth = window.firebaseAuth || firebase.auth();
    const db = window.firebaseDb || firebase.firestore();
    
    if (!auth || !db) {
        console.error('Firebase services not properly initialized. Check firebase-config.js');
        return;
    }

    // ===== SIGN UP =====
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const nameInput = document.getElementById('signup-name');
            const emailInput = document.getElementById('signup-email');
            const passwordInput = document.getElementById('signup-password');
            const roleSelect = document.getElementById('signup-role');
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            
            // Get values
            const name = nameInput?.value.trim() || '';
            const email = emailInput?.value.trim() || '';
            const password = passwordInput?.value || '';
            const role = roleSelect?.value || '';

            // Validate inputs
            if (!name || !email || !password || !role) {
                showStatus('Please fill in all fields and select a role.', 'error');
                return;
            }

            if (password.length < 6) {
                showStatus('Password must be at least 6 characters long.', 'error');
                return;
            }

            // Disable submit button to prevent double submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Creating Account...';
            }

            try {
                showStatus('Creating your account...', 'info');
                
                // Create user
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;
                
                // Update user profile with display name
                await user.updateProfile({
                    displayName: name
                });

                // Save user data to Firestore
                await db.collection('users').doc(user.uid).set({
                    name: name,
                    email: email,
                    role: role,
                    emailVerified: false,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Send verification email with custom settings
                const actionCodeSettings = {
                    url: window.location.origin + '/auth.html?verified=true',
                    handleCodeInApp: true
                };
                
                console.log('Sending verification email to:', user.email);
                
                // Send verification email
                await user.sendEmailVerification(actionCodeSettings);
                
                // Show success message
                showStatus('Account created successfully! Please check your email to verify your account before logging in.', 'success');
                
                // Reset form
                signupForm.reset();
                
                // Show login form after a short delay
                setTimeout(() => {
                    window.location.hash = 'login';
                    if (document.getElementById('login-tab')) {
                        document.getElementById('login-tab').click();
                    }
                }, 3000);
                
            } catch (error) {
                console.error('Signup error:', error);
                
                let errorMessage = 'Error creating account: ';
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        errorMessage += 'This email is already registered. Please use a different email or sign in.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage += 'Please enter a valid email address.';
                        break;
                    case 'auth/weak-password':
                        errorMessage += 'Password is too weak. Please choose a stronger password.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                showStatus(errorMessage, 'error');
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Create Account';
                }
            }
        });
    }

    // ===== SIGN IN =====
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements
            const emailInput = document.getElementById('signin-email');
            const passwordInput = document.getElementById('signin-password');
            const submitBtn = signinForm.querySelector('button[type="submit"]');
            
            // Get values
            const email = emailInput?.value.trim() || '';
            const password = passwordInput?.value || '';

            // Validate inputs
            if (!email || !password) {
                showStatus('Please enter both email and password.', 'error');
                return;
            }

            // Disable submit button to prevent double submission
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Signing In...';
            }

            try {
                showStatus('Signing in...', 'info');
                
                // Sign in with email and password
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Check if email is verified
                if (!user.emailVerified) {
                    // Sign out the user if email is not verified
                    await auth.signOut();
                    showStatus('Please verify your email before logging in. Check your inbox for the verification email or click "Resend Verification Email" below.', 'error');
                    return;
                }

                // Update last login time
                await db.collection('users').doc(user.uid).update({
                    lastLogin: firebase.firestore.FieldValue.serverTimestamp()
                });

                // Get user role and redirect
                const userDoc = await db.collection('users').doc(user.uid).get();
                if (!userDoc.exists) {
                    throw new Error('User data not found. Please contact support.');
                }

                const userData = userDoc.data();
                showStatus('Login successful! Redirecting...', 'success');
                
                // Redirect based on role after a short delay
                setTimeout(() => {
                    window.location.href = userData.role === 'seller' 
                        ? 'seller-dashboard.html' 
                        : 'buyer-dashboard.html';
                }, 1500);

            } catch (error) {
                console.error('Login error:', error);
                
                let errorMessage = 'Login failed: ';
                switch (error.code) {
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                        errorMessage += 'Invalid email or password.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage += 'Too many failed attempts. Please try again later or reset your password.';
                        break;
                    case 'auth/user-disabled':
                        errorMessage += 'This account has been disabled. Please contact support.';
                        break;
                    default:
                        errorMessage += error.message;
                }
                
                showStatus(errorMessage, 'error');
                
            } finally {
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Sign In';
                }
            }
        });
    }

    // ===== AUTH STATE OBSERVER =====
    // Listen for auth state changes
    auth.onAuthStateChanged(async function(user) {
        console.log('Auth state changed. User:', user ? user.email : 'Not signed in');
        
        // Handle auth state in auth.html
        const authContainer = document.getElementById('auth-buttons-container');
        
        // Handle auth state in index.html
        const signedInUser = document.getElementById('signed-in-user');
        const signedOutUser = document.getElementById('signed-out-user');
        const userEmail = document.getElementById('user-email');
        const signOutButton = document.getElementById('sign-out-button');
        const verificationStatus = document.getElementById('verification-status');
        const loginForm = document.getElementById('signin-form');
        const signupForm = document.getElementById('signup-form');

        // Update UI based on authentication state
        if (user) {
            // Update UI for signed in user
            if (signedInUser) signedInUser.style.display = 'flex';
            if (signedOutUser) signedOutUser.style.display = 'none';
            if (userEmail) userEmail.textContent = user.email;
            
            // Show verification status
            if (verificationStatus) {
                verificationStatus.style.display = user.emailVerified ? 'none' : 'block';
            }
            
            // Hide forms if on auth page
            if (loginForm) loginForm.style.display = 'none';
            if (signupForm) signupForm.style.display = 'none';

            // If email is verified, redirect based on role
            if (user.emailVerified) {
                try {
                    const userDoc = await db.collection('users').doc(user.uid).get();
                    if (userDoc.exists) {
                        const userData = userDoc.data();
                        console.log('User role:', userData.role);
                        
                        // Only redirect if we're on the auth page
                        if (window.location.pathname.includes('auth.html')) {
                            setTimeout(() => {
                                window.location.href = userData.role === 'seller' 
                                    ? 'seller-dashboard.html' 
                                    : 'buyer-dashboard.html';
                            }, 1500);
                        }
                    }
                } catch (error) {
                    console.error('Error getting user data:', error);
                }
            }
            // User is signed in and email is verified
            if (user.emailVerified) {
                const userDoc = await db.collection('users').doc(user.uid).get();
                const userData = userDoc.exists ? userDoc.data() : { name: user.email.split('@')[0] };
                
                authContainer.innerHTML = `
                    <span class="welcome-text">Welcome, ${userData.name || user.email}</span>
                    <button id="signOutBtn" class="btn btn-outline">Sign Out</button>
                `;

                document.getElementById('signOutBtn').addEventListener('click', async () => {
                    try {
                        await auth.signOut();
                    } catch (err) {
                        console.error('Sign out error:', err);
                    }
                });
            } else if (authContainer) {
                // Fallback for auth.html
                const verificationStatus = user.emailVerified ? '' : 
                    `<div class="verification-notice">
                        <p>Please verify your email address.</p>
                        <button id="resend-verification">Resend Verification Email</button>
                    </div>`;
                
                authContainer.innerHTML = `
                    <div>
                        <p>Welcome, ${user.email}</p>
                        ${verificationStatus}
                    </div>
                    <button id="logoutBtn" class="btn btn-outline">Logout</button>
                `;
                
                // Add event listeners
                document.getElementById('logoutBtn').addEventListener('click', handleSignOut);
                if (!user.emailVerified) {
                    document.getElementById('resend-verification')
                        .addEventListener('click', () => {
                            user.sendEmailVerification()
                                .then(() => alert('Verification email sent!'))
                                .catch(err => console.error('Error sending verification:', err));
                        });
                }
            }
        } else {
            // User is signed out
            if (signedInUser && signedOutUser) {
                signedInUser.style.display = 'none';
                signedOutUser.style.display = 'flex';
            } else if (authContainer) {
                authContainer.innerHTML = `
                    <a href="auth.html" class="btn btn-outline">Sign In</a>
                    <a href="auth.html#signup" class="btn btn-primary">Sign Up</a>
                `;
            }
        }
    });

    // Handle sign out
    function handleSignOut() {
        auth.signOut().then(() => {
            showStatus('Successfully signed out', 'success');
        }).catch((error) => {
            showStatus('Error signing out: ' + error.message, 'error');
        });
    }

    // Add event listener for sign out button in index.html
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'sign-out-button') {
            handleSignOut();
        }
    });

    // ===== RESEND VERIFICATION EMAIL =====
    const resendVerificationBtn = document.getElementById('resend-verification');
    if (resendVerificationBtn) {
        resendVerificationBtn.addEventListener('click', async () => {
            const user = auth.currentUser;
            if (user && !user.emailVerified) {
                try {
                    const actionCodeSettings = {
                        url: window.location.origin + '/auth.html',
                        handleCodeInApp: true
                    };
                    await user.sendEmailVerification(actionCodeSettings);
                    showStatus('Verification email resent. Please check your inbox.', 'success');
                } catch (error) {
                    console.error('Error resending verification email:', error);
                    showStatus('Error resending verification email: ' + error.message, 'error');
                }
            } else {
                showStatus('No unverified user found.', 'error');
            }
        });
    }

    // ===== HELPER FUNCTIONS =====
    function showStatus(message, type = 'info') {
        const statusElement = document.getElementById('statusMessage') || createStatusElement();
        statusElement.textContent = message;
        statusElement.className = 'status';
        
        if (type === 'error') {
            statusElement.classList.add('error');
        } else if (type === 'success') {
            statusElement.classList.add('success');
        } else {
            statusElement.style.display = 'block';
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            statusElement.className = 'status';
        }, 5000);
    }

    function createStatusElement() {
        const statusElement = document.createElement('div');
        statusElement.id = 'statusMessage';
        statusElement.className = 'status';
        document.body.prepend(statusElement);
        return statusElement;
    }
});
