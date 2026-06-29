/**
 * ==========================================
 * GLOBAL JS & INTERACTION SCRIPTS
 * ==========================================
 */

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        // Remove existing listener if any to avoid multiple attachments
        mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

/**
 * SCROLL REVEAL ANIMATIONS
 * Using IntersectionObserver for modern entrance animations.
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Handle counter animation if it's inside a revealed section
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => animateCounter(counter));
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    reveals.forEach(reveal => {
        reveal.classList.remove('active'); // Reset state
        observer.observe(reveal);
    });
}

/**
 * NUMBER COUNTER ANIMATION
 */
function animateCounter(el) {
    if (el.classList.contains('counted')) return;
    
    const target = parseInt(el.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const duration = 2000; // 2 seconds
    const stepTime = Math.max(Math.floor(duration / target), 10);
    
    let current = 0;
    const timer = setInterval(() => {
        current += Math.ceil(target / 50); // Step sizing
        if (current >= target) {
            current = target;
            clearInterval(timer);
            el.classList.add('counted');
        }
        el.innerText = current;
    }, stepTime);
}

/**
 * READING PROGRESS BAR & STICKY NAV
 */
function initScrollHandlers() {
    window.addEventListener('scroll', () => {
        // Sticky Navbar styling
        const nav = document.getElementById('navbar');
        if (nav) {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md');
                // Make sure we have py-0 to replace py-4 when scrolling
                if (nav.classList.contains('py-4')) {
                    nav.classList.replace('py-4', 'py-0');
                } else if (!nav.classList.contains('py-0')) {
                    nav.classList.add('py-0');
                }
            } else {
                nav.classList.remove('shadow-md');
                if (nav.classList.contains('py-0')) {
                    nav.classList.replace('py-0', 'py-4');
                }
            }
        }

        // Reading progress
        const progressBar = document.getElementById('progress-bar');
        if (progressBar) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = scrolled + '%';
        }
    });
}

// Initialize everything on load
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollReveal();
    initScrollHandlers();
});
