/* ═══════════════════════════════════════════════
   THINK CAPITAL — main.js
   Animations · Interactions · Responsive Nav
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ─────────────────────────────────────────────
       1. MOBILE HAMBURGER MENU
       ─────────────────────────────────────────── */
    const hamburger  = document.querySelector('.hamburger');
    const mobileNav  = document.querySelector('.mobile-nav');
    const body       = document.body;

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            const isOpen = hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open', isOpen);
            body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            });
        });

        // Close on outside tap
        document.addEventListener('click', e => {
            if (
                mobileNav.classList.contains('open') &&
                !mobileNav.contains(e.target) &&
                !hamburger.contains(e.target)
            ) {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                body.style.overflow = '';
            }
        });
    }

    /* ─────────────────────────────────────────────
       2. STICKY HEADER — scroll shadow
       ─────────────────────────────────────────── */
    const header = document.querySelector('header');
    const onScroll = () => {
        header?.style.setProperty(
            'box-shadow',
            window.scrollY > 30
                ? '0 4px 28px rgba(0,0,0,0.13)'
                : '0 2px 10px rgba(0,0,0,0.05)'
        );
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ─────────────────────────────────────────────
       3. SCROLL-REVEAL ANIMATIONS
       Uses .reveal class; add data-delay="N" (1–6)
       for stagger, and optional reveal-left /
       reveal-right / reveal-scale / reveal-fade.
       ─────────────────────────────────────────── */

    /* Auto-tag elements that don't already have .reveal */
    function autoTag(selector, classes = '') {
        document.querySelectorAll(selector).forEach((el, i) => {
            if (!el.closest('.hero') && !el.closest('.page-hero')) {
                el.classList.add('reveal');
                if (classes) classes.split(' ').forEach(c => el.classList.add(c));
                if (!el.dataset.delay) el.dataset.delay = Math.min(i % 6 + 1, 6);
            }
        });
    }

    autoTag('.service-card',   'reveal-scale');
    autoTag('.value-card',     'reveal-scale');
    autoTag('.leader-card',    'reveal-scale');
    autoTag('.serve-card',     'reveal-scale');
    autoTag('.timeline-item',  'reveal-left');
    autoTag('.stat-item',      'reveal-fade');
    autoTag('.section-title',  'reveal-fade');
    autoTag('.about-split',    'reveal-fade');
    autoTag('.glass-card-row', 'reveal-fade');

    /* Section-title gets its own class for line animation */
    document.querySelectorAll('.section-title').forEach(el => el.classList.add('reveal', 'reveal-fade'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─────────────────────────────────────────────
       4. STAT COUNTER ANIMATION
       ─────────────────────────────────────────── */
    const statEls = document.querySelectorAll('.stat-item h2');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.6 });

    statEls.forEach(el => {
        el.dataset.original = el.textContent;
        counterObserver.observe(el);
    });

    function animateCounter(el) {
        const raw   = el.dataset.original || el.textContent;
        const match = raw.match(/[\d.]+/);
        if (!match) return;

        const end    = parseFloat(match[0]);
        const prefix = raw.slice(0, match.index);
        const suffix = raw.slice(match.index + match[0].length);
        const dur    = 1600;
        let started;

        el.classList.add('count-done');

        const step = (ts) => {
            if (!started) started = ts;
            const p    = Math.min((ts - started) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const val  = end < 10 ? +(ease * end).toFixed(1) : Math.floor(ease * end);
            el.textContent = prefix + val + suffix;
            if (p < 1) requestAnimationFrame(step);
            else { el.textContent = prefix + end + suffix; el.classList.remove('count-done'); }
        };
        requestAnimationFrame(step);
    }

    /* ─────────────────────────────────────────────
       5. ACTIVE NAV LINK
       ─────────────────────────────────────────── */
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a, .mobile-nav a').forEach(link => {
        const href = link.getAttribute('href');
        link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
    });

    /* ─────────────────────────────────────────────
       6. SMOOTH SCROLL
       ─────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ─────────────────────────────────────────────
       7. HERO PARTICLE CANVAS (index.html)
       ─────────────────────────────────────────── */
    const canvas = document.getElementById('heroCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let W, H, particles = [];

        function resize() {
            W = canvas.width  = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        }
        window.addEventListener('resize', () => { resize(); init(); }, { passive: true });
        resize();

        class Particle {
            constructor() { this.reset(true); }
            reset(rand) {
                this.x  = Math.random() * W;
                this.y  = rand ? Math.random() * H : H + 10;
                this.r  = Math.random() * 1.5 + 0.5;
                this.vx = (Math.random() - 0.5) * 0.35;
                this.vy = -(Math.random() * 0.45 + 0.1);
                this.a  = Math.random() * 0.45 + 0.08;
            }
            update() { this.x += this.vx; this.y += this.vy; if (this.y < -10) this.reset(false); }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0,200,210,${this.a})`;
                ctx.fill();
            }
        }

        function init() { particles = Array.from({ length: 100 }, () => new Particle()); }

        function drawLines() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const d  = Math.hypot(dx, dy);
                    if (d < 95) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0,180,200,${0.07 * (1 - d / 95)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }

        function loop() {
            ctx.clearRect(0, 0, W, H);
            particles.forEach(p => { p.update(); p.draw(); });
            drawLines();
            requestAnimationFrame(loop);
        }
        init(); loop();

        /* Mouse parallax */
        const heroEl = document.getElementById('hero');
        const heroContent = document.getElementById('heroContent');
        if (heroEl && heroContent) {
            heroEl.addEventListener('mousemove', e => {
                const r  = heroEl.getBoundingClientRect();
                const dx = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
                const dy = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
                heroContent.style.transform  = `translate(${dx * 7}px, ${dy * 5}px)`;
                heroContent.style.transition = 'transform 0.05s linear';
            });
            heroEl.addEventListener('mouseleave', () => {
                heroContent.style.transform  = 'translate(0,0)';
                heroContent.style.transition = 'transform 0.6s ease';
            });
        }

        /* Cycle glass card active item */
        const glassItems = document.querySelectorAll('.glass-service-item');
        if (glassItems.length) {
            let idx = 0;
            setInterval(() => {
                glassItems[idx].classList.remove('active-service');
                idx = (idx + 1) % glassItems.length;
                glassItems[idx].classList.add('active-service');
            }, 2400);
        }
    }

    /* ─────────────────────────────────────────────
       8. TYPEWRITER (index.html)
       ─────────────────────────────────────────── */
    const twEl = document.getElementById('typewriter');
    if (twEl) {
        const words = ['Advisory.', 'Solutions.', 'Finance.', 'Leadership.', 'Insight.'];
        let wi = 0, ci = 0, deleting = false;
        function typeLoop() {
            const word = words[wi];
            twEl.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
            let del = deleting ? 55 : 105;
            if (!deleting && ci > word.length)   { del = 1800; deleting = true; }
            if (deleting  && ci < 0)             { deleting = false; ci = 0; wi = (wi + 1) % words.length; del = 350; }
            setTimeout(typeLoop, del);
        }
        setTimeout(typeLoop, 1200);
    }

    /* ─────────────────────────────────────────────
       9. ABOUT - TIMELINE ITEM HOVER GLOW
       ─────────────────────────────────────────── */
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.paddingLeft = '2.5rem';
            item.style.transition  = 'padding 0.25s ease';
        });
        item.addEventListener('mouseleave', () => {
            item.style.paddingLeft = '2rem';
        });
    });

    /* ─────────────────────────────────────────────
       10. CARDS — 3D tilt on mouse (desktop only)
       ─────────────────────────────────────────── */
    if (window.innerWidth > 768) {
        document.querySelectorAll('.service-card, .value-card, .leader-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r  = card.getBoundingClientRect();
                const x  = (e.clientX - r.left) / r.width  - 0.5;
                const y  = (e.clientY - r.top)  / r.height - 0.5;
                card.style.transform    = `perspective(600px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-6px)`;
                card.style.transition   = 'transform 0.05s linear, box-shadow 0.2s ease';
                card.style.boxShadow    = `${-x * 12}px ${-y * 12}px 30px rgba(75,39,110,0.15)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform  = '';
                card.style.boxShadow  = '';
                card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, border-top 0.3s ease';
            });
        });
    }

    /* ─────────────────────────────────────────────
       11. PAGE HERO — stagger children
       ─────────────────────────────────────────── */
    document.querySelectorAll('.page-hero > .container > *').forEach((el, i) => {
        el.style.animationDelay = `${i * 0.13}s`;
        el.style.animationFillMode = 'both';
    });

});
