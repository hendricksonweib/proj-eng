document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu mobile
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Animação de scroll suave para links de navegação
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
                
                // Fechar o menu mobile se estiver aberto
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // Animação de números (contador para estatísticas)
    function animateNumbers() {
        const statElements = document.querySelectorAll('.stat-number');
        
        statElements.forEach(element => {
            const targetValue = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // duração da animação em ms
            const startTime = performance.now();
            
            function updateNumber(currentTime) {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const currentValue = Math.floor(progress * targetValue);
                
                element.textContent = currentValue;
                
                if (progress < 1) {
                    requestAnimationFrame(updateNumber);
                } else {
                    element.textContent = targetValue;
                }
            }
            
            requestAnimationFrame(updateNumber);
        });
    }
    
    // Iniciar animações de números quando visíveis na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }

    // Carrossel de depoimentos
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevTestimonialBtn = document.getElementById('prevTestimonial');
    const nextTestimonialBtn = document.getElementById('nextTestimonial');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialSlides.forEach((slide, i) => {
            slide.classList.toggle('hidden', i !== index);
        });
    }

    if (testimonialSlides.length > 0 && prevTestimonialBtn && nextTestimonialBtn) {
        // Mostrar o primeiro depoimento
        showTestimonial(0);

        // Botões de navegação
        nextTestimonialBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        });

        prevTestimonialBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-rotação a cada 5 segundos
        setInterval(function() {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
}); 