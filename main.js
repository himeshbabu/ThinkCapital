/* ========================================
   THINK CAPITAL – SPA JAVASCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
                initCountUp();
            }, 2000);
        });

        // Fallback: hide preloader after max 4 seconds
        setTimeout(() => {
            if (!preloader.classList.contains('hidden')) {
                preloader.classList.add('hidden');
                document.body.style.overflow = '';
                initCountUp();
            }
        }, 4000);
    } else {
        // If no preloader, ensure scroll is enabled
        document.body.style.overflow = '';
        initCountUp();
    }

    // ===== NAVIGATION =====
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Scroll handler
    function handleScroll() {
        const scrollY = window.scrollY;

        // Navbar background
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top
        const backToTop = document.getElementById('backToTop');
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }

        // Active nav link based on scroll
        updateActiveNavLink();
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on init to set correct state

    // Hamburger toggle
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for nav links
    [...navLinks, ...mobileLinks].forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // If it's a section link on the same page
            const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
            if (href.startsWith('#') || (href.startsWith('index.html#') && isHomePage)) {
                const targetId = href.includes('#') ? '#' + href.split('#')[1] : href;
                const target = document.querySelector(targetId);
                
                if (target) {
                    e.preventDefault();
                    // Close mobile menu if open
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';

                    const offset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            // Otherwise, let the browser handle it (e.g., navigating to another page)
        });
    });

    // Update active nav link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPosition >= top && scrollPosition < top + height) {
                navLinks.forEach(l => l.classList.remove('active'));
                mobileLinks.forEach(l => l.classList.remove('active'));

                document.querySelectorAll(`[data-section="${id}"]`).forEach(l => {
                    l.classList.add('active');
                });
            }
        });
    }

    // Back to top
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== TYPEWRITER EFFECT =====
    const typewriterEl = document.getElementById('typewriter');
    const typewriterWords = [
        'Investment Banking Firm',
        'Corporate Advisory Firm',
        'Financial Solutions Provider',
        'Strategic Partner'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typewriterTimeout;

    function typeWriter() {
        const currentWord = typewriterWords[wordIndex];

        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 30 : 60;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % typewriterWords.length;
            speed = 300;
        }

        typewriterTimeout = setTimeout(typeWriter, speed);
    }

    if (typewriterEl) {
        typeWriter();
    }

    // ===== COUNTER ANIMATION =====
    let countersStarted = false;

    function initCountUp() {
        if (countersStarted) return;
        countersStarted = true;

        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;

            const update = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            };

            update();
        });
    }

    // ===== HERO PARTICLES =====
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(201, 168, 76, ${Math.random() * 0.3 + 0.05});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer.appendChild(particle);
        }

        // Add particle animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% { transform: translate(0, 0) scale(1); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200}px, -${Math.random() * 500 + 200}px) scale(0); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ===== SERVICE WINDOWS (Roll Down) =====
    const serviceWindows = document.querySelectorAll('.service-window');
    
    serviceWindows.forEach(windowEl => {
        const header = windowEl.querySelector('.window-header');
        
        header.addEventListener('click', () => {
            const isActive = windowEl.classList.contains('active');
            
            // Optional: Close other windows when one is opened
            serviceWindows.forEach(el => el.classList.remove('active'));
            
            if (!isActive) {
                windowEl.classList.add('active');
            }
        });
    });

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealCards = document.querySelectorAll('.reveal-card');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealCards.forEach(card => {
        revealObserver.observe(card);
    });

    // ===== CONTACT & CAREER FORMS =====
    const fundraisingForm = document.getElementById('fundraisingForm');
    const careerForm = document.getElementById('careerForm');

    if (fundraisingForm) {
        fundraisingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Pitch submitted successfully! We will review your deck and get back to you.');
            fundraisingForm.reset();
        });
    }

    if (careerForm) {
        careerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('Application submitted successfully! Our HR team will get back to you.');
            careerForm.reset();
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background: #0a1628;
            color: #e0ca7f;
            padding: 16px 32px;
            border-radius: 12px;
            font-family: 'Outfit', sans-serif;
            font-size: 14px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 12px 40px rgba(0,0,0,0.3);
            border: 1px solid rgba(201, 168, 76, 0.2);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(-50%) translateY(0)';
        });

        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(-50%) translateY(20px)';
            setTimeout(() => notification.remove(), 400);
        }, 3500);
    }

    // ===== SMOOTH SECTION TRANSITIONS =====
    // Add subtle parallax to hero bg shapes
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 0.02;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

    // ===== INITIAL STATE =====
    document.body.style.overflow = 'hidden';
});
