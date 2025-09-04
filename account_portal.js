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
const managementSection = document.getElementById('management-section');
const accountEmailSpan = document.getElementById('account-email');
const accountPhoneSpan = document.getElementById('account-phone');
const accountUserIdSpan = document.getElementById('account-userid');

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
        } else {
            // No user is signed in.
            showMessage("You must be signed in to manage your account. Redirecting...", "error");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    });
});
