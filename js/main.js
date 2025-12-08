// ============================================
// Tu Aliado Digital - JavaScript
// Smooth interactions and scroll animations
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. Smooth Scroll for Anchor Links
    // ============================================
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                return;
            }

            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================================
    // 2. Scroll Reveal Animation
    // ============================================
    const revealElements = document.querySelectorAll('.empathy-card, .pricing-card, .testimonial-card');

    // Add scroll-reveal class to elements
    revealElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing after reveal
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // 3. Enhanced Button Interactions
    // ============================================
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ============================================
    // 4. Analytics Tracking (Placeholder)
    // ============================================
    // Track CTA clicks
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-white');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function () {
            const buttonText = this.textContent.trim();
            console.log('CTA Click:', buttonText);
            // Add Google Analytics or similar tracking here
            // Example: gtag('event', 'cta_click', { 'button_text': buttonText });
        });
    });

    // ============================================
    // 5. Performance: Lazy Load Images
    // ============================================
    // Native loading="lazy" is now used in HTML.
    // Previous JS implementation was removing src if data-src wasn't present.

    // ============================================
    // 6. Contact Form Logic (Formspree Integration)
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            // 1. Get Values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;

            // 2. Show Loading State
            button.disabled = true;
            button.textContent = 'Enviando...';

            try {
                // 3. Send to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    console.log('✅ Formulario enviado con éxito');

                    // UI Feedback
                    button.textContent = '¡Mensaje Enviado! ✓';
                    button.style.backgroundColor = '#10B981'; // Success Green
                    button.style.borderColor = '#10B981';

                    // Reset Form
                    contactForm.reset();

                    // Alert (Simple feedback)
                    alert(`¡Gracias ${name}! He recibido tu solicitud. Te escribiré a ${email} en menos de 24 horas.`);

                    // Reset Button after delay
                    setTimeout(() => {
                        button.disabled = false;
                        button.textContent = originalText;
                        button.style.backgroundColor = ''; // Reset to CSS default
                        button.style.borderColor = '';
                    }, 5000);
                } else {
                    // Error from Formspree
                    throw new Error('Error al enviar el formulario');
                }

            } catch (error) {
                // Error handling
                console.error('❌ Error al enviar:', error);

                button.textContent = '❌ Error al enviar';
                button.style.backgroundColor = '#EF4444'; // Error Red
                button.style.borderColor = '#EF4444';

                alert('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo o contáctame directamente por email o WhatsApp.');

                // Reset Button after delay
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.style.borderColor = '';
                }, 3000);
            }
        });
    }

    // ============================================
    // 7. Console Art (Easter Egg)
    // ============================================
    console.log('%c👋 Hola, developer curioso!', 'font-size: 20px; font-weight: bold; color: #1E3A8A;');
    console.log('%c¿Te gusta lo que ves? Trabajemos juntos.', 'font-size: 14px; color: #6B7280;');
    console.log('%cContacto: info@tualiadodigital.tech', 'font-size: 12px; color: #10B981;');

});

// ============================================
// 7. Add Ripple Effect Styling Dynamically
// ============================================
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
