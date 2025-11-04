    <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.pageYOffset > 100) {
                header.style.padding = '0.8rem 0';
            } else {
                header.style.padding = '1.2rem 0';
            }
        });

        // Counter animation
        function animateCounter(element, target) {
            let start = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    element.textContent = Math.round(target);
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start);
                }
            }, 20);
        }

        // Observe counters
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number').forEach(counter => observer.observe(counter));

        // Scroll animations
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.15 });

        document.querySelectorAll('.card, .service-card, .process-step, .who-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            scrollObserver.observe(el);
        });

        console.log('✅ Pilotimmo - Site loaded successfully');
    </script>
