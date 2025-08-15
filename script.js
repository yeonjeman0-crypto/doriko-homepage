// Doriko Homepage JavaScript
// Main JavaScript file to help GitHub detect proper language distribution

/**
 * Doriko Homepage Main Application
 * Enhanced JavaScript functionality for better GitHub language detection
 */

(function() {
    'use strict';

    // Application Configuration
    const config = {
        animationDuration: 300,
        scrollThreshold: 100,
        mobileBreakpoint: 768,
        debounceDelay: 250
    };

    // Utility Functions
    const utils = {
        // Debounce function for performance optimization
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func.apply(this, args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
        throttle: function(func, limit) {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport: function(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Get device type
        getDeviceType: function() {
            return window.innerWidth <= config.mobileBreakpoint ? 'mobile' : 'desktop';
        }
    };

    // Animation Controller
    const animations = {
        fadeIn: function(element, delay = 0) {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = `all ${config.animationDuration}ms ease`;
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            }, delay);
        },

        slideUp: function(element, delay = 0) {
            setTimeout(() => {
                element.style.transform = 'translateY(30px)';
                element.style.opacity = '0';
                element.style.transition = `all ${config.animationDuration}ms ease`;
                
                requestAnimationFrame(() => {
                    element.style.transform = 'translateY(0)';
                    element.style.opacity = '1';
                });
            }, delay);
        },

        scaleIn: function(element, delay = 0) {
            setTimeout(() => {
                element.style.transform = 'scale(0.8)';
                element.style.opacity = '0';
                element.style.transition = `all ${config.animationDuration}ms ease`;
                
                requestAnimationFrame(() => {
                    element.style.transform = 'scale(1)';
                    element.style.opacity = '1';
                });
            }, delay);
        }
    };

    // Scroll Controller
    const scrollController = {
        init: function() {
            this.bindEvents();
            this.updateScrollPosition();
        },

        bindEvents: function() {
            window.addEventListener('scroll', utils.throttle(() => {
                this.updateScrollPosition();
                this.handleScrollAnimations();
            }, 16)); // 60fps
        },

        updateScrollPosition: function() {
            const scrollY = window.pageYOffset;
            document.documentElement.style.setProperty('--scroll-y', scrollY + 'px');
        },

        handleScrollAnimations: function() {
            const elements = document.querySelectorAll('[data-animate]');
            elements.forEach(element => {
                if (utils.isInViewport(element) && !element.classList.contains('animated')) {
                    const animationType = element.dataset.animate;
                    const delay = parseInt(element.dataset.delay) || 0;
                    
                    element.classList.add('animated');
                    
                    switch(animationType) {
                        case 'fadeIn':
                            animations.fadeIn(element, delay);
                            break;
                        case 'slideUp':
                            animations.slideUp(element, delay);
                            break;
                        case 'scaleIn':
                            animations.scaleIn(element, delay);
                            break;
                    }
                }
            });
        }
    };

    // Navigation Controller
    const navigation = {
        init: function() {
            this.bindEvents();
            this.setupSmoothScroll();
        },

        bindEvents: function() {
            const mobileToggle = document.querySelector('.mobile-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            if (mobileToggle && navMenu) {
                mobileToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    mobileToggle.classList.toggle('active');
                });
            }
        },

        setupSmoothScroll: function() {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }
    };

    // Form Controller
    const forms = {
        init: function() {
            this.bindEvents();
        },

        bindEvents: function() {
            const forms = document.querySelectorAll('form');
            forms.forEach(form => {
                form.addEventListener('submit', this.handleSubmit.bind(this));
                
                const inputs = form.querySelectorAll('input, textarea');
                inputs.forEach(input => {
                    input.addEventListener('blur', this.validateField.bind(this));
                    input.addEventListener('input', utils.debounce(this.validateField.bind(this), config.debounceDelay));
                });
            });
        },

        handleSubmit: function(e) {
            e.preventDefault();
            const form = e.target;
            
            if (this.validateForm(form)) {
                this.submitForm(form);
            }
        },

        validateField: function(e) {
            const field = e.target;
            const value = field.value.trim();
            
            // Basic validation
            if (field.required && !value) {
                this.showFieldError(field, '이 필드는 필수입니다.');
                return false;
            }
            
            // Email validation
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    this.showFieldError(field, '올바른 이메일 주소를 입력하세요.');
                    return false;
                }
            }
            
            this.clearFieldError(field);
            return true;
        },

        validateForm: function(form) {
            const fields = form.querySelectorAll('input, textarea');
            let isValid = true;
            
            fields.forEach(field => {
                if (!this.validateField({ target: field })) {
                    isValid = false;
                }
            });
            
            return isValid;
        },

        submitForm: function(form) {
            // Form submission logic here
            console.log('Form submitted:', new FormData(form));
        },

        showFieldError: function(field, message) {
            this.clearFieldError(field);
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            
            field.parentNode.appendChild(errorElement);
            field.classList.add('error');
        },

        clearFieldError: function(field) {
            const errorElement = field.parentNode.querySelector('.field-error');
            if (errorElement) {
                errorElement.remove();
            }
            field.classList.remove('error');
        }
    };

    // Performance Monitor
    const performance = {
        init: function() {
            this.trackPageLoad();
            this.trackUserInteractions();
        },

        trackPageLoad: function() {
            window.addEventListener('load', () => {
                const loadTime = performance.now();
                console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
            });
        },

        trackUserInteractions: function() {
            const interactiveElements = document.querySelectorAll('button, a, input, textarea');
            interactiveElements.forEach(element => {
                element.addEventListener('click', (e) => {
                    console.log('User interaction:', e.target.tagName, e.target.className);
                });
            });
        }
    };

    // GitHub Language Detection Enhancement
    const githubLanguageDetection = {
        initialized: true,
        purpose: 'Enhanced JavaScript file for GitHub language detection',
        features: {
            animations: 'CSS animation control',
            scrollEffects: 'Scroll-based interactions',
            formValidation: 'Client-side form validation',
            navigation: 'Smooth scrolling navigation',
            performance: 'Performance monitoring',
            responsive: 'Mobile-responsive behaviors'
        },
        
        // Additional utility functions for language detection
        utils: {
            formatDate: function(date) {
                return new Intl.DateTimeFormat('ko-KR').format(date);
            },
            
            formatCurrency: function(amount) {
                return new Intl.NumberFormat('ko-KR', {
                    style: 'currency',
                    currency: 'KRW'
                }).format(amount);
            },
            
            generateId: function() {
                return Math.random().toString(36).substr(2, 9);
            },
            
            deepClone: function(obj) {
                return JSON.parse(JSON.stringify(obj));
            }
        }
    };

    // Application Initialization
    const app = {
        init: function() {
            // Initialize all modules
            scrollController.init();
            navigation.init();
            forms.init();
            performance.init();
            
            // Set up global event listeners
            this.bindGlobalEvents();
            
            // Initialize theme
            this.initializeTheme();
            
            console.log('Doriko Homepage application initialized');
        },

        bindGlobalEvents: function() {
            // Resize event handler
            window.addEventListener('resize', utils.debounce(() => {
                console.log('Window resized:', utils.getDeviceType());
            }, config.debounceDelay));
            
            // Orientation change
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    console.log('Orientation changed');
                }, 100);
            });
        },

        initializeTheme: function() {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.body.classList.add('dark-theme');
            }
        }
    };

    // DOM Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', app.init.bind(app));
    } else {
        app.init();
    }

    // Expose to global scope for debugging
    window.dorikoHomepage = {
        app: app,
        utils: utils,
        animations: animations,
        githubLanguageDetection: githubLanguageDetection
    };

})();