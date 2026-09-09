// Game state
const gameState = {
    maxEnergy: 100,
    currentEnergy: 100,
    energyDrainRate: 10, // points per second for alien forms
    energyRechargeRate: 15, // points per second for human form
    currentState: 'Human',
    isCooldown: false,
    gameTime: 0
};

// DOM Elements
const energyFill = document.getElementById('energyFill');
const energyText = document.getElementById('energyText');
const energyStatus = document.getElementById('energyStatus');
const currentFormSpan = document.getElementById('currentForm');
const cooldownStatusSpan = document.getElementById('cooldownStatus');
const gameTimeSpan = document.getElementById('gameTime');
const transformBtns = document.querySelectorAll('.transform-btn');
const models = {
    Human: document.getElementById('humanModel'),
    Heatblast: document.getElementById('heatblastModel'),
    FourArms: document.getElementById('fourArmsModel'),
    XLR8: document.getElementById('xlr8Model')
};

// Initialize game
function init() {
    gameState.currentEnergy = gameState.maxEnergy;
    updateDisplay();
    setupEventListeners();
    gameLoop();
}

// Setup button event listeners
function setupEventListeners() {
    transformBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const state = btn.getAttribute('data-state');
            transformTo(state);
        });
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        const keyMap = {
            '0': 'Human',
            '1': 'Heatblast',
            '2': 'FourArms',
            '3': 'XLR8'
        };

        if (keyMap[e.key]) {
            transformTo(keyMap[e.key]);
        }
    });
}

// Transform to a specific form
function transformTo(newState) {
    // Can't transform if in cooldown
    if (gameState.isCooldown && newState !== 'Human') {
        showMessage('⚠️ Omnitrix is in cooldown! Recharge to full energy.');
        return;
    }

    // Can't transform to the same state
    if (gameState.currentState === newState) {
        return;
    }

    gameState.currentState = newState;
    updateCharacterModel();
    updateDisplay();
    showMessage(`🌟 Transformed to ${newState}!`);
}

// Handle energy management
function handleEnergy(deltaTime) {
    if (gameState.currentState !== 'Human') {
        // Drain energy for alien forms
        gameState.currentEnergy -= gameState.energyDrainRate * deltaTime;

        if (gameState.currentEnergy <= 0) {
            gameState.currentEnergy = 0;
            forceTimeout();
        }
    } else {
        // Recharge energy for human form
        if (gameState.currentEnergy < gameState.maxEnergy) {
            gameState.currentEnergy += gameState.energyRechargeRate * deltaTime;

            if (gameState.currentEnergy >= gameState.maxEnergy) {
                gameState.currentEnergy = gameState.maxEnergy;
                gameState.isCooldown = false;
                showMessage('✅ Omnitrix fully charged!');
            }
        }
    }
}

// Force timeout (auto-transform to human)
function forceTimeout() {
    gameState.currentState = 'Human';
    gameState.isCooldown = true;
    updateCharacterModel();
    updateDisplay();
    showMessage('⏰ Energy depleted! Reverting to human form.');
}

// Update character model display
function updateCharacterModel() {
    Object.keys(models).forEach(form => {
        if (form === gameState.currentState) {
            models[form].classList.add('active');
        } else {
            models[form].classList.remove('active');
        }
    });
}

// Update UI display
function updateDisplay() {
    // Energy bar
    const energyPercent = (gameState.currentEnergy / gameState.maxEnergy) * 100;
    energyFill.style.width = energyPercent + '%';
    energyText.textContent = `${Math.ceil(gameState.currentEnergy)}/${gameState.maxEnergy}`;

    // Energy status
    if (gameState.isCooldown) {
        energyStatus.textContent = '🔴 Cooldown - Recharging...';
        energyStatus.style.color = '#ff4444';
    } else if (gameState.currentEnergy < 30) {
        energyStatus.textContent = '⚠️ Low Energy';
        energyStatus.style.color = '#ffaa00';
    } else {
        energyStatus.textContent = '✅ Ready to Transform';
        energyStatus.style.color = '#00ff41';
    }

    // Current form
    currentFormSpan.textContent = gameState.currentState;

    // Cooldown status
    cooldownStatusSpan.textContent = gameState.isCooldown ? '⏸️ Cooling Down' : '✅ Ready';
    cooldownStatusSpan.style.color = gameState.isCooldown ? '#ff4444' : '#00ff41';

    // Update button states
    updateButtonStates();
}

// Update button disabled states
function updateButtonStates() {
    transformBtns.forEach(btn => {
        const state = btn.getAttribute('data-state');
        const isDisabled = gameState.isCooldown && state !== 'Human';
        btn.disabled = isDisabled;
    });
}

// Update game time
function updateGameTime() {
    gameState.gameTime += 0.1;
    const minutes = Math.floor(gameState.gameTime / 60);
    const seconds = Math.floor(gameState.gameTime % 60);
    gameTimeSpan.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Show temporary message
function showMessage(message) {
    // Create a temporary message element
    const messageEl = document.createElement('div');
    messageEl.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 255, 65, 0.9);
        color: #000;
        padding: 15px 25px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 1000;
        animation: slideDown 0.3s ease;
    `;
    messageEl.textContent = message;
    document.body.appendChild(messageEl);

    // Remove after 2 seconds
    setTimeout(() => {
        messageEl.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => messageEl.remove(), 300);
    }, 2000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Main game loop
function gameLoop() {
    const deltaTime = 0.016; // ~60 FPS

    // Update energy
    handleEnergy(deltaTime);

    // Update display
    updateDisplay();

    // Update game time
    updateGameTime();

    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Start the game
window.addEventListener('DOMContentLoaded', init);