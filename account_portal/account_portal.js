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
const lookupSection = document.getElementById('lookup-section');
const managementSection = document.getElementById('management-section');
const lookupEmailInput = document.getElementById('lookup-email');
const lookupBtn = document.getElementById('lookupBtn');
const accountUsernameSpan = document.getElementById('account-username');
const accountEmailSpan = document.getElementById('account-email');
const newEmailInput = document.getElementById('new-email');
const passwordForEmailChangeInput = document.getElementById('password-for-email-change');
const changeEmailBtn = document.getElementById('changeEmailBtn');
const currentPasswordInput = document.getElementById('current-password');
const newPasswordInput = document.getElementById('new-password');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const passwordChangeSection = document.getElementById('password-change-section');

// --- STATE ---
let foundUser = null; // Will store the user data found via email lookup

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

// --- CORE LOGIC ---

/**
 * Finds a user account in Firestore based on the provided email.
 */
async function findAccountByEmail() {
    const email = lookupEmailInput.value.trim();
    if (!email) {
        showMessage("Please enter an email address.", "warning");
        return;
    }

    try {
        // Query the 'users' collection for a document with the matching email.
        const usersRef = db.collection('users');
        const snapshot = await usersRef.where('email', '==', email).limit(1).get();

        if (snapshot.empty) {
            showMessage("No account found with that email address.", "error");
            return;
        }

        // Account found, store the user data.
        snapshot.forEach(doc => {
            foundUser = doc.data();
        });

        // Display the user's information and show the management section.
        accountUsernameSpan.innerText = foundUser.email; // Using email as username for display
        accountEmailSpan.innerText = foundUser.email;
        
        // Hide the lookup section and show the management section.
        lookupSection.style.display = 'none';
        managementSection.style.display = 'block';

        // Check if the user signed up with Google. If so, disable password change.
        const authUser = await auth.fetchSignInMethodsForEmail(email);
        if (authUser.includes('google.com')) {
            passwordChangeSection.innerHTML = "<h2>Change Password</h2><p>Password cannot be changed for accounts created with Google Sign-In.</p>";
        }

    } catch (error) {
        console.error("Error finding account:", error);
        showMessage("An error occurred while searching for the account.", "error");
    }
}


/**
 * Handles the password reset flow using Firebase's built-in functionality.
 */
async function sendPasswordReset() {
    if (!foundUser || !foundUser.email) {
        showMessage("Could not find user data. Please try looking up the account again.", "error");
        return;
    }

    try {
        await auth.sendPasswordResetEmail(foundUser.email);
        showMessage("A password reset link has been sent to your email address.", "success");
    } catch (error) {
        console.error("Error sending password reset email:", error);
        showMessage(error.message, "error");
    }
}


/**
 * Handles changing the user's email. This is a sensitive operation and requires
 * the user to re-authenticate by providing their current password.
 */
async function changeEmail() {
    const newEmail = newEmailInput.value.trim();
    const password = passwordForEmailChangeInput.value;

    if (!newEmail || !password) {
        showMessage("Please provide the new email and your current password.", "warning");
        return;
    }

    const user = auth.currentUser;
    if (!user) {
        showMessage("You must be logged in to change your email. For security, please log in on the main game page and return here.", "error");
        return;
    }
    
    // This is a security measure. Create a credential with the user's current email and the password they provided.
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password);

    try {
        // Re-authenticate the user with their current password.
        await user.reauthenticateWithCredential(credential);

        // If re-authentication is successful, update the email in Firebase Auth.
        await user.updateEmail(newEmail);

        // Then, update the email in the Firestore database.
        await db.collection('users').doc(user.uid).update({ email: newEmail });
        
        showMessage("Email updated successfully!", "success");
        accountEmailSpan.innerText = newEmail; // Update the display
        newEmailInput.value = '';
        passwordForEmailChangeInput.value = '';

    } catch (error) {
        console.error("Error changing email:", error);
        showMessage(error.message, "error"); // Show specific Firebase error (e.g., wrong password)
    }
}

// NOTE: The 'Change Password' button is now effectively a 'Forgot Password' button,
// as changing it directly here without being logged in is not a standard secure flow.
// The `sendPasswordReset` function handles this new logic.
// The old `changePassword` function is removed.

// --- EVENT LISTENERS ---
lookupBtn.addEventListener('click', findAccountByEmail);
// The change password button now triggers the password reset flow.
changePasswordBtn.addEventListener('click', sendPasswordReset);
changeEmailBtn.addEventListener('click', changeEmail);

