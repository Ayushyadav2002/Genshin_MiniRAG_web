// Demo Chat Module
class DemoChat {
    constructor() {
        this.body = document.getElementById('demo-body');
        this.input = document.getElementById('demo-input');
        this.sendBtn = document.getElementById('demo-send');
        this.responseIndex = 0;
        this.responses = [
            "Based on the game data, Hu Tao is a 5-star Pyro polearm user who serves as the Director of the Wangsheng Funeral Parlor.",
            "Spiral Abyss floors 9-12 reset twice monthly, typically on the 1st and 16th of each month.",
            "The Elemental Mastery stat increases the damage of elemental reactions like Vaporize, Melt, and Overload.",
            "Zhongli's shield strength scales with his Max HP, making HP% artifacts optimal for support builds.",
            "The Childe boss fight has multiple phases, with the final phase being the most challenging due to increased damage output."
        ];
        this.init();
    }

    init() {
        if (!this.body || !this.input || !this.sendBtn) return;
        
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    addMessage(content, isUser = false) {
        const message = document.createElement('div');
        message.className = `message ${isUser ? 'user' : 'bot'}`;
        message.textContent = content;
        this.body.appendChild(message);
        this.body.scrollTop = this.body.scrollHeight;
    }

    sendMessage() {
        const question = this.input.value.trim();
        if (!question) return;

        this.addMessage(question, true);
        this.input.value = '';

        const typingIndicator = this.createTypingIndicator();
        this.body.appendChild(typingIndicator);
        this.body.scrollTop = this.body.scrollHeight;

        setTimeout(() => {
            this.body.removeChild(typingIndicator);
            const response = this.responses[this.responseIndex % this.responses.length];
            this.addMessage(response);
            this.responseIndex++;
        }, 1000 + Math.random() * 1000);
    }

    createTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot';
        indicator.textContent = '🤔 Thinking...';
        indicator.style.opacity = '0.7';
        return indicator;
    }
}

// Scroll Effects Module
class ScrollEffects {
    constructor() {
        this.header = document.querySelector('header');
        this.hero = document.querySelector('.hero');
        this.overviewSection = document.getElementById('overview');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupScrollAnimations();
        this.setupIntersectionObserver();
    }

    setupSmoothScrolling() {
        document.querySelectorAll('nav a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    setupScrollAnimations() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });
    }

    handleScroll() {
        this.updateHeaderVisibility();
        this.updateHeroOpacity();
        this.lastScrollY = window.scrollY;
    }

    updateHeaderVisibility() {
        if (!this.header) return;
        
        const currentScrollY = window.scrollY;
        const shouldHide = currentScrollY > this.lastScrollY && currentScrollY > 100;
        
        this.header.style.transform = shouldHide ? 'translateY(-100%)' : 'translateY(0)';
    }

    updateHeroOpacity() {
        if (!this.hero || !this.overviewSection) return;
        
        const overviewRect = this.overviewSection.getBoundingClientRect();
        const fadeStart = 100;
        const fadeEnd = 0;
        
        if (overviewRect.top <= fadeStart) {
            const fadeProgress = (fadeStart - overviewRect.top) / (fadeStart - fadeEnd);
            const opacity = Math.max(0, 1 - fadeProgress);
            
            this.hero.style.opacity = opacity;
            this.hero.style.transform = `translateY(${fadeProgress * -20}px)`;
            
            // Toggle fade-out class
            this.hero.classList.toggle('fade-out', opacity <= 0.1);
        } else {
            this.hero.style.opacity = '1';
            this.hero.style.transform = 'translateY(0)';
            this.hero.classList.remove('fade-out');
        }
    }

    setupIntersectionObserver() {
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

        // Apply fade-in animation to all sections except home
        document.querySelectorAll('section').forEach(section => {
            if (section.id !== 'home') {
                Object.assign(section.style, {
                    opacity: '0',
                    transform: 'translateY(30px)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease'
                });
                observer.observe(section);
            }
        });
    }
}

// App Initialization
class App {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeModules());
        } else {
            this.initializeModules();
        }
    }

    initializeModules() {
        try {
            new DemoChat();
            new ScrollEffects();
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }
}

// Initialize the app
new App();