// DOM Elements
const navItems = document.querySelectorAll('.nav-item');
const copyLinkBtn = document.getElementById('copy-link');
const shareProfileBtn = document.getElementById('share-profile');
const startTradingBtn = document.getElementById('start-trading');
const appCards = document.querySelectorAll('.app-card');
const connectWalletBtn = document.querySelector('.connect-wallet');

// Wallet balance elements
const walletBalanceEl = document.getElementById('wallet-balance');
const umotBalanceEl = document.getElementById('umot-balance');
const umosBalanceEl = document.getElementById('umos-balance');
const umooBalanceEl = document.getElementById('umoo-balance');

// Token data
const tokens = {
    UMOT: { balance: 0, price: 1.25 },
    UMOS: { balance: 0, price: 0.85 },
    UMOO: { balance: 0, price: 2.40 }
};

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set up navigation
    setupNavigation();
    
    // Initialize wallet with random balances
    initializeWallet();
    
    // Set up event listeners
    setupEventListeners();
});

/**
 * Sets up the navigation menu functionality
 */
function setupNavigation() {
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Prevent default only if it's an anchor link
            if (e.target.tagName === 'A') {
                e.preventDefault();
            }
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Scroll to section (simplified for this example)
            const sectionId = item.querySelector('a').getAttribute('href').substring(1);
            document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/**
 * Initializes wallet with random balances for demo purposes
 */
function initializeWallet() {
    // Generate random balances
    tokens.UMOT.balance = (Math.random() * 1000).toFixed(2);
    tokens.UMOS.balance = (Math.random() * 500).toFixed(2);
    tokens.UMOO.balance = (Math.random() * 200).toFixed(2);
    
    // Calculate total balance in USD
    const totalBalance = (
        tokens.UMOT.balance * tokens.UMOT.price + 
        tokens.UMOS.balance * tokens.UMOS.price + 
        tokens.UMOO.balance * tokens.UMOO.price
    ).toFixed(2);
    
    // Update DOM
    updateWalletDisplay(totalBalance);
}

/**
 * Updates wallet display with current balances
 * @param {string} totalBalance - Total balance in USD
 */
function updateWalletDisplay(totalBalance) {
    walletBalanceEl.textContent = `${totalBalance} USD`;
    umotBalanceEl.textContent = tokens.UMOT.balance;
    umosBalanceEl.textContent = tokens.UMOS.balance;
    umooBalanceEl.textContent = tokens.UMOO.balance;
}

/**
 * Sets up event listeners for interactive elements
 */
function setupEventListeners() {
    // Copy link button
    copyLinkBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText('https://umoja.project/demo-user');
            showToast('Profile link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
            showToast('Failed to copy link', 'error');
        }
    });
    
    // Share profile button
    shareProfileBtn.addEventListener('click', async () => {
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'My Umoja Profile',
                    text: 'Check out my Umoja Project profile',
                    url: 'https://umoja.project/demo-user',
                });
            } else {
                showToast('Web Share API not supported', 'info');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    });
    
    // Start trading button
    startTradingBtn.addEventListener('click', () => {
        showToast('Redirecting to exchange...');
        // In a real app, this would redirect to the trading interface
    });
    
    // App cards
    appCards.forEach(card => {
        card.addEventListener('click', () => {
            const appName = card.getAttribute('data-app');
            showToast(`Opening ${appName} app...`);
            // In a real app, this would open the selected application
        });
    });
    
    // Connect wallet button
    connectWalletBtn.addEventListener('click', async () => {
        try {
            // Simulate wallet connection
            showToast('Connecting wallet...');
            
            // Simulate async connection
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            connectWalletBtn.textContent = 'Connected';
            connectWalletBtn.classList.add('connected');
            
            showToast('Wallet connected successfully!', 'success');
            
            // Update balances after connection
            initializeWallet();
        } catch (err) {
            console.error('Wallet connection error:', err);
            showToast('Failed to connect wallet', 'error');
        }
    });
}

/**
 * Shows a toast notification
 * @param {string} message - The message to display
 * @param {string} [type='success'] - The type of toast (success, error, info)
 */
function showToast(message, type = 'success') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Remove after delay
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Toast styles (dynamically added)
const toastStyles = document.createElement('style');
toastStyles.textContent = `
.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--dark);
    color: white;
    padding: 12px 24px;
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    z-index: 1000;
    animation: slide-in 0.3s ease-out;
}

.toast-success {
    background-color: var(--success);
}

.toast-error {
    background-color: var(--danger);
}

.toast-info {
    background-color: var(--primary);
}

.fade-out {
    animation: fade-out 0.3s ease-in forwards;
}

@keyframes slide-in {
    from { bottom: -50px; opacity: 0; }
    to { bottom: 20px; opacity: 1; }
}

@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
}
`;
document.head.appendChild(toastStyles);