/* ── main.js – Think Capital Site Interactions ── */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Sticky Header shadow boost on scroll ──
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

    // ── 2. Scroll-triggered fade-in animations ──
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .value-card, .leader-card, .serve-card, .stat-item, .timeline-item, .about-split')
        .forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
            observer.observe(el);
        });

    // Apply the visible state
    const style = document.createElement('style');
    style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
    document.head.appendChild(style);

    // ── 3. Stat counter animation ──
    const statItems = document.querySelectorAll('.stat-item h2');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateValue(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(el => statObserver.observe(el));

    function animateValue(el) {
        const raw = el.textContent;
        // Extract numeric part
        const match = raw.match(/[\d.]+/);
        if (!match) return;
        const end = parseFloat(match[0]);
        const prefix = raw.slice(0, match.index);
        const suffix = raw.slice(match.index + match[0].length);
        let start = 0;
        const duration = 1800;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            const current = Math.floor(eased * end);
            el.textContent = prefix + current + suffix;
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = prefix + end + suffix;
        };
        requestAnimationFrame(step);
    }

    // ── 4. Active nav link highlight ──
    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ── 5. Smooth scrolling for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offsetTop = target.getBoundingClientRect().top + window.scrollY - 90;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });

});
