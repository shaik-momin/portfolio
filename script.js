// EmailJS Configuration
const EMAILJS_CONFIG = {
    serviceId: 'service_lt6clu5',     // Your EmailJS service ID
    templateId: 'template_19v9odc',   // Your EmailJS template ID
    publicKey: 'OJD6vMyoAauTMOSaR'    // Your EmailJS public key
};

// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
const closeIcon = mobileMenuBtn.querySelector('.close-icon');
const contactForm = document.getElementById('contact-form');
const backToTopBtn = document.getElementById('back-to-top');

// Initialize EmailJS when the script loads
let emailjsInitialized = false;

function initializeEmailJS() {
    console.log('🔧 Initializing EmailJS...');
    
    // Check if EmailJS is available
    if (typeof emailjs === 'undefined') {
        console.error('❌ EmailJS library not found! Make sure the script is loaded.');
        return false;
    }
    
    try {
        // Initialize EmailJS with your public key
        emailjs.init(EMAILJS_CONFIG.publicKey);
        emailjsInitialized = true;
        console.log('✅ EmailJS initialized successfully!');
        console.log('📧 Configuration:');
        console.log('   Service ID:', EMAILJS_CONFIG.serviceId);
        console.log('   Template ID:', EMAILJS_CONFIG.templateId);
        console.log('   Public Key:', EMAILJS_CONFIG.publicKey);
        return true;
    } catch (error) {
        console.error('❌ Failed to initialize EmailJS:', error);
        return false;
    }
}

// Navigation functionality
function initNavigation() {
    // Handle scroll effect on header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('[data-target]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            }
        });
    });

    // Back to top button
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let skillsAnimated = false;

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                skillsSection.classList.add('skills-visible');
                
                skillBars.forEach((bar, index) => {
                    const level = bar.getAttribute('data-level');
                    setTimeout(() => {
                        bar.style.setProperty('--progress-width', level + '%');
                        bar.style.width = level + '%';
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}

// Contact form handling with comprehensive template variable mapping
function initContactForm() {
    if (!contactForm) {
        console.error('❌ Contact form not found!');
        return;
    }

    console.log('✅ Contact form found, setting up event listener...');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        console.log('🚀 Form submitted! Processing...');
        console.log('⏰ Timestamp:', new Date().toISOString());
        
        // Check if EmailJS is initialized
        if (!emailjsInitialized) {
            console.error('❌ EmailJS not initialized!');
            showNotification('Email service not available. Please try again later.', 'error');
            return;
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        console.log('📝 Form data collected:', data);
        
        // Validate form data
        if (!data.name || !data.email || !data.subject || !data.message) {
            console.error('❌ Missing required fields');
            showNotification('Please fill in all fields before sending.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i data-lucide="loader-2"></i><span>Sending...</span>';
        submitBtn.disabled = true;
        
        // Recreate icons for the loading state
        lucide.createIcons();
        
        // Comprehensive template parameters - covering all possible variable names
        const templateParams = {
            // Standard EmailJS variables
            from_name: data.name,
            from_email: data.email,
            to_name: 'Momin Shaik',
            subject: data.subject,
            message: data.message,
            reply_to: data.email,
            
            // Alternative naming conventions
            name: data.name,
            email: data.email,
            user_name: data.name,
            user_email: data.email,
            sender_name: data.name,
            sender_email: data.email,
            contact_name: data.name,
            contact_email: data.email,
            
            // Subject variations
            email_subject: data.subject,
            mail_subject: data.subject,
            title: data.subject,
            
            // Message variations
            email_message: data.message,
            mail_message: data.message,
            content: data.message,
            body: data.message,
            text: data.message,
            
            // Recipient variations
            to_email: 'mominshaik801@gmail.com',
            recipient_name: 'Momin Shaik',
            recipient_email: 'mominshaik801@gmail.com',
            
            // Combined message with subject
            full_message: `Subject: ${data.subject}\n\nFrom: ${data.name} (${data.email})\n\n${data.message}`,
            
            // Formatted message
            formatted_message: `
Hello Momin,

You have received a new message from your portfolio website:

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

---
This message was sent from your portfolio contact form.
            `.trim()
        };
        
        try {
            console.log('📧 Sending email with comprehensive template parameters...');
            console.log('📋 Template parameters:', templateParams);
            console.log('🌐 Making request to EmailJS servers...');
            
            const response = await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                templateParams
            );
            
            console.log('📨 EmailJS Response:', response);
            console.log('📊 Response status:', response.status);
            console.log('📄 Response text:', response.text);
            
            if (response.status === 200) {
                console.log('🎉 SUCCESS! Email sent successfully!');
                console.log('📬 Email delivered to mominshaik801@gmail.com');
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
            
        } catch (error) {
            console.error('❌ Failed to send email:', error);
            
            // Enhanced error logging
            console.error('🔍 Error details:');
            console.error('   Status:', error?.status || 'undefined');
            console.error('   Text:', error?.text || 'undefined');
            console.error('   Message:', error?.message || 'undefined');
            console.error('   Full error object:', error);
            
            // Provide specific error messages based on error type
            let errorMessage = 'Failed to send message. ';
            
            if (error.message === 'Failed to fetch' || !error.status) {
                console.error('🌐 Network Error - Possible causes:');
                console.error('   1. EmailJS service configuration issue');
                console.error('   2. Template ID mismatch');
                console.error('   3. Public key authentication failure');
                console.error('   4. Network connectivity problems');
                errorMessage = 'Unable to connect to email service. Please contact me directly at mominshaik801@gmail.com';
            } else if (error.status === 400) {
                errorMessage = 'Email configuration error. Please contact me directly at mominshaik801@gmail.com';
            } else if (error.status === 401) {
                errorMessage = 'Authentication failed. Please contact me directly at mominshaik801@gmail.com';
            } else if (error.status === 404) {
                errorMessage = 'Email service not found. Please contact me directly at mominshaik801@gmail.com';
            } else if (error.status === 422) {
                errorMessage = 'Template configuration issue. Please contact me directly at mominshaik801@gmail.com';
            } else {
                errorMessage = 'Unknown error occurred. Please contact me directly at mominshaik801@gmail.com';
            }
            
            showNotification(errorMessage, 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            lucide.createIcons();
            console.log('🔄 Form reset and ready for next submission');
        }
    });
}

// Show notification function
function showNotification(message, type = 'info') {
    console.log(`📢 Showing notification: ${message} (${type})`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i data-lucide="${type === 'success' ? 'check-circle' : 'alert-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i data-lucide="x"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #10b981; color: white;' : 'background: #ef4444; color: white;'}
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Initialize icons
    lucide.createIcons();
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto hide after 8 seconds for error messages, 5 for success
    const hideDelay = type === 'error' ? 8000 : 5000;
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, hideDelay);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Fade in animation for elements
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll('.animate-fade-in-up');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
}

// Project card hover effects
function initProjectHovers() {
    const projectCards = document.querySelectorAll('.project-card, .project-image');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Smooth reveal animations for sections
function initSectionAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Parallax effect for hero background
function initParallaxEffect() {
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroPattern.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing portfolio website...');
    
    // Initialize EmailJS first
    const emailjsReady = initializeEmailJS();
    
    // Initialize other components
    initNavigation();
    initSkillsAnimation();
    initContactForm();
    initFadeInAnimations();
    initProjectHovers();
    initSectionAnimations();
    initParallaxEffect();
    
    console.log('✅ Portfolio website initialized successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        navMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('[data-target]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-target');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const targetPosition = targetElement.offsetTop - 80;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 1000;
                    let start = null;
                    
                    const step = (timestamp) => {
                        if (!start) start = timestamp;
                        const progress = timestamp - start;
                        const ease = easeInOutCubic(progress / duration);
                        
                        window.scrollTo(0, startPosition + distance * ease);
                        
                        if (progress < duration) {
                            window.requestAnimationFrame(step);
                        }
                    };
                    
                    window.requestAnimationFrame(step);
                }
            });
        });
    };
    
    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };
    
    smoothScrollPolyfill();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    const heroElements = document.querySelectorAll('.hero .animate-fade-in-up');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
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
}

// Apply throttling to scroll-heavy functions
const throttledScrollHandler = throttle(() => {
    // Header scroll effect
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);