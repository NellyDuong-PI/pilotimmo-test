/**
 * PILOTIMMO - Main JavaScript
 * Version: 3.1
 * Description: Clean and organized JS functionality
 */

document.addEventListener('DOMContentLoaded', () => {

    // ======================================================================
    // 1. SMOOTH SCROLL
    // ======================================================================
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

    // ======================================================================
    // 2. HEADER SCROLL EFFECT (avec redimension logo)
    // ======================================================================
    const header = document.querySelector('.header');
    const logoImg = document.querySelector('.logo img');

    const headerScroll = () => {
        if (window.pageYOffset > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', headerScroll);
    headerScroll(); // Init au chargement

    // ======================================================================
    // 3. KPI COUNTERS
    // ======================================================================
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };

    document.querySelectorAll('.stat-number').forEach(counter => {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(counter);
    });

    // ======================================================================
    // 4. SCROLL ANIMATIONS FOR CARDS
    // ======================================================================
    const elementsToAnimate = document.querySelectorAll('.card, .service-card, .process-step, .who-card');
    const observerAnim = new IntersectionObserver((entries) => {
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
        observerAnim.observe(el);
    });

    // ======================================================================
    // 5. FORM HANDLING
    // ======================================================================
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('✅ Merci pour votre demande ! Nous vous recontacterons dans les 48h.');
            this.reset();
        });
    });

    // ======================================================================
    // 6. MOBILE MENU
    // ======================================================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ======================================================================
    // 7. LAZY LOADING IMAGES
    // ======================================================================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
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
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    console.log('✅ Pilotimmo - Site initialized successfully');
});
