// --- FIREBASE CONFIGURATION ---

// Initialize Firebase services
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// --- DOM ELEMENTS ---
const managementSection = document.getElementById('management-section');
const accountEmailSpan = document.getElementById('account-email');
const accountPhoneSpan = document.getElementById('account-phone');
const accountUserIdSpan = document.getElementById('account-userid');
const linkGoogleBtn = document.getElementById('linkGoogleBtn');

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

// --- ACCOUNT LINKING ---
async function linkGoogleAccount() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.currentUser.linkWithPopup(googleProvider);
        showMessage("Successfully linked your Google account!", "success");
        // Refresh account info to show the newly linked email if it wasn't there before
        accountEmailSpan.innerText = auth.currentUser.email || 'Not provided';
    } catch (error) {
        console.error("Error linking Google account:", error);
        // Handle specific errors, like if the account is already in use
        if (error.code === 'auth/credential-already-in-use') {
            showMessage("This Google account is already linked to another user.", "error");
        } else {
            showMessage("Failed to link Google account. Please try again.", "error");
        }
    }
}


// --- INITIALIZATION ---
/**
 * This function runs when the page loads. It checks for a logged-in user.
 * If a user is logged in, it displays their information.
 * If not, it redirects them to the main sign-in page.
 */
document.addEventListener('DOMContentLoaded', () => {
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is signed in.
            accountEmailSpan.innerText = user.email || 'Not provided';
            accountPhoneSpan.innerText = user.phoneNumber || 'Not provided';
            accountUserIdSpan.innerText = user.uid || 'N/A';

            // Add event listener for the link button
            linkGoogleBtn.addEventListener('click', linkGoogleAccount);

        } else {
            // No user is signed in.
            showMessage("You must be signed in to manage your account. Redirecting...", "error");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    });
});
