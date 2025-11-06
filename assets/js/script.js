/**
 * PILOTIMMO - Main JavaScript
 * Version: 3.0
 * Description: Clean and organized JS functionality
 */

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // 1. SMOOTH SCROLL
    // ======================================================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                }
            });
        });
    }

    // ======================================================================
    // 2. HEADER SCROLL EFFECT
    // ======================================================================
    function initHeaderScroll() {
        const header = document.querySelector('.header');
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 100) {
                header.style.padding = '0.8rem 0';
            } else {
                header.style.padding = '1.2rem 0';
            }
        });
    }

    // ======================================================================
    // 3. KPI COUNTERS
    // ======================================================================
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16); // ~60fps
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }

    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        counters.forEach(counter => observer.observe(counter));
    }

    // ======================================================================
    // 4. SCROLL ANIMATIONS FOR CARDS
    // ======================================================================
    function initScrollAnimations() {
        const elementsToAnimate = document.querySelectorAll('.card, .service-card, .process-step, .who-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });

        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }

    // ======================================================================
    // 5. FORM HANDLING
    // ======================================================================
    function initFormHandling() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('✅ Merci pour votre demande ! Nous vous recontacterons dans les 48h.');
                this.reset();
                // Ici vous pouvez ajouter l'envoi vers HubSpot ou backend
            });
        });
    }

    // ======================================================================
    // 6. MOBILE MENU
    // ======================================================================
    function initMobileMenu() {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    menuBtn.textContent = '☰';
                });
            });
        }
    }

    // ======================================================================
    // 7. LAZY LOADING IMAGES
    // ======================================================================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src || img.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            images.forEach(img => imageObserver.observe(img));
        }
    }

    // ======================================================================
    // INITIALIZATION
    // ======================================================================
    initSmoothScroll();
    initHeaderScroll();
    initCounters();
    initScrollAnimations();
    initFormHandling();
    initMobileMenu();
    initLazyLoading();

    console.log('✅ Pilotimmo - Site initialized successfully');
});
