// Nuvion AI Platform - Interactive Features
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initCodeTabs();
    initAPIPlayground();
    initSmoothScrolling();
    initNavbarScroll();
    initParticleAnimation();
    initButtonAnimations();
    initDashboardConnections();
    initAuthentication();
    initGoogleAuth();
});

// Code Generator Tabs
function initCodeTabs() {
    const codeTabs = document.querySelectorAll('.code-tab');
    const codeBlocks = document.querySelectorAll('.code-block');

    codeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetLang = tab.dataset.lang;
            
            // Remove active class from all tabs and blocks
            codeTabs.forEach(t => t.classList.remove('active'));
            codeBlocks.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding block
            tab.classList.add('active');
            document.querySelector(`.code-block[data-lang="${targetLang}"]`).classList.add('active');
        });
    });
}

// API Playground Interactive Features
function initAPIPlayground() {
    const testButton = document.querySelector('.playground .btn-primary');
    const textarea = document.querySelector('.neumorphic-textarea');
    const outputContent = document.querySelector('.output-content');
    const statusIndicator = document.querySelector('.status-indicator');
    const statusText = document.querySelector('.output-status span');

    if (testButton && textarea && outputContent) {
        testButton.addEventListener('click', () => {
            const prompt = textarea.value.trim();
            
            if (!prompt) {
                showNotification('Please enter a prompt to test the API', 'warning');
                return;
            }

            // Simulate API call
            simulateAPICall(prompt, outputContent, statusIndicator, statusText);
        });
    }

    // Copy code functionality
    const copyButtons = document.querySelectorAll('.btn[data-action="copy"]');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.closest('.code-generator').querySelector('.code-block.active pre code');
            if (codeBlock) {
                navigator.clipboard.writeText(codeBlock.textContent).then(() => {
                    showNotification('Code copied to clipboard!', 'success');
                });
            }
        });
    });
}

// Simulate API call with realistic loading states
function simulateAPICall(prompt, outputContent, statusIndicator, statusText) {
    // Update status to loading
    statusIndicator.style.background = '#f59e0b';
    statusText.textContent = 'Processing...';
    
    // Show loading animation
    outputContent.innerHTML = `
        <div class="loading-animation">
            <div class="loading-dots">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <p>Generating response...</p>
        </div>
    `;

    // Add loading styles
    const style = document.createElement('style');
    style.textContent = `
        .loading-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: var(--text-secondary);
        }
        .loading-dots {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--accent-color);
            animation: loadingBounce 1.4s ease-in-out infinite both;
        }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes loadingBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Simulate API response after delay
    setTimeout(() => {
        const responses = [
            "This is a concise summary of the provided content, highlighting the key points and main ideas in a clear and structured format.",
            "Based on the input, here's a brief overview that captures the essential information and presents it in an easily digestible format.",
            "The content has been analyzed and summarized to provide you with the most important details and insights in a compact form.",
            "Here's a streamlined version that maintains the core message while making it more accessible and easier to understand."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        outputContent.innerHTML = `
            <div class="api-response">
                <div class="response-header">
                    <span class="response-label">AI Response</span>
                    <span class="response-time">Generated in 1.2s</span>
                </div>
                <div class="response-content">
                    ${randomResponse}
                </div>
            </div>
        `;

        // Update status to success
        statusIndicator.style.background = '#16a34a';
        statusText.textContent = 'Complete';
        
        // Remove loading styles
        document.head.removeChild(style);
    }, 2000);
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'rgba(224, 224, 224, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(224, 224, 224, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Particle animation for hero section
function initParticleAnimation() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(99, 102, 241, 0.3);
        border-radius: 50%;
        pointer-events: none;
        animation: float ${Math.random() * 10 + 10}s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 10}s;
    `;
    
    container.appendChild(particle);
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(100vh) translateX(0px);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Button press animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.style.transform = 'translateY(1px) scale(0.98)';
        });
        
        button.addEventListener('mouseup', () => {
            button.style.transform = '';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
}

// Dashboard connection animations
function initDashboardConnections() {
    const apiCards = document.querySelectorAll('.api-card[data-api]');
    const lines = document.querySelectorAll('.line');
    
    // Animate API cards on hover
    apiCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.05)';
            card.style.boxShadow = `
                12px 12px 24px var(--shadow-dark),
                -12px -12px 24px var(--shadow-light),
                0 0 20px rgba(99, 102, 241, 0.3)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 
            8px 8px 16px var(--shadow-dark),
            -8px -8px 16px var(--shadow-light);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-weight: 500;
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderLeft = '4px solid #16a34a';
    } else if (type === 'warning') {
        notification.style.borderLeft = '4px solid #f59e0b';
    } else if (type === 'error') {
        notification.style.borderLeft = '4px solid #dc2626';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.api-card-large, .project-card, .pricing-card, .metric-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// API Key management simulation
function initAPIKeyManagement() {
    const addKeyButton = document.querySelector('.playground .btn-outline');
    
    if (addKeyButton) {
        addKeyButton.addEventListener('click', () => {
            const key = prompt('Enter your API key:');
            if (key) {
                localStorage.setItem('nuvion_api_key', key);
                showNotification('API key saved successfully!', 'success');
                addKeyButton.textContent = '✓ Key Added';
                addKeyButton.style.background = '#16a34a';
                addKeyButton.style.color = 'white';
            }
        });
    }
}

// Initialize API key management
initAPIKeyManagement();

// Pricing card hover effects
function initPricingEffects() {
    const pricingCards = document.querySelectorAll('.pricing-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'translateY(-12px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = '';
            }
        });
    });
}

initPricingEffects();

// Mobile menu toggle (if needed for smaller screens)
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton && navLinks) {
        mobileMenuButton.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });
    }
}

// Initialize all features
initMobileMenu();

// Add some interactive hover effects for better UX
document.addEventListener('DOMContentLoaded', () => {
    // Add hover effects to all interactive elements
    const interactiveElements = document.querySelectorAll('.api-card, .project-card, .btn, .nav-link');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
});

// Console welcome message
console.log(`
🧠 Welcome to Nuvion AI Platform!
🚀 Built with modern web technologies
💡 Intelligence meets innovation
`);

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`⚡ Page loaded in ${loadTime}ms`);
    });
}

// Authentication System
let currentUser = null;
let verificationCode = null;
let resendTimer = null;

// Initialize Authentication
function initAuthentication() {
    const authModal = document.getElementById('authModal');
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const authCloseBtn = document.getElementById('authCloseBtn');
    const authTabs = document.querySelectorAll('.auth-tab');
    const signInForm = document.getElementById('emailSignInForm');
    const signUpForm = document.getElementById('emailSignUpForm');
    const verificationForm = document.getElementById('codeVerificationForm');
    const resendCodeBtn = document.getElementById('resendCodeBtn');
    const signOutBtn = document.getElementById('signOutBtn');

    // Check if user is already signed in
    checkAuthStatus();

    // Open modal handlers
    signInBtn?.addEventListener('click', () => openAuthModal('signin'));
    signUpBtn?.addEventListener('click', () => openAuthModal('signup'));

    // Close modal handlers
    authCloseBtn?.addEventListener('click', closeAuthModal);
    authModal?.addEventListener('click', (e) => {
        if (e.target === authModal) closeAuthModal();
    });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const form = tab.dataset.form;
            switchAuthForm(form);
        });
    });

    // Form submissions
    signInForm?.addEventListener('submit', handleSignIn);
    signUpForm?.addEventListener('submit', handleSignUp);
    verificationForm?.addEventListener('submit', handleVerification);

    // Resend code
    resendCodeBtn?.addEventListener('click', handleResendCode);

    // Sign out
    signOutBtn?.addEventListener('click', handleSignOut);

    // Code input handling
    initCodeInputs();
}

// Open Authentication Modal
function openAuthModal(form = 'signin') {
    const authModal = document.getElementById('authModal');
    const modalTitle = document.getElementById('authModalTitle');
    
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (form === 'signin') {
        modalTitle.textContent = 'Welcome Back';
        switchAuthForm('signin');
    } else {
        modalTitle.textContent = 'Join Nuvion';
        switchAuthForm('signup');
    }
}

// Close Authentication Modal
function closeAuthModal() {
    const authModal = document.getElementById('authModal');
    authModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset forms
    document.getElementById('signInForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
    document.getElementById('verificationForm').style.display = 'none';
    
    // Clear form data
    clearAuthForms();
}

// Switch between sign in and sign up forms
function switchAuthForm(form) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const verificationForm = document.getElementById('verificationForm');
    const tabs = document.querySelectorAll('.auth-tab');
    
    // Hide all forms
    signInForm.style.display = 'none';
    signUpForm.style.display = 'none';
    verificationForm.style.display = 'none';
    
    // Update tabs
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-form="${form}"]`).classList.add('active');
    
    // Show selected form
    if (form === 'signin') {
        signInForm.style.display = 'block';
    } else if (form === 'signup') {
        signUpForm.style.display = 'block';
    }
}

// Handle Sign In
async function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signInEmail').value;
    const password = document.getElementById('signInPassword').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    showLoading('Signing in...');
    
    try {
        // Call API
        const result = await window.nuvionAPI.signIn(email, password);
        
        if (!result.success) {
            showNotification(result.message, 'error');
            return;
        }
        
        // Store user session
        if (rememberMe) {
            localStorage.setItem('nuvion_user', JSON.stringify(result.user));
        } else {
            sessionStorage.setItem('nuvion_user', JSON.stringify(result.user));
        }
        
        currentUser = result.user;
        updateUIForSignedInUser(result.user);
        closeAuthModal();
        showNotification('Welcome back!', 'success');
        
    } catch (error) {
        console.error('Sign in error:', error);
        showNotification('Sign in failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle Sign Up
async function handleSignUp(e) {
    e.preventDefault();
    
    const name = document.getElementById('signUpName').value;
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    showLoading('Creating account...');
    
    try {
        // Call API
        const result = await window.nuvionAPI.signUp({ name, email, password });
        
        if (!result.success) {
            showNotification(result.message, 'error');
            return;
        }
        
        // Store verification code for verification step
        verificationCode = result.verificationCode;
        
        // Show verification form
        showVerificationForm(email);
        
        // Show development code in console
        console.log(`🔑 Development: Verification code is ${verificationCode}`);
        
    } catch (error) {
        console.error('Sign up error:', error);
        showNotification('Sign up failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle Email Verification
async function handleVerification(e) {
    e.preventDefault();
    
    const codeInputs = document.querySelectorAll('.code-input');
    const enteredCode = Array.from(codeInputs).map(input => input.value).join('');
    const email = document.getElementById('verificationEmail').textContent;
    
    if (enteredCode.length !== 6) {
        showNotification('Please enter the complete 6-digit code', 'error');
        return;
    }
    
    showLoading('Verifying email...');
    
    try {
        // Call API
        const result = await window.nuvionAPI.verifyEmail(email, enteredCode);
        
        if (!result.success) {
            showNotification(result.message, 'error');
            return;
        }
        
        // Store user session
        localStorage.setItem('nuvion_user', JSON.stringify(result.user));
        currentUser = result.user;
        updateUIForSignedInUser(result.user);
        closeAuthModal();
        showNotification('Account created successfully!', 'success');
        
    } catch (error) {
        console.error('Verification error:', error);
        showNotification('Verification failed. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle Resend Code
async function handleResendCode() {
    const email = document.getElementById('verificationEmail').textContent;
    
    showLoading('Resending code...');
    
    try {
        // Call API
        const result = await window.nuvionAPI.resendVerificationCode(email);
        
        if (!result.success) {
            showNotification(result.message, 'error');
            return;
        }
        
        // Store new verification code
        verificationCode = result.verificationCode;
        
        // Reset timer
        startResendTimer();
        
        showNotification('Verification code sent!', 'success');
        
        // Show development code in console
        console.log(`🔑 Development: New verification code is ${verificationCode}`);
        
    } catch (error) {
        console.error('Resend code error:', error);
        showNotification('Failed to resend code. Please try again.', 'error');
    } finally {
        hideLoading();
    }
}

// Handle Sign Out
function handleSignOut() {
    currentUser = null;
    localStorage.removeItem('nuvion_user');
    sessionStorage.removeItem('nuvion_user');
    updateUIForSignedOutUser();
    showNotification('Signed out successfully', 'info');
}

// Show Verification Form
function showVerificationForm(email) {
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const verificationForm = document.getElementById('verificationForm');
    const verificationEmail = document.getElementById('verificationEmail');
    
    signInForm.style.display = 'none';
    signUpForm.style.display = 'none';
    verificationForm.style.display = 'block';
    
    verificationEmail.textContent = email;
    
    // Start resend timer
    startResendTimer();
}

// Initialize Code Inputs
function initCodeInputs() {
    const codeInputs = document.querySelectorAll('.code-input');
    
    codeInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            // Only allow numbers
            if (!/^\d$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Move to next input
            if (value && index < codeInputs.length - 1) {
                codeInputs[index + 1].focus();
            }
        });
        
        input.addEventListener('keydown', (e) => {
            // Handle backspace
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                codeInputs[index - 1].focus();
            }
        });
        
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text');
            const numbers = pastedData.replace(/\D/g, '').slice(0, 6);
            
            numbers.split('').forEach((num, i) => {
                if (codeInputs[i]) {
                    codeInputs[i].value = num;
                }
            });
            
            // Focus last filled input
            const lastFilledIndex = Math.min(numbers.length - 1, codeInputs.length - 1);
            codeInputs[lastFilledIndex].focus();
        });
    });
}

// Start Resend Timer
function startResendTimer() {
    const resendBtn = document.getElementById('resendCodeBtn');
    const countdown = document.getElementById('countdown');
    const timerText = document.getElementById('timerText');
    
    let timeLeft = 60;
    resendBtn.disabled = true;
    
    resendTimer = setInterval(() => {
        timeLeft--;
        countdown.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(resendTimer);
            resendBtn.disabled = false;
            timerText.style.display = 'none';
        }
    }, 1000);
}


// Check Authentication Status
function checkAuthStatus() {
    const user = localStorage.getItem('nuvion_user') || sessionStorage.getItem('nuvion_user');
    
    if (user) {
        try {
            currentUser = JSON.parse(user);
            updateUIForSignedInUser(currentUser);
        } catch (error) {
            console.error('Error parsing user data:', error);
            handleSignOut();
        }
    }
}

// Update UI for Signed In User
function updateUIForSignedInUser(user) {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const userProfile = document.getElementById('userProfile');
    const userAvatarImg = document.getElementById('userAvatarImg');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    
    // Hide auth buttons
    signInBtn.style.display = 'none';
    signUpBtn.style.display = 'none';
    
    // Show user profile
    userProfile.style.display = 'flex';
    userAvatarImg.src = user.avatar;
    userAvatarImg.alt = user.name;
    userName.textContent = user.name;
    userEmail.textContent = user.email;
}

// Update UI for Signed Out User
function updateUIForSignedOutUser() {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const userProfile = document.getElementById('userProfile');
    
    // Show auth buttons
    signInBtn.style.display = 'inline-flex';
    signUpBtn.style.display = 'inline-flex';
    
    // Hide user profile
    userProfile.style.display = 'none';
}

// Clear Auth Forms
function clearAuthForms() {
    document.getElementById('emailSignInForm').reset();
    document.getElementById('emailSignUpForm').reset();
    document.getElementById('codeVerificationForm').reset();
    
    // Clear code inputs
    document.querySelectorAll('.code-input').forEach(input => {
        input.value = '';
    });
}

// Show Loading Overlay
function showLoading(text = 'Processing...') {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    
    loadingText.textContent = text;
    loadingOverlay.style.display = 'flex';
}

// Hide Loading Overlay
function hideLoading() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    loadingOverlay.style.display = 'none';
}

// Simulate API Call
function simulateAPICall(delay = 1000) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Google OAuth Integration
function initGoogleAuth() {
    // Load Google API
    if (typeof gapi !== 'undefined') {
        gapi.load('auth2', initGoogleAuthClient);
    }
}

function initGoogleAuthClient() {
    gapi.auth2.init({
        client_id: 'YOUR_GOOGLE_CLIENT_ID', // Replace with actual client ID
        scope: 'email profile'
    }).then(() => {
        console.log('Google Auth initialized');
    });
}

// Handle Google Sign In
async function handleGoogleSignIn() {
    if (typeof gapi === 'undefined') {
        showNotification('Google Sign-In not available', 'error');
        return;
    }
    
    showLoading('Signing in with Google...');
    
    try {
        const authInstance = gapi.auth2.getAuthInstance();
        const googleUser = await authInstance.signIn();
        
        // Call API
        const result = await window.nuvionAPI.handleGoogleOAuth(googleUser);
        
        if (!result.success) {
            showNotification(result.message, 'error');
            return;
        }
        
        // Store user session
        localStorage.setItem('nuvion_user', JSON.stringify(result.user));
        currentUser = result.user;
        updateUIForSignedInUser(result.user);
        closeAuthModal();
        showNotification('Welcome to Nuvion!', 'success');
        
    } catch (error) {
        console.error('Google Sign-In error:', error);
        showNotification('Google Sign-In failed', 'error');
    } finally {
        hideLoading();
    }
}

// Add Google Sign-In event listeners
document.addEventListener('DOMContentLoaded', () => {
    const googleSignInBtn = document.getElementById('googleSignInBtn');
    const googleSignUpBtn = document.getElementById('googleSignUpBtn');
    
    googleSignInBtn?.addEventListener('click', handleGoogleSignIn);
    googleSignUpBtn?.addEventListener('click', handleGoogleSignIn);
});