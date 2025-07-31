// --- FIREBASE CONFIGURATION ---
// This configuration must match the one in your main script.js file.
const firebaseConfig = {
    apiKey: "AIzaSyA7HORw-_RGWxhyo9eGD3fvGL4ub8WH1O0",
    authDomain: "cryptids-be430.firebaseapp.com",
    projectId: "cryptids-be430",
    storageBucket: "cryptids-be430.firebasestorage.app",
    messagingSenderId: "197995808355",
    appId: "1:197995808355:web:5a2534f516a9efe2d15a56",
    measurementId: "G-FTBG99PW84"
};

// Initialize Firebase services
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- DOM ELEMENTS ---
const emailInput = document.getElementById('email');
const displayEmailSpan = document.getElementById('display-email');
const passwordInput = document.getElementById('password');
const registerBtn = document.getElementById('registerBtn');
const registerContainer = document.querySelector('.register-container');

// --- MESSAGE DISPLAY ---
let globalMessageTimeout;
function showMessage(message, type = "info") {
    const messageEl = document.getElementById('globalMessage');
    if (!messageEl) return;

    messageEl.innerText = message;
    messageEl.className = `global-message ${type} show`;

    clearTimeout(globalMessageTimeout);
    globalMessageTimeout = setTimeout(() => {
        messageEl.classList.remove('show');
    }, 4000); // 4 second timeout for messages
}

// --- CORE REGISTRATION LOGIC ---

/**
 * Creates a new user document in the Firestore 'users' collection with default values.
 * @param {string} userId - The UID of the newly created user.
 * @param {string} email - The email of the newly created user.
 */
async function createNewUserDocument(userId, email) {
    const userRef = db.collection('users').doc(userId);
    const newUser = {
        uid: userId,
        email: email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        collectedCardIds: [],
        playerDeckIds: [],
        cryptidCoins: 200, // Starting coins for new players
        packsOpened: 0,
        gamesPlayed: 0
    };
    await userRef.set(newUser);
}

/**
 * Handles the user registration process. This is only called if the email is new.
 */
async function registerUser() {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!password || password.length < 6) {
        showMessage("Password should be at least 6 characters long.", "error");
        return;
    }

    try {
        // No need to check for existing email here again, as window.onload already did it.
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        await createNewUserDocument(user.uid, user.email);

        showMessage("Account created successfully! Redirecting to the game...", "success");

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error("Error during registration:", error);
        showMessage(error.message, "error");
    }
}

// --- INITIALIZATION ---

/**
 * [FIXED] This function runs when the page loads. It checks if the email
 * from the URL is already associated with an account (especially Google)
 * BEFORE showing the registration form. If an account exists, it redirects.
 */
window.onload = async function() {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');

    if (!emailFromUrl) {
        showMessage("No email specified. Redirecting to the sign-in page.", "error");
        setTimeout(() => { window.location.href = 'index.html'; }, 3000);
        registerBtn.disabled = true;
        return;
    }
    
    const decodedEmail = decodeURIComponent(emailFromUrl);
    
    try {
        const signInMethods = await auth.fetchSignInMethodsForEmail(decodedEmail);
        
        if (signInMethods && signInMethods.length > 0) {
            let message = "An account with this email already exists. Redirecting...";
            if (signInMethods.includes('google.com')) {
                message = "This email is registered with Google. Please use the 'Sign in with Google' button. Redirecting...";
            }
            showMessage(message, "error");
            
            // Hide the form and disable the button to prevent interaction
            if (registerContainer) {
                registerContainer.style.display = 'none';
            }
            registerBtn.disabled = true;

            // Redirect back to the main page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3500); // Redirect after 3.5 seconds
            return; // Stop further execution
        }

        // If no account exists, proceed to set up the registration form
        emailInput.value = decodedEmail;
        displayEmailSpan.innerText = decodedEmail;
        registerBtn.addEventListener('click', registerUser);
        passwordInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                registerUser();
            }
        });

    } catch (error) {
        console.error("Error checking email on registration page:", error);
        showMessage("An error occurred. Please go back and try again.", "error");
        registerBtn.disabled = true;
    }
};
