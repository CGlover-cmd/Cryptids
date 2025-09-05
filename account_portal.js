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

// Modal Elements
const manageLoginBtn = document.getElementById('manageLoginBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const loginOptionsModal = document.getElementById('loginOptionsModal');
const loginOptionsBody = document.getElementById('loginOptionsBody');


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

// --- MODAL & LOGIN OPTIONS LOGIC ---

/**
 * Populates the login options table based on the user's linked providers.
 */
function populateLoginOptions() {
    const user = auth.currentUser;
    if (!user) return;

    loginOptionsBody.innerHTML = ''; // Clear previous options

    const linkedProviders = user.providerData.map(p => p.providerId);
    
    // --- Google Option ---
    const googleRow = document.createElement('tr');
    const googleProviderInfo = user.providerData.find(p => p.providerId === 'google.com');
    let googleStatusHTML = '';
    
    if (googleProviderInfo) {
        googleStatusHTML = `<span class="status-linked">Linked</span>`;
    } else {
        googleStatusHTML = `<button class="btn btn-small" id="addGoogleBtn">Add</button>`;
    }
    
    googleRow.innerHTML = `
        <td>Google</td>
        <td>${googleProviderInfo ? googleProviderInfo.email : 'Not Linked'}</td>
        <td>${googleStatusHTML}</td>
    `;
    loginOptionsBody.appendChild(googleRow);

    // Add event listener if the "Add" button exists
    if (!googleProviderInfo) {
        document.getElementById('addGoogleBtn').addEventListener('click', linkGoogleAccount);
    }
}

/**
 * Handles the process of linking a Google account.
 */
async function linkGoogleAccount() {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.currentUser.linkWithPopup(googleProvider);
        showMessage("Successfully linked your Google account!", "success");
        populateLoginOptions(); // Refresh the modal content
        // Also refresh the main page display
        accountEmailSpan.innerText = auth.currentUser.email || 'Not provided';
    } catch (error) {
        console.error("Error linking Google account:", error);
        if (error.code === 'auth/credential-already-in-use') {
            showMessage("This Google account is already linked to another user.", "error");
        } else {
            showMessage("Failed to link Google account. Please try again.", "error");
        }
    }
}

/**
 * Shows the login options modal.
 */
function openLoginOptionsModal() {
    populateLoginOptions();
    loginOptionsModal.classList.add('show');
}

/**
 * Hides the login options modal.
 */
function closeLoginOptionsModal() {
    loginOptionsModal.classList.remove('show');
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
            
            // --- Event Listeners for Modal ---
            manageLoginBtn.addEventListener('click', openLoginOptionsModal);
            closeModalBtn.addEventListener('click', closeLoginOptionsModal);
            // Close modal if user clicks outside the content area
            loginOptionsModal.addEventListener('click', (event) => {
                if (event.target === loginOptionsModal) {
                    closeLoginOptionsModal();
                }
            });

        } else {
            // No user is signed in.
            showMessage("You must be signed in to manage your account. Redirecting...", "error");
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        }
    });
});
