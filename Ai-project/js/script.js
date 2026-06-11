/* ===== MOBILE NAVIGATION ===== */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
});

/* ===== TESTIMONIALS CAROUSEL ===== */
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

const nextBtn = document.getElementById('nextTestimonial');
const prevBtn = document.getElementById('prevTestimonial');

if (nextBtn) {
    nextBtn.addEventListener('click', nextTestimonial);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevTestimonial);
}

// Auto-rotate testimonials every 6 seconds
if (testimonials.length > 0) {
    setInterval(nextTestimonial, 6000);
}

/* ===== FAQ ACCORDION ===== */
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');

        // Close all other items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current item
        if (isActive) {
            faqItem.classList.remove('active');
        } else {
            faqItem.classList.add('active');
        }
    });
});

/* ===== GALLERY FILTER ===== */
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // Filter gallery items
        galleryItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                item.style.opacity = '1';
                item.style.animation = 'fadeIn 0.4s ease';
            } else {
                item.classList.add('hidden');
                item.style.opacity = '0';
            }
        });
    });
});

/* ===== LIGHTBOX GALLERY ===== */
const lightbox = document.getElementById('lightbox');
let currentLightboxIndex = 0;

const galleryImages = [
    { label: 'Hotel Entrance', color: '#0F172A' },
    { label: 'Front Gardens', color: '#134e4a' },
    { label: 'Parking Area', color: '#1e293b' },
    { label: 'Evening Ambiance', color: '#5b21b6' },
    { label: 'Deluxe Room', color: '#7c3aed' },
    { label: 'Standard Room', color: '#1e3a8a' },
    { label: 'Executive Suite', color: '#991b1b' },
    { label: 'Room Interior', color: '#4c0519' },
    { label: 'Restaurant', color: '#f97316' },
    { label: 'Dining Area', color: '#d97706' },
    { label: 'Bar Lounge', color: '#f59e0b' },
    { label: 'Breakfast Area', color: '#fbbf24' },
    { label: 'Swimming Area', color: '#06b6d4' },
    { label: 'Fitness Center', color: '#22d3ee' },
    { label: 'Conference Room', color: '#14b8a6' },
    { label: 'Lounge Area', color: '#10b981' }
];

function openLightbox(index) {
    currentLightboxIndex = index;
    showLightboxImage(index);
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function showLightboxImage(index) {
    const image = galleryImages[index];
    const imageElement = document.getElementById('lightboxImage');
    const captionElement = document.getElementById('lightboxCaption');

    if (imageElement && captionElement) {
        imageElement.style.background = `linear-gradient(135deg, ${image.color} 0%, rgba(212, 175, 55, 0.3) 100%)`;
        imageElement.style.height = '500px';
        imageElement.style.borderRadius = '8px';
        imageElement.style.display = 'flex';
        imageElement.style.alignItems = 'center';
        imageElement.style.justifyContent = 'center';
        imageElement.style.color = 'white';
        imageElement.style.fontSize = '4rem';
        imageElement.innerHTML = '📸';
        captionElement.textContent = `${image.label} (${index + 1}/${galleryImages.length})`;
    }
}

function nextLightbox() {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryImages.length;
    showLightboxImage(currentLightboxIndex);
}

function previousLightbox() {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryImages.length) % galleryImages.length;
    showLightboxImage(currentLightboxIndex);
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextLightbox();
        if (e.key === 'ArrowLeft') previousLightbox();
        if (e.key === 'Escape') closeLightbox();
    }
});

// Close lightbox when clicking outside the image
if (lightbox) {
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

/* ===== BACK TO TOP BUTTON ===== */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===== SCROLL ANIMATIONS ===== */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe animation elements
document.querySelectorAll('.amenity-card, .room-card, .testimonial-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

/* ===== CONTACT FORM HANDLING ===== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate API call
        setTimeout(() => {
            // Create WhatsApp message
            const whatsappMessage = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\nMessage: ${formData.message}`;
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Show success message
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Optional: Send to WhatsApp
            console.log('Form data ready to be sent via WhatsApp or email');
        }, 1000);
    });
}

function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (messageDiv) {
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type}`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.className = 'form-message';
        }, 5000);
    }
}

/* ===== NEWSLETTER FORM ===== */
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Subscribing...';
            
            setTimeout(() => {
                submitBtn.textContent = 'Subscribed!';
                newsletterForm.reset();
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }, 2000);
            }, 800);
        }
    });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* ===== LAZY LOADING FOR IMAGES ===== */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/* ===== PERFORMANCE: DEBOUNCE FUNCTION ===== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/* ===== WINDOW RESIZE HANDLER ===== */
window.addEventListener('resize', debounce(() => {
    // Handle resize events
    const navMenu = document.getElementById('navMenu');
    if (navMenu && window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
}, 250));

/* ===== UTILITY: ACTIVE NAV LINK ===== */
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

/* ===== PRINT STYLES (for invoices/confirmations) ===== */
if (window.matchMedia) {
    const mediaQueryList = window.matchMedia('print');
    mediaQueryList.addListener((mql) => {
        if (mql.matches) {
            // Hide navigation and floating buttons when printing
            document.querySelector('.navbar').style.display = 'none';
            document.querySelector('.floating-whatsapp').style.display = 'none';
            document.querySelector('.back-to-top').style.display = 'none';
        }
    });
}

/* ===== ACCESSIBILITY: SKIP TO CONTENT ===== */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.ctrlKey) {
        const mainContent = document.querySelector('main') || document.querySelector('section');
        if (mainContent) {
            mainContent.focus();
        }
    }
});

/* ===== PERFORMANCE OPTIMIZATION ===== */
// Prefetch important links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:')) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);
        }
    });
});

console.log('Royal Maricay Hotel Website - All systems operational');
