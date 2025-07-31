// --- FIREBASE CONFIGURATION ---
// This configuration must match the one in your main script.js and account_portal.js files.
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
    }, 4000);
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
 * Handles the user registration process.
 * This function now explicitly checks if an email is already in use by ANY
 * provider (especially Google) before attempting to create a new password account.
 */
async function registerUser() {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Basic password length check
    if (!password || password.length < 6) {
        showMessage("Password should be at least 6 characters long.", "error");
        return;
    }

    try {
        // First, check if any account (Google, password, etc.) already exists for this email.
        const signInMethods = await auth.fetchSignInMethodsForEmail(email);

        // If the array is not empty, an account already exists.
        if (signInMethods && signInMethods.length > 0) {
            // Provide a specific message if it's a Google account.
            if (signInMethods.includes('google.com')) {
                showMessage("This email is already registered with a Google account. Please go back and sign in with Google.", "error");
            } else {
                // For any other existing method (like 'password'), give a generic error.
                showMessage("An account with this email already exists. Please use the sign-in page.", "error");
            }
            return; // IMPORTANT: Stop the function to prevent registration.
        }

        // If signInMethods is empty, it's a new user. Proceed with creating the account.
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Create the corresponding user document in Firestore
        await createNewUserDocument(user.uid, user.email);

        showMessage("Account created successfully! Redirecting to the game...", "success");

        // Redirect to the main game page after a short delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        // This catch block is a fallback for other errors, like network issues or
        // rare race conditions where an account is created between our check and this call.
        console.error("Error during registration:", error);
        showMessage(error.message, "error");
    }
}


// --- INITIALIZATION ---

/**
 * [REVISED] This function runs when the page loads. It now checks if the email
 * from the URL is already associated with an account (especially Google)
 * BEFORE showing the registration form. If an account exists, it redirects
 * the user back to the sign-in page.
 */
window.onload = async function() {
    // Get the email from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get('email');

    if (!emailFromUrl) {
        // If no email is provided, inform the user and redirect back.
        showMessage("No email specified. Redirecting to the sign-in page.", "error");
        setTimeout(() => { window.location.href = 'index.html'; }, 3000);
        registerBtn.disabled = true;
        return;
    }
    
    const decodedEmail = decodeURIComponent(emailFromUrl);
    
    try {
        const signInMethods = await auth.fetchSignInMethodsForEmail(decodedEmail);
        
        // If sign-in methods exist, the user should not be on this page.
        if (signInMethods && signInMethods.length > 0) {
            let message = "An account with this email already exists. Redirecting to the sign-in page...";
            if (signInMethods.includes('google.com')) {
                message = "This email is registered with Google. Please use the 'Sign in with Google' button. Redirecting...";
            }
            showMessage(message, "error");
            
            // Hide the form to prevent interaction and disable the button
            document.querySelector('.register-container').style.display = 'none';
            registerBtn.disabled = true;

            // Redirect back to the main page after a delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 4000); // Increased delay to allow user to read the message
            return; // Stop further execution
        }

        // --- If no account exists, proceed to set up the registration form ---
        emailInput.value = decodedEmail;
        displayEmailSpan.innerText = decodedEmail;

        // Add event listener to the register button
        registerBtn.addEventListener('click', registerUser);

        // Allow pressing Enter in the password field to submit
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
