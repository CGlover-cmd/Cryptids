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
    { id: 'mokele-mbembe', name: "Mokele-mbembe", rarity: "rare", hp: 75, attack: { name: "River Charge", damage: 16 }, effect: "Amphibious Hide: Reduces incoming damage from 'common' cards by 5.", image: "https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/mokele-mbembe.png" }
];

// --- STATE MANAGEMENT ---
let collectedCardIds;
let playerDeckIds;
let cryptidCoins;
let packsOpened;
let gamesPlayed;
let currentUserId = null;
let currentUsername = null;

const PACK_COST = 50;
const WIN_REWARD = 10;
const MAX_DECK_SIZE = 10;
const MAX_TURNS = 20;

// Game State Variables (declared globally)
let playerHP, botHP, currentTurn, playerCardInPlay, botCardInPlay;
let playerDeck, botDeck, playerHand, botHand;
let selectedPlayerCardData = null;
let selectedPlayerCardElement = null;
let messageTimeout, globalMessageTimeout;

function loadGameData(userId) {
    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    const userData = Object.values(allUsers).find(u => u.id === userId);

    if (userData) {
        const username = Object.keys(allUsers).find(key => allUsers[key].id === userId);
        currentUsername = username;
        collectedCardIds = new Set(userData.collectedCardIds || []);
        playerDeckIds = userData.playerDeckIds || [];
        cryptidCoins = userData.cryptidCoins || 0;
        packsOpened = userData.packsOpened || 0;
        gamesPlayed = userData.gamesPlayed || 0;
    }
}

function saveGameData() {
    if (!currentUserId || !currentUsername) return;
    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    
    if (allUsers[currentUsername]) {
        allUsers[currentUsername].collectedCardIds = Array.from(collectedCardIds);
        allUsers[currentUsername].playerDeckIds = playerDeckIds;
        allUsers[currentUsername].cryptidCoins = cryptidCoins;
        allUsers[currentUsername].packsOpened = packsOpened;
        allUsers[currentUsername].gamesPlayed = gamesPlayed;
        localStorage.setItem('cryptid_users', JSON.stringify(allUsers));
    }
}

// --- ASSET PRELOADING ---
function preloadImages() {
    const loadingText = document.getElementById('loading-text');
    loadingText.innerText = 'Loading essential assets...';
    const imageUrls = [
        'https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/background.png',
        'https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/back_of_card.png',
        'https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/title_screen_169.jpg',
        'https://cdn.jsdelivr.net/gh/cglover-cmd/cryptids@main/photos/title_screen_mobile.jpg',
        'https://i.imgur.com/8i1a2Vp.jpg'
    ];

    let loadedCount = 0;
    const totalImages = imageUrls.length;

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
    if (roll < 0.05) return "legendary"; // 5% chance
    if (roll < 0.25) return "rare";     // 20% chance
    return "common";                    // 75% chance
}

function getNewRandomCryptid(rarity, currentlyDrawnIds) {
    // Find cards of the desired rarity that are NOT yet collected AND not already in the current pack being drawn
    let available = allCryptids.filter(c => c.rarity === rarity && !collectedCardIds.has(c.id) && !currentlyDrawnIds.includes(c.id));
    
    // If no uncollected cards of this rarity are left, fall back to any card of this rarity not in the current pack
    if (available.length === 0) {
        available = allCryptids.filter(c => c.rarity === rarity && !currentlyDrawnIds.includes(c.id));
    }

    // If still no cards (highly unlikely unless the card pool is tiny), just return a random one of the rarity
    if (available.length === 0) {
        available = allCryptids.filter(c => c.rarity === rarity);
    }

    return available[Math.floor(Math.random() * available.length)];
}


function getRandomCryptid(desiredRarity) {
    const availableCryptids = allCryptids.filter(c => c.rarity === desiredRarity);
    if (availableCryptids.length === 0) {
        console.warn(`No cryptids found for rarity: ${desiredRarity}. Returning a random cryptid.`);
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
    if (isCollected && cryptid) {
        cardWrapper.className = `card-wrapper ${cryptid.rarity}`;
    } else {
        cardWrapper.className = 'card-wrapper';
    }
    cardWrapper.dataset.cryptidId = cryptid ? cryptid.id : 'uncollected';

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
        hpDisplay.innerHTML = `
            <svg viewBox="0 0 24 24" fill="#f56565"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span>${cryptid.hp}</span>
        `;
        cardContent.appendChild(hpDisplay);

        const attackDisplay = document.createElement('div');
        attackDisplay.className = 'stat-display attack-display';
        attackDisplay.innerHTML = `
            <svg viewBox="0 0 24 24" fill="#63b3ed"><path d="M20.7,5.3l-2-2c-0.4-0.4-1-0.4-1.4,0L12,8.6L6.7,3.3c-0.4-0.4-1-0.4-1.4,0l-2,2c-0.4,0.4-0.4,1,0,1.4L8.6,12l-5.3,5.3c-0.4,0.4-0.4,1,0,1.4l2,2c0.4,0.4,1,0.4,1.4,0L12,15.4l5.3,5.3c0.4,0.4,1,0.4,1.4,0l2-2c0.4-0.4,0.4-1,0-1.4L15.4,12l5.3-5.3C21.1,6.3,21.1,5.7,20.7,5.3z"/></svg>
            <span>${cryptid.attack.damage}</span>
        `;
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
const loadingView = document.getElementById('loadingView');
const packView = document.getElementById('packView');
const collectionView = document.getElementById('collectionView');
const deckBuilderView = document.getElementById('deckBuilderView');
const gameView = document.getElementById('gameView');
const settingsView = document.getElementById('settingsView');
const bottomNav = document.getElementById('bottom-nav');

function showView(viewElement, navBtnId) {
    document.querySelectorAll('.view').forEach(view => view.classList.remove('active'));
    viewElement.classList.add('active');

    // Show or hide nav bar
    if(viewElement === authView || viewElement === loadingView || viewElement === homeView){
        bottomNav.style.display = 'none';
    } else {
        bottomNav.style.display = 'flex';
    }

    // Update active state on nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    if(navBtnId){
        document.getElementById(navBtnId).classList.add('active');
    }

    // Run view-specific logic
    if (viewElement === collectionView) showCollection();
    else if (viewElement === deckBuilderView) renderDeckBuilderCards();
    else if (viewElement === settingsView) showSettings();
    else if (viewElement === packView) {
        updateCoinDisplay();
        const titleEl = document.getElementById('pack-opening-title');
        if (packsOpened < 2) {
            titleEl.innerText = `Starter Pack (${packsOpened + 1}/2)`;
        } else {
            titleEl.innerText = 'Cryptid Pack Opening';
        }
    }
}

function showAuthView() { 
    showView(authView, null);
    if (typeof google !== 'undefined') {
        google.accounts.id.prompt(); // Show one-tap prompt if available
    }
}
function showPackView() { showView(packView, 'nav-packs'); }
function showCollectionView() { showView(collectionView, 'nav-collection'); }
function showDeckBuilderView() { showView(deckBuilderView, 'nav-deck'); }
function showSettingsView() { showView(settingsView, 'nav-settings'); }

function showSettings() {
    document.getElementById('settings-username').innerText = currentUsername || 'N/A';
    document.getElementById('settings-userid').innerText = currentUserId || 'N/A';
}

// --- PACK OPENING ---
async function openPack() {
    if (cryptidCoins < PACK_COST) {
        showMessage(`You need ${PACK_COST} Cryptid Coins to open a pack!`, "error", true);
        return;
    }

    cryptidCoins -= PACK_COST;
    updateCoinDisplay();

    const container = document.getElementById("packCardContainer");
    container.innerHTML = ""; 
    
    let cardsInPack = [];
    
    if (packsOpened < 2) {
        // Starter pack logic
        let drawnIds = [];
        for(let i=0; i<2; i++) {
            const card = getNewRandomCryptid('rare', drawnIds);
            if(card) {
                cardsInPack.push(card);
                drawnIds.push(card.id);
            }
        }
        for(let i=0; i<3; i++) {
            const card = getNewRandomCryptid('common', drawnIds);
            if(card) {
                cardsInPack.push(card);
                drawnIds.push(card.id);
            }
        }
        shuffleArray(cardsInPack);

    } else {
        // Regular pack logic
        for (let i = 0; i < 5; i++) {
            const rarity = getRarity();
            const cryptid = getRandomCryptid(rarity);
            cardsInPack.push(cryptid);
        }
    }
    
    cardsInPack.forEach(cryptid => collectedCardIds.add(cryptid.id));
    packsOpened++;
    await saveGameData(); // Save immediately

    // Display the cards from the generated pack
    cardsInPack.forEach((cryptid, i) => {
        const cardWrapper = createCardElement(cryptid, true, false);
        container.appendChild(cardWrapper);

        setTimeout(() => {
            cardWrapper.classList.add("show");
            setTimeout(() => {
                cardWrapper.classList.add("flipped");
            }, 500);
        }, 200 * i);
    });
    
    // Update the title if starter packs are finished
    if (packsOpened >= 2) {
        document.getElementById('pack-opening-title').innerText = 'Cryptid Pack Opening';
    }
}

// --- COLLECTION VIEW ---
function showCollection() {
    const container = document.getElementById("collectionCardContainer");
    container.innerHTML = "";
    const rarityOrder = ["legendary", "rare", "common"];
    const cryptidsByRarity = { legendary: [], rare: [], common: [] };

    allCryptids.forEach(c => cryptidsByRarity[c.rarity].push(c));

    rarityOrder.forEach(rarity => {
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
    if (playerDeckIds.length === MAX_DECK_SIZE) {
        await saveGameData();
        showMessage("Deck saved successfully!", "success", true);
    } else {
        showMessage("Your deck must contain exactly " + MAX_DECK_SIZE + " cards.", "warning", true);
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
    
    // Bot difficulty scaling
    const botCardPool = gamesPlayed < 10 
        ? allCryptids.filter(c => c.rarity === 'common' || c.rarity === 'rare')
        : allCryptids;

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
    
    // Disable the play button immediately to prevent multiple plays
    document.getElementById('playCardBtn').disabled = true;

    performCombat();
    updateGameUI();
    
    // After a delay, proceed to the next turn automatically
    setTimeout(() => {
        endTurn();
    }, 2500); // 2.5 second delay to see combat results
}

function performCombat() {
    let message = "";
    if (playerCardInPlay && botCardInPlay) {
        botHP -= playerCardInPlay.attack.damage;
        playerHP -= botCardInPlay.attack.damage;
        message = `${playerCardInPlay.name} uses ${playerCardInPlay.attack.name} for ${playerCardInPlay.attack.damage} damage! ${botCardInPlay.name} uses ${botCardInPlay.attack.name} for ${botCardInPlay.attack.damage} damage!`;
    } else if (playerCardInPlay) {
        botHP -= playerCardInPlay.attack.damage;
        message = `${playerCardInPlay.name} attacks the Bot directly with ${playerCardInPlay.attack.name} for ${playerCardInPlay.attack.damage} damage!`;
    }
    showMessage(message, "info");
}

function endTurn() {
    // First, check if the game ended from the last combat
    if (checkGameEnd()) return;

    // If not, proceed with the turn
    currentTurn++;
    playerCardInPlay = null;
    botCardInPlay = null;

    if (playerDeck.length > 0 && playerHand.length < 5) playerHand.push(playerDeck.shift());
    if (botDeck.length > 0 && botHand.length < 5) botHand.push(botDeck.shift());
    
    // Check if the game ends due to turn limit or other conditions *after* advancing the turn
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
        gamesPlayed++; // Increment games played counter
        
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
            cryptidCoins += WIN_REWARD;
            finalMessage += ` You earned ${WIN_REWARD} Cryptid Coins!`;
            updateCoinDisplay();
        }
        
        await saveGameData(); // Save game progress (coins, games played)
        showGameEndModal(title, finalMessage, modalClass);
        return true; // Game has ended
    }
    return false; // Game continues
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

// --- AUTHENTICATION FUNCTIONS (LOCAL STORAGE & GOOGLE) ---
function generateUniqueId() {
    return Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
}

async function onLoginSuccess(userId) {
    localStorage.setItem('cryptid_lastUser', userId);
    currentUserId = userId;
    // We are already on the loading screen, so we just load data
    await preloadImages();
    loadGameData(userId);
    updateDeckSizeDisplay();
    updateCoinDisplay();
    showPackView();
}

function handleCredentialResponse(response) {
    const decodedToken = JSON.parse(atob(response.credential.split('.')[1]));
    const googleId = decodedToken.sub;
    const googleName = decodedToken.name;

    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    let userData = Object.values(allUsers).find(u => u.googleId === googleId);
    
    if (userData) {
        // Existing Google user logs in
        onLoginSuccess(userData.id);
    } else {
        // New Google user registration
        let newUsername = googleName.replace(/\s/g, ''); // Remove spaces
        let counter = 1;
        while (allUsers[newUsername]) {
            newUsername = `${googleName.replace(/\s/g, '')}${counter}`;
            counter++;
        }
        
        const newUserId = generateUniqueId();
        allUsers[newUsername] = { 
            id: newUserId,
            googleId: googleId,
            password: null, // No password for Google-linked accounts
            collectedCardIds: [],
            playerDeckIds: [],
            cryptidCoins: 200,
            packsOpened: 0,
            gamesPlayed: 0
        };
        localStorage.setItem('cryptid_users', JSON.stringify(allUsers));
        onLoginSuccess(newUserId);
    }
}

function register() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Username and password cannot be empty.', 'error', true);
        return;
    }
    if (username === password) {
        showMessage('Username and password cannot be the same.', 'error', true);
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    if (allUsers[username]) {
        showMessage('An account with this username already exists.', 'error', true);
        return;
    }

    allUsers[username] = { 
        id: generateUniqueId(),
        password: password,
        collectedCardIds: [],
        playerDeckIds: [],
        cryptidCoins: 200, // New player bonus
        packsOpened: 0,
        gamesPlayed: 0
    };
    localStorage.setItem('cryptid_users', JSON.stringify(allUsers));
    showMessage('Registration successful! Please log in.', 'success', true);
};

async function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showMessage('Please enter both username and password.', 'error', true);
        return;
    }

    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    const userData = allUsers[username];

    if (userData && userData.googleId) {
        showMessage('This account is linked with Google. Please use Google Sign-In.', 'error', true);
        return;
    }

    if (userData && userData.password === password) {
        onLoginSuccess(userData.id);
    } else {
        showMessage('Invalid username or password.', 'error', true);
    }
};

function logout() {
    if (typeof google !== 'undefined') {
        google.accounts.id.disableAutoSelect();
    }
    localStorage.removeItem('cryptid_lastUser');
    currentUserId = null;
    currentUsername = null;
    document.getElementById('packCardContainer').innerHTML = ''; // Clear pack view on logout
    showAuthView();
    showMessage('You have been logged out.', 'success', true);
};

function showDeleteModal() {
    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    const currentUserData = allUsers[currentUsername];
    const modal = document.getElementById('deleteAccountModal');
    const messageEl = document.getElementById('delete-confirmation-message');
    const passwordContainer = document.getElementById('delete-password-container');

    if (currentUserData && currentUserData.googleId) {
        // Google User
        messageEl.innerText = "This action is irreversible. It will permanently delete all your game data and revoke this game's access to your Google Account. Are you sure you want to continue?";
        passwordContainer.style.display = 'none';
        document.getElementById('delete-password').value = ''; // Clear password field
    } else {
        // Password User
        messageEl.innerText = 'This action is irreversible. Please enter your password to confirm.';
        passwordContainer.style.display = 'block';
        document.getElementById('delete-password').value = ''; // Clear password field
    }

    modal.classList.add('show');
};

function confirmDeleteAccount() {
    const allUsers = JSON.parse(localStorage.getItem('cryptid_users') || '{}');
    const currentUserData = allUsers[currentUsername];

    if (!currentUserData) {
        showMessage('Could not find user data. Please try again.', 'error', true);
        return;
    }

    if (currentUserData.googleId) {
        // Google User Deletion Flow
        google.accounts.id.revoke(currentUserData.googleId, done => {
            if (done.successful) {
                // Find the key (username) of the user to delete
                const userKeyToDelete = Object.keys(allUsers).find(key => allUsers[key].id === currentUserId);
                if (userKeyToDelete) {
                    delete allUsers[userKeyToDelete];
                    localStorage.setItem('cryptid_users', JSON.stringify(allUsers));
                }
                document.getElementById('deleteAccountModal').classList.remove('show');
                logout(); // This already handles logging out and showing the auth screen
                showMessage('Account successfully deleted and permissions revoked.', 'success', true);
            } else {
                console.error('Google token revocation failed:', done.error);
                showMessage('Could not revoke Google permissions. Please try again or remove access manually from your Google account settings.', 'error', true);
            }
        });
    } else {
        // Password User Deletion Flow
        const password = document.getElementById('delete-password').value;
        if (currentUsername && currentUserData.password === password) {
            delete allUsers[currentUsername];
            localStorage.setItem('cryptid_users', JSON.stringify(allUsers));
            document.getElementById('deleteAccountModal').classList.remove('show');
            logout();
            showMessage('Account deleted successfully.', 'success', true);
        } else {
            showMessage('Incorrect password. Account not deleted.', 'error', true);
        }
    }
};

// --- INITIALIZATION ---
function enterGame() {
    const lastUserId = localStorage.getItem('cryptid_lastUser');
    showView(loadingView); // Show loading screen before checking for user
    if (lastUserId) {
        onLoginSuccess(lastUserId);
    } else {
        // If no last user, we still need to preload images for the auth screen
        preloadImages().then(() => {
            showAuthView();
        });
    }
}

function createEnterGameButton() {
    const homeViewContainer = document.getElementById('homeView');
    if (!homeViewContainer) return;

    const btn = document.createElement("button");
    btn.textContent = "Enter Game";
    // Setting styles via cssText as requested
    btn.style.cssText = `
        font-family: 'Special Elite', cursive;
        font-size: 1.3rem;
        padding: 14px 28px;
        border: none;
        border-radius: 12px;
        background: #4a1c1c;
        color: #dddddd;
        cursor: pointer;
        box-shadow: 0 0 10px rgba(255,0,0,0.3);
        animation: pulse 2.8s infinite;
    `;
    // Assign the click event
    btn.onclick = enterGame;
    
    homeViewContainer.appendChild(btn);
}

window.onload = async function () {
    // Show loading screen immediately
    showView(document.getElementById('loadingView'));

    // Preload all essential images
    await preloadImages();

    // Create the special "Enter Game" button
    createEnterGameButton();

    // Initialize Google Sign-In
    if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
            client_id: "736869974803-67gmolnoitirougo0fkpp06vfetpgndl.apps.googleusercontent.com",
            callback: handleCredentialResponse
        });
        google.accounts.id.renderButton(
            document.getElementById("googleSignInButton"),
            { theme: "outline", size: "large", text: "signin_with" } 
        );
    } else {
        console.error("Google GSI script failed to load.");
    }

    // Now that everything is loaded, show the home screen
    showView(document.getElementById('homeView'));
};
