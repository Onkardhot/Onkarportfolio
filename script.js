/* ============================================
   ONKAR K - PREMIUM PORTFOLIO
   Cinematic Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initCursor();
    initNavigation();
    initScrollProgress();
    initTyping();
    initCounters();
    initSkillRings();
    initThreeJS();
    initSmoothScroll();
    initForm();
    initHeroAnim();
    initScrollAnimations();
});

/* ============================================
   PRELOADER
   ============================================ */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    const fill = document.getElementById('progress-fill');
    let percent = 0;

    const interval = setInterval(function() {
        percent += Math.random() * 18;
        if (percent >= 100) {
            percent = 100;
            clearInterval(interval);
            setTimeout(function() {
                preloader.classList.add('hidden');
                document.body.classList.remove('no-scroll');
                initHeroAnim();
            }, 600);
        }
        fill.style.width = percent + '%';
    }, 100);
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mx = 0, my = 0;
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', function(e) {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    function animate() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        follower.style.left = fx + 'px';
        follower.style.top = fy + 'px';
        requestAnimationFrame(animate);
    }
    animate();

    // Hover effects
    const elements = document.querySelectorAll('a, button, .project-card, .skill-card, .service-card, .timeline-card, .expertise-card');
    elements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        el.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const nav = document.getElementById('nav');
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Active link
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(function(section) {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav-link').forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Mobile toggle
    if (toggle) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }

    // Smooth scroll
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
            menu.classList.remove('active');
        });
    });
}

/* ============================================
   SCROLL PROGRESS
   ============================================ */
function initScrollProgress() {
    const fill = document.getElementById('scroll-fill');
    if (!fill) return;

    window.addEventListener('scroll', function() {
        const winH = window.innerHeight;
        const docH = document.documentElement.scrollHeight - winH;
        const scrT = window.scrollY;
        const percent = (scrT / docH) * 100;
        fill.style.height = percent + '%';
    });
}

/* ============================================
   TYPING ANIMATION
   ============================================ */
function initTyping() {
    const text = document.getElementById('typed-text');
    if (!text) return;

    const phrases = [
        'ELV Design Engineer',
        'BMS Specialist',
        'BIM Modeler',
        'AutoCAD Expert'
    ];
    let idx = 0, charIdx = 0, deleting = false;

    function type() {
        const current = phrases[idx];
        if (deleting) {
            text.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            text.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = deleting ? 30 : 80;
        if (!deleting && charIdx === current.length) {
            deleting = true;
            speed = 2000;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            idx = (idx + 1) % phrases.length;
            speed = 500;
        }
        setTimeout(type, speed);
    }
    setTimeout(type, 1200);
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    let animated = false;

    function animate() {
        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const step = target / 30;
            let current = 0;

            function update() {
                if (current < target) {
                    current += step;
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }
            update();
        });
    }

    window.addEventListener('scroll', function() {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats && !animated) {
            const rect = heroStats.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                animate();
                animated = true;
            }
        }
    });
}

/* ============================================
   SKILL RINGS
   ============================================ */
function initSkillRings() {
    const rings = document.querySelectorAll('.ring-fill');

    window.addEventListener('scroll', function() {
        rings.forEach(function(ring) {
            const progress = ring.getAttribute('data-progress');
            const card = ring.closest('.skill-card');
            const rect = card.getBoundingClientRect();

            if (rect.top < window.innerHeight - 100) {
                const offset = 314 - (314 * progress / 100);
                ring.style.strokeDashoffset = offset;
            }
        });
    });
}

/* ============================================
   THREE.JS BACKGROUND
   ============================================ */
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const geometry = new THREE.BufferGeometry();
    const count = 150;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 10;
        positions[i + 1] = (Math.random() - 0.5) * 10;
        positions[i + 2] = (Math.random() - 0.5) * 5;
        colors[i] = 0.23;
        colors[i + 1] = 0.51;
        colors[i + 2] = 0.96;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    camera.position.z = 5;

    // Mouse
    let mx = 0, my = 0;
    document.addEventListener('mousemove', function(e) {
        mx = (e.clientX / window.innerWidth) * 2 - 1;
        my = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    function animate() {
        requestAnimationFrame(animate);
        particles.rotation.x += 0.0004 + my * 0.0008;
        particles.rotation.y += 0.0004 + mx * 0.0008;
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ============================================
   SMOOTH SCROLL
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}

/* ============================================
   FORM VALIDATION
   ============================================ */
function initForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;

        form.querySelectorAll('input[required], textarea[required], select[required]').forEach(function(input) {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#ef4444';
            } else {
                input.style.borderColor = '';
            }
        });

        if (valid) {
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<span>Sent!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#22c55e';
            setTimeout(function() {
                btn.innerHTML = original;
                btn.style.background = '';
                form.reset();
            }, 2500);
        }
    });
}

/* ============================================
   HERO ANIMATIONS
   ============================================ */
function initHeroAnim() {
    if (typeof gsap !== 'undefined') {
        gsap.from('.hero-badge', { duration: 0.8, y: -30, opacity: 0, ease: 'power3.out' });
        gsap.from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.1 });
        gsap.from('.hero-subtitle', { duration: 0.8, y: 20, opacity: 0, ease: 'power3.out', delay: 0.2 });
        gsap.from('.hero-tagline', { duration: 0.8, y: 20, opacity: 0, ease: 'power3.out', delay: 0.3 });
        gsap.from('.hero-cta', { duration: 0.8, y: 20, opacity: 0, ease: 'power3.out', delay: 0.4 });
        gsap.from('.hero-stats', { duration: 0.8, y: 20, opacity: 0, ease: 'power3.out', delay: 0.5 });
    }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(function(header) {
            gsap.from(header, {
                scrollTrigger: { trigger: header, start: 'top 80%' },
                duration: 1, y: 40, opacity: 0, ease: 'power3.out'
            });
        });

        // Animate cards
        gsap.utils.toArray('.about-card, .skill-card, .project-card, .service-card, .timeline-card').forEach(function(card, i) {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 85%' },
                duration: 0.8, y: 40, opacity: 0, ease: 'power3.out', delay: i * 0.05
            });
        });

        // Timeline progress
        gsap.utils.toArray('.timeline-progress').forEach(function(progress) {
            gsap.to(progress, {
                scrollTrigger: { trigger: '.timeline', start: 'top 60%', end: 'bottom 60%', scrub: 0.3 },
                height: '100%'
            });
        });
    }
}

/* ============================================
   END
   ============================================ */