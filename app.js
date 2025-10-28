// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && message) {
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            this.reset();
        } else {
            alert('Por favor completa todos los campos.');
        }
    });
}

// Add active class to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Feature card animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and download cards
document.querySelectorAll('.feature, .download-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Download button tracking
document.querySelectorAll('.btn-download').forEach(button => {
    button.addEventListener('click', function(e) {
        const platform = this.closest('.download-card').querySelector('h3').textContent;
        console.log(`Download initiated for: ${platform}`);
        
        // Show download message
        const originalText = this.textContent;
        this.textContent = 'Iniciando descarga...';
        
        setTimeout(() => {
            this.textContent = originalText;
        }, 2000);
    });
});

// Add current year to footer
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('footer p');
if (footerText && footerText.textContent.includes('2025')) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}
