const phoneInput = document.getElementById('phoneNumberInput');
if(phoneInput) {
phoneInput.addEventListener('focus', function() {
            // When the user clicks into the input, if it's empty, pre-fill '+1 '
if (this.value === '') {
this.value = '+1 ';
}
});
phoneInput.addEventListener('blur', function() {
            // If the user clicks out and the input is just '+1 ', clear it to show the placeholder again
if (this.value.trim() === '+1') {
this.value = '';
}
});
phoneInput.addEventListener('input', function() {
            // This prevents the user from deleting the '+1 ' prefix
if (!this.value.startsWith('+1 ')) {
                // If they manage to delete it, put it right back.
this.value = '+1 ';
}
});
@@ -94,29 +90,38 @@ auth.onAuthStateChanged(async (user) => {
if (isInitialLoad) {
isInitialLoad = false;

        // Assets load while the spinner animation runs via CSS.
await preloadAllGameAssets();
        
        // Loading is finished. Update text and stop the spinning animation.

const loadingText = document.getElementById('loading-text');
if (loadingText) {
loadingText.innerText = 'Assets Loaded';
}
        if (card) {
            card.style.animation = 'none'; // Stop the infinite spinning
        }

        // Add 'finished' class to trigger the zoom-in animation.
        // --- ANIMATION SEQUENCE ---
        // 1. Stop the infinite spinning animation.
        card.style.animation = 'none';

        // 2. Add a CSS transition to make the "landing" smooth.
        card.style.transition = 'transform 0.4s ease-out';
        
        // 3. Force the card to its front-facing position (showing the card back image).
        // This will animate smoothly over 0.4s due to the transition property.
        card.style.transform = 'rotateY(0deg)';

        // 4. Wait for the landing animation to finish.
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms > 400ms transition

        // 5. Trigger the final zoom-in animation by adding the 'finished' class.
preLoader.classList.add('finished');

        // Wait for the zoom animation (700ms) to complete before hiding the loader.
        await new Promise(resolve => setTimeout(resolve, 800));
        // 6. Wait for the zoom animation (700ms in CSS) to complete before hiding the loader.
        await new Promise(resolve => setTimeout(resolve, 800)); // 800ms > 700ms animation
        
        // --- END ANIMATION SEQUENCE ---

        // Hide the pre-loader and display the main game content.
preLoader.style.display = 'none';
gameContent.style.display = 'flex'; 

        // Now that the view is ready, set up invisible reCAPTCHA for phone auth.
try {
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
'size': 'invisible',
@@ -851,3 +856,4 @@ async function confirmDeleteAccount() {
document.getElementById('deleteAccountModal').classList.remove('show');
}
}
