// This event listener ensures that the script runs only after the entire
// HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {
    
    // --- ELEMENT SELECTORS ---
    // Get references to all the necessary HTML elements to manipulate them later.
    const preLoader = document.getElementById('pre-loader');
    const mainLoader = document.getElementById('main-loader');
    const cardFront = document.querySelector('.card-front');
    const cardBack = document.querySelector('.card-back');
    const gameContent = document.getElementById('game-content');
    const usernameDisplay = document.getElementById('username');
    const logoutBtn = document.getElementById('logout-btn');
    const body = document.body;

    // --- INITIAL STATE ---
    // Hide scrollbars on the body while the loader is active.
    body.style.overflow = 'hidden';

    // --- IMAGE PRELOADING LOGIC ---
    // Define the URLs for the images to be used in the loading card animation.
    const imageUrl1 = 'https://raw.githubusercontent.com/CGlover-cmd/Cryptids/main/assets/back_of_card_loading_screen.png';
    const imageUrl2 = 'https://raw.githubusercontent.com/CGlover-cmd/Cryptids/main/assets/X_Bigfoot.png';

    /**
     * Creates an image element, loads an image from a given source, and appends it to a container.
     * @param {string} src - The URL of the image to load.
     * @param {HTMLElement} container - The HTML element to append the loaded image to.
     * @returns {Promise<void>} A promise that resolves when the image is loaded or fails.
     */
    const loadImage = (src, container) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                // On successful load, clear the container and append the image.
                container.innerHTML = ''; 
                container.appendChild(img);
                resolve();
            };
            img.onerror = (err) => {
                // If the image fails to load, log the error and show a message.
                console.error(`Failed to load image: ${src}`, err);
                container.innerHTML = '<p style="font-size: 12px; color: #ccc;">Image not found</p>';
                // Resolve anyway to ensure the app doesn't get stuck on a failed image load.
                resolve(); 
            };
        });
    };

    // Use Promise.all to wait for both images to finish loading concurrently.
    Promise.all([
        loadImage(imageUrl1, cardFront),
        loadImage(imageUrl2, cardBack)
    ]).then(() => {
        // Once all images are loaded (or have failed gracefully)...
        // 1. Fade out the initial pre-loader.
        preLoader.style.opacity = '0';
        // 2. After the fade-out animation, hide the pre-loader and show the main interactive loader.
        setTimeout(() => {
            preLoader.style.display = 'none';
            mainLoader.style.display = 'flex';
        }, 500); // This delay matches the CSS transition duration.
    }).catch(error => {
        // Log any critical errors that might occur during image loading.
        console.error("A critical error occurred loading images:", error);
    });

    // --- MAIN LOADER INTERACTION ---
    // Add a click event listener to the main loader.
    mainLoader.addEventListener('click', () => {
        // Add the 'hiding' class to trigger the zoom-out animation.
        mainLoader.classList.add('hiding');

        // After the zoom animation finishes...
        setTimeout(() => {
            // 1. Hide the main loader.
            mainLoader.style.display = 'none';
            // 2. Display the main game content.
            gameContent.style.display = 'block';
            // 3. Restore scrolling functionality to the body.
            body.style.overflow = 'auto'; 
            
            // 4. Check if a user is logged in. If not, redirect to the account portal.
            if (!localStorage.getItem('user')) {
               window.location.href = 'account_portal.html';
            }
        }, 700); // This duration MUST match the CSS animation duration.
    }, { once: true }); // { once: true } ensures this event only fires once.

    // --- USER AUTHENTICATION LOGIC ---
    // Check if user data exists in localStorage.
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        // If the user is logged in, display their username and show the logout button.
        usernameDisplay.textContent = user.username;
        logoutBtn.style.display = 'block';
    }

    // Add a click event listener for the logout button.
    logoutBtn.addEventListener('click', () => {
        // Remove the user data from localStorage.
        localStorage.removeItem('user');
        // Redirect to the account portal.
        window.location.href = 'account_portal.html';
    });
});
