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