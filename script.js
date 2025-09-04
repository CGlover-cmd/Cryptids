// --- FIREBASE CONFIGURATION ---
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
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Globals for phone auth
window.recaptchaVerifier = null;
window.confirmationResult = null;


// --- DATA ---
const allCryptids = [
    { id: 'mothman', name: "Mothman", rarity: "common", hp: 30, attack: { name: "Sonic Screech", damage: 10 }, effect: "Frightening Presence: Reduces enemy attack by 5 for one turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/moth_man.png" },
    { id: 'chupacabra', name: "Chupacabra", rarity: "rare", hp: 40, attack: { name: "Vampiric Bite", damage: 20 }, effect: "Blood Drain: Heals self for 10 HP after attacking.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/chupacabra.png" },
    { id: 'bigfoot', name: "Bigfoot", rarity: "common", hp: 50, attack: { name: "Forest Stomp", damage: 15 }, effect: "Stomp: Deals 5 splash damage to all enemy cards.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/bigfoot.png" },
    { id: 'jerseydevil', name: "Jersey Devil", rarity: "rare", hp: 35, attack: { name: "Hellish Dive", damage: 25 }, effect: "Flight: Dodges first attack each turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/jersey_devil.png" },
    { id: 'wendigo', name: "Wendigo", rarity: "legendary", hp: 60, attack: { name: "Glacial Claw", damage: 30 }, effect: "Insatiable Hunger: Gains +5 Attack for each enemy card defeated.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/wendigo.png" },
    { id: 'skinwalker', name: "Skinwalker", rarity: "legendary", hp: 55, attack: { name: "Mimic Strike", damage: 28 }, effect: "Mimicry: Copies the ability of the last enemy card played.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/skinwalker.png" },
    { id: 'flatwoodsmonster', name: "Flatwoods Monster", rarity: "common", hp: 30, attack: { name: "Alien Ray", damage: 12 }, effect: "Gaseous Form: Cannot be targeted by abilities for one turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/flatwoods.png" },
    { id: 'kraken', name: "Kraken", rarity: "rare", hp: 70, attack: { name: "Crushing Tentacle", damage: 18 }, effect: "Crushing Grip: Stuns enemy card for one turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/kraken.png" },
    { id: 'lochnessmonster', name: "Loch Ness Monster", rarity: "rare", hp: 65, attack: { name: "Deep Surge", damage: 15 }, effect: "Deep Dive: Becomes immune to damage for one turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/lochness_monster.png" },
    { id: 'banshee', name: "Banshee", rarity: "common", hp: 25, attack: { name: "Death Wail", damage: 18 }, effect: "Wail: Deals 5 damage to enemy player directly.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/banshee.png" },
    { id: 'gnome', name: "Gnome", rarity: "common", hp: 30, attack: { name: "Rock Throw", damage: 10 }, effect: "Burrow: Hides underground, cannot be attacked for one turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/gnome.png" },
    { id: 'brownie', name: "Brownie", rarity: "common", hp: 20, attack: { name: "Helpful Hand", damage: 8 }, effect: "Helpful Spirit: Heals player for 10 HP.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/brownie.png" },
    { id: 'bunyip', name: "Bunyip", rarity: "common", hp: 45, attack: { name: "Swamp Snap", damage: 13 }, effect: "Swamp Ambush: Next attack deals double damage if played from hand.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/bunyip.png" },
    { id: 'kappa', name: "Kappa", rarity: "rare", hp: 38, attack: { name: "Water Jet", damage: 22 }, effect: "Cucumber Feast: Gains +5 HP and +5 Attack for one turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/kappa.png" },
    { id: 'siren', name: "Siren", rarity: "rare", hp: 32, attack: { name: "Luring Melody", damage: 28 }, effect: "Enchanting Song: Prevents enemy card from attacking next turn.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/siren.png" },
    { id: 'basilisk', name: "Basilisk", rarity: "rare", hp: 42, attack: { name: "Petrifying Strike", damage: 23 }, effect: "Petrifying Gaze: Deals 15 damage and reduces enemy attack by 10.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/basilisk.png" },
    { id: 'griffin', name: "Griffin", rarity: "rare", hp: 48, attack: { name: "Sky Assault", damage: 20 }, effect: "Sky Guardian: All friendly cards gain +5 HP.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/griffin.png" },
    { id: 'yeti', name: "Yeti", rarity: "common", hp: 55, attack: { name: "Frost Punch", damage: 10 }, effect: "Blizzard Breath: Deals 10 damage to all enemy cards.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/yeti.png" },
    { id: 'woodsdevil', name: "Woods Devil", rarity: "legendary", hp: 70, attack: { name: "Terrifying Charge", damage: 35 }, effect: "Terrifying Howl: Deals 20 damage to enemy player and 10 to all enemy cards.", image:"https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/woodsdevil.png" },
    { id: 'thunderbird', name: "Thunderbird", rarity: "legendary", hp: 65, attack: { name: "Lightning Strike", damage: 32 }, effect: "Chain Lightning: Deals 10 damage to two other random enemy cards.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/thunderbird.png" },
    { id: 'ropen', name: "Ropen", rarity: "rare", hp: 35, attack: { name: "Diving Strike", damage: 26 }, effect: "Bioluminescence: The next card the opponent plays has its attack reduced by half.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/ropen.png" },
    { id: 'almas', name: "Almas", rarity: "common", hp: 48, attack: { name: "Feral Swipe", damage: 14 }, effect: "Hardy: If this card survives combat, it gains +5 HP.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/almas.png" },
    { id: 'mokele-mbembe', name: "Mokele-mbembe", rarity: "rare", hp: 75, attack: { name: "River Charge", damage: 16 }, effect: "Amphibious Hide: Reduces incoming damage from 'common' cards by 5.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/mokele-mbembe.png" },
    { id: 'snallygaster', name: "Snallygaster", rarity: "mythic", hp: 90, attack: { name: "Apocalypse", damage: 50 }, effect: "Apex Predator: Instantly defeats any non-mythic card it battles. Pierces all defenses.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/snallygaster.png" }
];

// --- STATE MANAGEMENT ---
let currentUser = null;
let collectedCardIds = new Set();
let playerDeckIds = [];
let cryptidCoins = 0;
let packsOpened = 0;
let gamesPlayed = 0;
let isInitialLoad = true;

const PACK_COST = 50;
const WIN_REWARD = 10;
const MAX_DECK_SIZE = 10;
const MAX_TURNS = 20;

// Game State Variables
let playerHP, botHP, currentTurn, playerCardInPlay, botCardInPlay;
let playerDeck, botDeck, playerHand, botHand;
let selectedPlayerCardData = null;
let selectedPlayerCardElement = null;
let messageTimeout, globalMessageTimeout;

// --- FIREBASE AUTHENTICATION & DATA HANDLING ---

auth.onAuthStateChanged(async (user) => {
    const preLoader = document.getElementById('pre-loader');
    const gameContent = document.getElementById('game-content');

    if (isInitialLoad) {
        isInitialLoad = false;
        
        await preloadAllGameAssets();

        try {
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved.
                }
            });
            window.recaptchaVerifier.render(); // Render the invisible reCAPTCHA
        } catch (error) {
            console.error("Error setting up reCAPTCHA", error);
            showMessage("Could not set up phone sign-in. Please refresh.", "error", true);
        }

        preLoader.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 500)); 
        preLoader.style.display = 'none';
        gameContent.style.display = 'flex'; 
    }

    if (user) {
        currentUser = user;
        await loadUserData(user.uid);
        showView(packView, 'nav-packs');
    } else {
        currentUser = null;
        showView(authView); 
    }
});


// Loads user data from Firestore
async function loadUserData(userId) {
    const userRef = db.collection('users').doc(userId);
    try {
        const doc = await userRef.get();
        if (doc.exists) {
            const data = doc.data();
            collectedCardIds = new Set(data.collectedCardIds || []);
            playerDeckIds = data.playerDeckIds || [];
            cryptidCoins = data.cryptidCoins || 0;
            packsOpened = data.packsOpened || 0;
            gamesPlayed = data.gamesPlayed || 0;
            
            updateCoinDisplay();
            updateDeckSizeDisplay();
            showSettings();
        } else {
            console.log("No such document! Creating one for new user.");
            await createNewUserDocument(auth.currentUser);
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        showMessage("Could not load your game data. Please try again.", "error", true);
    }
}

// Creates a new user document in Firestore with default values
async function createNewUserDocument(user) {
    const userRef = db.collection('users').doc(user.uid);
    const newUser = {
        uid: user.uid,
        email: user.email,
        phoneNumber: user.phoneNumber,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        collectedCardIds: [],
        playerDeckIds: [],
        cryptidCoins: 200,
        packsOpened: 0,
        gamesPlayed: 0
    };
    await userRef.set(newUser);
    await loadUserData(user.uid);
}

// Sign in with Google
function signInWithGoogle() {
    auth.signInWithPopup(googleProvider)
        .then(async (result) => {
            const user = result.user;
            const userRef = db.collection('users').doc(user.uid);
            const doc = await userRef.get();
            if (!doc.exists) {
                await createNewUserDocument(user);
            }
            showMessage('Signed in with Google!', 'success', true);
        }).catch((error) => {
            showMessage(error.message, 'error', true);
        });
}

// --- PHONE AUTHENTICATION ---
function signInWithPhone() {
    const phoneNumberInput = document.getElementById('phoneNumberInput');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const appVerifier = window.recaptchaVerifier;
    const phoneNumber = phoneNumberInput.value;

    if (!phoneNumber || !/^\+[1-9]\d{1,14}$/.test(phoneNumber)) {
        showMessage("Please enter a valid phone number in E.164 format (e.g., +15551234567).", "error", true);
        return;
    }

    sendCodeBtn.disabled = true;
    sendCodeBtn.innerText = "Sending...";

    auth.signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            showMessage("Verification code sent!", "success", true);
            document.getElementById('verificationContainer').style.display = 'flex';
            phoneNumberInput.disabled = true;
            sendCodeBtn.style.display = 'none';
        }).catch((error) => {
            console.error('Error during signInWithPhoneNumber', error);
            showMessage(error.message, 'error', true);
            // Reset reCAPTCHA to allow retries
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.render().then(function(widgetId) {
                    grecaptcha.reset(widgetId);
                });
            }
            sendCodeBtn.disabled = false;
            sendCodeBtn.innerText = "Send Code";
        });
}

function verifyCode() {
    const code = document.getElementById('verificationCodeInput').value;
    const verifyBtn = document.getElementById('verifyCodeBtn');

    if (!code || code.length !== 6) {
        showMessage("Please enter the 6-digit verification code.", "warning", true);
        return;
    }

    verifyBtn.disabled = true;
    verifyBtn.innerText = "Verifying...";

    window.confirmationResult.confirm(code).then(async (result) => {
        const user = result.user;
        showMessage(`Welcome! Signed in successfully.`, 'success', true);
        
        const userRef = db.collection('users').doc(user.uid);
        const doc = await userRef.get();
        if (!doc.exists) {
            await createNewUserDocument(user);
        }
        // onAuthStateChanged handles UI switch
    }).catch((error) => {
        console.error('Error verifying code', error);
        showMessage("Invalid code. Please try again.", "error", true);
        verifyBtn.disabled = false;
        verifyBtn.innerText = "Verify & Sign In";
    });
}


// Logout the current user
function logout() {
    auth.signOut().then(() => {
        showMessage('You have been logged out.', 'success', true);
    }).catch((error) => {
        showMessage(error.message, 'error', true);
    });
}

// --- ASSET PRELOADING ---
async function preloadAllGameAssets() {
    const loadingText = document.getElementById('loading-text');
    loadingText.innerText = 'Loading game assets...';

    const imageUrls = [
        'https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/background.png',
        'https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/back_of_card.png',
    ];

    allCryptids.forEach(cryptid => {
        if (cryptid.image) {
            imageUrls.push(cryptid.image);
        }
    });

    let loadedCount = 0;
    const totalImages = imageUrls.length;
    
    loadingText.innerText = `Loading 0/${totalImages} assets...`;

    return new Promise((resolve) => {
        if (totalImages === 0) {
            resolve();
            return;
        }
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            img.onload = img.onerror = () => {
                loadedCount++;
                loadingText.innerText = `Loading ${loadedCount}/${totalImages} assets...`;
                if (loadedCount === totalImages) {
                    resolve();
                }
            };
        });
    });
}

// --- UTILITY & SETUP FUNCTIONS ---
function updateCoinDisplay() {
    const coinBalanceEl = document.getElementById('coinBalance');
    if(coinBalanceEl) {
        coinBalanceEl.innerText = cryptidCoins;
    }
}

function updateDeckSizeDisplay() {
    const currentSizeElement = document.getElementById("currentDeckSize");
    const maxSizeElement = document.getElementById("maxDeckSize");
    if (currentSizeElement && maxSizeElement) {
        currentSizeElement.innerText = playerDeckIds.length;
        maxSizeElement.innerText = MAX_DECK_SIZE;
    }
}

function getRarity() {
    const roll = Math.random();
    if (roll < 0.005) return "mythic";
    if (roll < 0.05) return "legendary";
    if (roll < 0.25) return "rare";
    return "common";
}

function getRandomCryptid(desiredRarity) {
    const availableCryptids = allCryptids.filter(c => c.rarity === desiredRarity);
    if (availableCryptids.length === 0) {
        return allCryptids[Math.floor(Math.random() * allCryptids.length)];
    }
    return availableCryptids[Math.floor(Math.random() * availableCryptids.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCardElement(cryptid, isCollected = true, showFrontImmediately = false) {
    const cardWrapper = document.createElement("div");
    cardWrapper.className = `card-wrapper ${cryptid ? cryptid.rarity : ''}`;
    cardWrapper.dataset.cryptidId = cryptid ? cryptid.id : 'uncollected';

    if (cryptid && cryptid.rarity === 'mythic') {
        cardWrapper.classList.add('mythic-animation');
    }

    const cardInner = document.createElement("div");
    cardInner.className = `card-inner`;

    if (isCollected && cryptid) {
        const cardBack = document.createElement("div");
        cardBack.className = `card-face card-back`;

        const cardFront = document.createElement("div");
        cardFront.className = `card-face card-front`;
        cardFront.style.backgroundImage = `url('${cryptid.image}')`;

        const cardContent = document.createElement("div");
        cardContent.className = 'card-content';

        const hpDisplay = document.createElement('div');
        hpDisplay.className = 'stat-display hp-display';
        hpDisplay.innerHTML = `<svg viewBox="0 0 24 24" fill="#f56565"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><span>${cryptid.hp}</span>`;
        cardContent.appendChild(hpDisplay);

        const attackDisplay = document.createElement('div');
        attackDisplay.className = 'stat-display attack-display';
        attackDisplay.innerHTML = `<svg viewBox="0 0 24 24" fill="#63b3ed"><path d="M20.7,5.3l-2-2c-0.4-0.4-1-0.4-1.4,0L12,8.6L6.7,3.3c-0.4-0.4-1-0.4-1.4,0l-2,2c-0.4,0.4-0.4,1,0,1.4L8.6,12l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4l2,2c0.4,0.4,1,0.4,1.4,0L12,15.4l5.3,5.3c0.4,0.4,1,0.4,1.4,0l2-2c0.4-0.4,0.4-1,0-1.4L15.4,12l5.3-5.3C21.1,6.3,21.1,5.7,20.7,5.3z"/></svg><span>${cryptid.attack.damage}</span>`;
        cardContent.appendChild(attackDisplay);

        const namePlate = document.createElement('div');
        namePlate.className = 'name-plate';
        namePlate.innerText = cryptid.name;
        cardContent.appendChild(namePlate);

        cardFront.appendChild(cardContent);
        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);

        if (showFrontImmediately) {
            cardInner.style.transform = 'rotateY(180deg)';
        }

    } else {
        cardWrapper.classList.add("uncollected-card");
    }

    cardWrapper.appendChild(cardInner);
    return cardWrapper;
}

// --- MESSAGE DISPLAY ---
function showMessage(message, type = "info", isGlobal = false) {
    const messageEl = isGlobal ? document.getElementById('globalMessage') : document.getElementById('gameMessage');
    if (!messageEl) return; 

    messageEl.innerText = message;
    const baseClass = isGlobal ? 'global-message' : 'game-message';
    messageEl.className = `${baseClass} ${type}`;

    if (isGlobal) {
        messageEl.classList.add('show');
        clearTimeout(globalMessageTimeout);
        globalMessageTimeout = setTimeout(() => {
            messageEl.classList.remove('show');
        }, 3500);
    } else {
        clearTimeout(messageTimeout);
        if (type !== "game-end") { 
            messageTimeout = setTimeout(() => {
                messageEl.innerText = '';
                messageEl.className = 'game-message';
            }, 3000);
        }
    }
}

// --- VIEW SWITCHING ---
const homeView = document.getElementById('homeView');
const authView = document.getElementById('authView');
const packView = document.getElementById('packView');
const collectionView = document.getElementById('collectionView');
const deckBuilderView = document.getElementById('deckBuilderView');
const gameView = document.getElementById('gameView');
const settingsView = document.getElementById('settingsView');
const bottomNav = document.getElementById('bottom-nav');

function showView(viewElement, navBtnId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    viewElement.classList.add('active');

    if(viewElement === authView || viewElement === homeView){
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
    }

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if(navBtnId){
        document.getElementById(navBtnId).classList.add('active');
    }

    if (viewElement === collectionView) showCollection();
    else if (viewElement === deckBuilderView) renderDeckBuilderCards();
    else if (viewElement === settingsView) showSettings();
    else if (viewElement === packView) updateCoinDisplay();
}

function showPackView() { showView(packView, 'nav-packs'); }
function showCollectionView() { showView(collectionView, 'nav-collection'); }
function showDeckBuilderView() { showView(deckBuilderView, 'nav-deck'); }
function showSettingsView() { showView(settingsView, 'nav-settings'); }

function showSettings() {
    if (!currentUser) return;
    const contactInfo = currentUser.email || currentUser.phoneNumber || 'N/A';
    document.getElementById('settings-email').innerText = contactInfo;
    document.getElementById('settings-userid').innerText = currentUser.uid || 'N/A';
}

// --- PACK OPENING ---
async function openPack() {
    if (!currentUser) return;
    if (cryptidCoins < PACK_COST) {
        showMessage(`You need ${PACK_COST} Cryptid Coins to open a pack!`, "error", true);
        return;
    }

    const newCoins = cryptidCoins - PACK_COST;
    const newPacksOpened = packsOpened + 1;

    const container = document.getElementById("packCardContainer");
    container.innerHTML = ""; 
    
    let cardsInPack = [];
    for (let i = 0; i < 5; i++) {
        const rarity = getRarity();
        const cryptid = getRandomCryptid(rarity);
        cardsInPack.push(cryptid);
    }
    
    const newCardIds = cardsInPack.map(c => c.id);
    const updatedCollectedCardIds = Array.from(new Set([...collectedCardIds, ...newCardIds]));

    const userRef = db.collection('users').doc(currentUser.uid);
    try {
        await userRef.update({
            cryptidCoins: newCoins,
            packsOpened: newPacksOpened,
            collectedCardIds: updatedCollectedCardIds
        });
        cryptidCoins = newCoins;
        packsOpened = newPacksOpened;
        collectedCardIds = new Set(updatedCollectedCardIds);
        updateCoinDisplay();
    } catch (error) {
        console.error("Error opening pack:", error);
        showMessage("Failed to open pack. Please try again.", "error", true);
        return;
    }

    cardsInPack.forEach((cryptid, i) => {
        const cardWrapper = createCardElement(cryptid, true, false);
        container.appendChild(cardWrapper);
        setTimeout(() => {
            cardWrapper.classList.add("show");
            setTimeout(() => cardWrapper.classList.add("flipped"), 500);
        }, 200 * i);
    });
}

// --- COLLECTION VIEW ---
function showCollection() {
    const container = document.getElementById("collectionCardContainer");
    container.innerHTML = "";
    const rarityOrder = ["mythic", "legendary", "rare", "common"];
    const cryptidsByRarity = { mythic: [], legendary: [], rare: [], common: [] };

    allCryptids.forEach(c => {
        if (cryptidsByRarity[c.rarity]) {
            cryptidsByRarity[c.rarity].push(c);
        }
    });

    rarityOrder.forEach(rarity => {
        if (rarity === 'mythic' && !collectedCardIds.has('snallygaster')) {
            return; 
        }

        const cryptidsInThisRarity = cryptidsByRarity[rarity].sort((a, b) => a.name.localeCompare(b.name));
        if (cryptidsInThisRarity.length > 0) {
            const rarityGroupDiv = document.createElement("div");
            rarityGroupDiv.className = `collection-rarity-group ${rarity}`;
            const heading = document.createElement("h2");
            heading.innerText = `${rarity.charAt(0).toUpperCase() + rarity.slice(1)} Cryptids`;
            rarityGroupDiv.appendChild(heading);
            const cardsGrid = document.createElement("div");
            cardsGrid.className = "cards-grid";
            cryptidsInThisRarity.forEach(cryptid => {
                const isCollected = collectedCardIds.has(cryptid.id);
                const cardWrapper = createCardElement(cryptid, isCollected, true);
                cardWrapper.classList.add("show");
                cardsGrid.appendChild(cardWrapper);
            });
            rarityGroupDiv.appendChild(cardsGrid);
            container.appendChild(rarityGroupDiv);
        }
    });
}

// --- DECK BUILDER ---
function renderDeckBuilderCards() {
    const container = document.getElementById("deckBuilderCardsContainer");
    container.innerHTML = "";
    const collectedCryptids = allCryptids.filter(c => collectedCardIds.has(c.id)).sort((a,b) => a.name.localeCompare(b.name));
    
    collectedCryptids.forEach(cryptid => {
        const cardWrapper = createCardElement(cryptid, true, true);
        cardWrapper.classList.add("deck-builder-card");
        if (playerDeckIds.includes(cryptid.id)) {
            cardWrapper.classList.add("selected");
        }
        cardWrapper.onclick = () => toggleCardInDeck(cryptid.id);
        container.appendChild(cardWrapper);
    });
     updateDeckSizeDisplay();
}

function toggleCardInDeck(cryptidId) {
    const index = playerDeckIds.indexOf(cryptidId);
    if (index > -1) {
        playerDeckIds.splice(index, 1);
    } else {
        if (playerDeckIds.length < MAX_DECK_SIZE) {
            playerDeckIds.push(cryptidId);
        } else {
            showMessage("Deck is full! Max " + MAX_DECK_SIZE + " cards.", "warning", true);
        }
    }
    document.querySelector(`.deck-builder-card[data-cryptid-id="${cryptidId}"]`).classList.toggle('selected', playerDeckIds.includes(cryptidId));
    updateDeckSizeDisplay();
}

async function saveDeck() {
    if (!currentUser) return;
    if (playerDeckIds.length !== MAX_DECK_SIZE) {
        showMessage("Your deck must contain exactly " + MAX_DECK_SIZE + " cards.", "warning", true);
        return;
    }
    
    const userRef = db.collection('users').doc(currentUser.uid);
    try {
        await userRef.update({ playerDeckIds: playerDeckIds });
        showMessage("Deck saved successfully!", "success", true);
    } catch (error) {
        console.error("Error saving deck: ", error);
        showMessage("Failed to save deck. Please try again.", "error", true);
    }
}

// --- GAME LOGIC ---
function tryStartGame() {
    if (playerDeckIds.length !== MAX_DECK_SIZE) {
        showMessage("Please build and save a deck of " + MAX_DECK_SIZE + " cards first!", "error", true);
        return;
    }
    startGame();
}

function startGame() {
    showView(gameView, 'nav-battle');
    showMessage("Game Started! Select a card to play.", "info");

    playerHP = 100;
    botHP = 100;
    currentTurn = 1;
    playerCardInPlay = null;
    botCardInPlay = null;
    selectedPlayerCardData = null;
    selectedPlayerCardElement = null;

    playerDeck = playerDeckIds.map(id => ({...allCryptids.find(c => c.id === id)}));
    shuffleArray(playerDeck);
    
    const botCardPool = gamesPlayed < 10 
        ? allCryptids.filter(c => c.rarity === 'common' || c.rarity === 'rare')
        : allCryptids.filter(c => c.rarity !== 'mythic');

    botDeck = [...botCardPool].map(c => ({...c}));
    shuffleArray(botDeck);
    botDeck = botDeck.slice(0, MAX_DECK_SIZE);

    playerHand = [];
    botHand = [];
    for (let i = 0; i < 3; i++) {
        if (playerDeck.length > 0) playerHand.push(playerDeck.shift());
        if (botDeck.length > 0) botHand.push(botDeck.shift());
    }

    updateGameUI();
    document.getElementById('playCardBtn').disabled = false;
}

function updateGameUI() {
    document.getElementById('playerHP').innerText = playerHP;
    document.getElementById('botHP').innerText = botHP;
    document.getElementById('turnCounter').innerText = `${currentTurn} / ${MAX_TURNS}`;

    const playerHandContainer = document.getElementById('playerHand');
    playerHandContainer.innerHTML = '';
    playerHand.forEach(card => {
        const cardEl = createCardElement(card, true, true);
        cardEl.onclick = () => selectPlayerCard(card, cardEl);
        if(selectedPlayerCardData && selectedPlayerCardData.id === card.id) {
            cardEl.classList.add('selected');
        }
        playerHandContainer.appendChild(cardEl);
    });

    const botHandContainer = document.getElementById('botHand');
    botHandContainer.innerHTML = '';
    botHand.forEach(card => {
        const cardEl = createCardElement(card, true, false);
        botHandContainer.appendChild(cardEl);
    });

    const playerInPlayContainer = document.getElementById('playerInPlay');
    playerInPlayContainer.innerHTML = '';
    if (playerCardInPlay) {
        playerInPlayContainer.appendChild(createCardElement(playerCardInPlay, true, true));
    }

    const botInPlayContainer = document.getElementById('botInPlay');
    botInPlayContainer.innerHTML = '';
    if (botCardInPlay) {
        botInPlayContainer.appendChild(createCardElement(botCardInPlay, true, true));
    }
}

function selectPlayerCard(cardData, cardElement) {
    if (selectedPlayerCardElement) {
        selectedPlayerCardElement.classList.remove('selected');
    }
    selectedPlayerCardData = cardData;
    selectedPlayerCardElement = cardElement;
    selectedPlayerCardElement.classList.add('selected');
}

function playPlayerCard() {
    if (!selectedPlayerCardData) {
        showMessage("Please select a card from your hand to play!", "warning");
        return;
    }

    playerCardInPlay = selectedPlayerCardData;
    playerHand = playerHand.filter(card => card.id !== selectedPlayerCardData.id);
    selectedPlayerCardData = null;
    selectedPlayerCardElement = null;

    if (botHand.length > 0) {
        botCardInPlay = botHand.shift();
    } else {
        botCardInPlay = null;
    }
    
    document.getElementById('playCardBtn').disabled = true;

    performCombat();
    updateGameUI();
    
    setTimeout(() => endTurn(), 2500);
}

function performCombat() {
    let message = "";
    if (playerCardInPlay && botCardInPlay) {
        if (playerCardInPlay.rarity === 'mythic' && botCardInPlay.rarity !== 'mythic') {
            botHP = 0;
            message = `${playerCardInPlay.name}'s Apex Predator ability instantly defeats ${botCardInPlay.name}!`;
        } else {
            botHP -= playerCardInPlay.attack.damage;
            playerHP -= botCardInPlay.attack.damage;
            message = `${playerCardInPlay.name} uses ${playerCardInPlay.attack.name} for ${playerCardInPlay.attack.damage} damage! ${botCardInPlay.name} uses ${botCardInPlay.attack.name} for ${botCardInPlay.attack.damage} damage!`;
        }
    } else if (playerCardInPlay) {
        botHP -= playerCardInPlay.attack.damage;
        message = `${playerCardInPlay.name} attacks the Bot directly with ${playerCardInPlay.attack.name} for ${playerCardInPlay.attack.damage} damage!`;
    }
    showMessage(message, "info");
}

function endTurn() {
    if (checkGameEnd()) return;

    currentTurn++;
    playerCardInPlay = null;
    botCardInPlay = null;

    if (playerDeck.length > 0 && playerHand.length < 5) playerHand.push(playerDeck.shift());
    if (botDeck.length > 0 && botHand.length < 5) botHand.push(botDeck.shift());
    
    if(checkGameEnd()) return;

    updateGameUI();
    showMessage(`Turn ${currentTurn} begins!`, "info");
    document.getElementById('playCardBtn').disabled = false;
}

async function checkGameEnd() {
    let gameIsOver = false;
    let finalMessage = "";
    let modalClass = "";
    let title = "Game Over!";
    let isVictory = false;

    if (playerHP <= 0 || botHP <= 0 || currentTurn > MAX_TURNS) {
        gameIsOver = true;
        const newGamesPlayed = gamesPlayed + 1;
        let newCoinTotal = cryptidCoins;

        if (playerHP <= 0 && botHP <= 0) { finalMessage = "It's a draw!"; modalClass = "draw"; } 
        else if (playerHP <= 0) { finalMessage = "You were defeated!"; modalClass = "defeat"; title = "Defeat!"; } 
        else if (botHP <= 0) { finalMessage = "You are victorious!"; modalClass = "victory"; title = "Victory!"; isVictory = true; } 
        else if (currentTurn > MAX_TURNS) {
            finalMessage = "Max turns reached. ";
            if (playerHP > botHP) { finalMessage += "You win by HP advantage!"; modalClass = "victory"; title = "Victory!"; isVictory = true; } 
            else if (botHP > playerHP) { finalMessage += "Bot wins by HP advantage!"; modalClass = "defeat"; title = "Defeat!"; } 
            else { finalMessage += "It's a draw!"; modalClass = "draw"; }
        }

        if(isVictory){
            newCoinTotal += WIN_REWARD;
            finalMessage += ` You earned ${WIN_REWARD} Cryptid Coins!`;
        }
        
        const userRef = db.collection('users').doc(currentUser.uid);
        try {
            await userRef.update({
                gamesPlayed: newGamesPlayed,
                cryptidCoins: newCoinTotal
            });
            gamesPlayed = newGamesPlayed;
            cryptidCoins = newCoinTotal;
            updateCoinDisplay();
        } catch (error) {
            console.error("Error saving game results:", error);
        }

        showGameEndModal(title, finalMessage, modalClass);
        return true;
    }
    return false;
}

function showGameEndModal(title, message, outcomeClass) {
    const modal = document.getElementById('gameEndModal');
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalMessage').innerText = message;
    modal.querySelector('.modal-content').className = 'modal-content ' + outcomeClass;
    
    document.getElementById('modalPlayAgain').onclick = () => { modal.classList.remove('show'); startGame(); };
    document.getElementById('modalMainMenu').onclick = () => { modal.classList.remove('show'); showPackView(); };

    modal.classList.add('show');
}

function showDeleteModal() {
    document.getElementById('deleteAccountModal').classList.add('show');
}

async function confirmDeleteAccount() {
    if (!currentUser) return;

    const userRef = db.collection('users').doc(currentUser.uid);
    try {
        await userRef.delete();
        await currentUser.delete();
        
        showMessage("Account deleted successfully.", "success", true);
    } catch (error) {
        console.error("Error deleting account:", error);
        showMessage("Error deleting account. You may need to log out and log back in again before retrying.", "error", true);
    } finally {
        document.getElementById('deleteAccountModal').classList.remove('show');
    }
}
