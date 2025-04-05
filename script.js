document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle for mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('nav-active')) {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
                navLinks.forEach(link => {
                    link.style.animation = '';
                });
            }
        });
    });
    
    // Create floating cookie particles
    createCookieParticles();
    
    // Sticky navigation on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.padding = '1rem 5%';
            nav.style.boxShadow = '0 5px 15px rgba(107, 66, 38, 0.1)';
        } else {
            nav.style.padding = '1.5rem 5%';
            nav.style.boxShadow = '0 2px 10px rgba(107, 66, 38, 0.1)';
        }
    });
    
    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.team-card, .portfolio-item, .about p, h2').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Function to create floating cookie particles
function createCookieParticles() {
    const particlesContainer = document.querySelector('.cookie-particles');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('cookie-particle');
        
        // Randomly determine if it's a cookie or a crumb
        const isCookie = Math.random() > 0.5;
        
        // Set particle styles
        particle.style.position = 'absolute';
        particle.style.width = isCookie ? `${Math.random() * 20 + 10}px` : `${Math.random() * 5 + 3}px`;
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = isCookie ? '#d7a86e' : '#b27c4d';
        particle.style.borderRadius = isCookie ? '50%' : '2px';
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        
        // If it's a cookie, add chocolate chips
        if (isCookie && Math.random() > 0.5) {
            particle.style.backgroundImage = 'radial-gradient(circle at 30% 30%, #6b4226 2px, transparent 2px), radial-gradient(circle at 70% 40%, #6b4226 2px, transparent 2px), radial-gradient(circle at 40% 70%, #6b4226 2px, transparent 2px)';
        }
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animation
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        
        particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 100}px, ${Math.random() * 100}px) rotate(90deg);
            }
            50% {
                transform: translate(${Math.random() * -100}px, ${Math.random() * 100}px) rotate(180deg);
            }
            75% {
                transform: translate(${Math.random() * -100}px, ${Math.random() * -100}px) rotate(270deg);
            }
            100% {
                transform: translate(0, 0) rotate(360deg);
            }
        }
        
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }
        
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all required fields', 'error');
            return;
        }
        
        // Here you would normally send the data to a server
        // For demo purposes, we'll just show a success message
        showFormMessage('Thanks for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        this.reset();
    });
}

// Function to show form submission messages
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message', type);
    messageElement.textContent = message;
    
    // Add to DOM
    const form = document.querySelector('.contact-form form');
    form.parentNode.insertBefore(messageElement, form.nextSibling);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 5000);
}

// Portfolio item hover effect enhancement
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        // Add sprinkle animation
        const overlay = this.querySelector('.overlay');
        
        // Create sprinkles
        for (let i = 0; i < 15; i++) {
            const sprinkle = document.createElement('div');
            sprinkle.classList.add('sprinkle');
            
            // Random position
            sprinkle.style.left = `${Math.random() * 100}%`;
            sprinkle.style.top = `${Math.random() * 100}%`;
            
            // Random size and rotation
            const size = Math.random() * 5 + 2;
            sprinkle.style.width = `${size}px`;
            sprinkle.style.height = `${size}px`;
            sprinkle.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            // Random color
            const colors = ['#fef6f0', '#fff0e0', '#d7a86e', '#b27c4d'];
            sprinkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Animation
            sprinkle.style.animation = `sprinkle 1s ease-out forwards`;
            
            overlay.appendChild(sprinkle);
        }
    });
    
    item.addEventListener('mouseleave', function() {
        // Remove sprinkles when mouse leaves
        const sprinkles = this.querySelectorAll('.sprinkle');
        sprinkles.forEach(sprinkle => {
            sprinkle.remove();
        });
    });
});

// Add sprinkle animation keyframes
const sprinkleStyle = document.createElement('style');
sprinkleStyle.innerHTML = `
    @keyframes sprinkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(1.5) rotate(45deg);
            opacity: 0;
        }
    }
    
    .form-message {
        padding: 1rem;
        margin-top: 1rem;
        border-radius: 10px;
        text-align: center;
        transition: opacity 0.5s ease;
    }
    
    .form-message.success {
        background-color: rgba(107, 142, 35, 0.2);
        color: #556b2f;
    }
    
    .form-message.error {
        background-color: rgba(220, 20, 60, 0.2);
        color: #8b0000;
    }
    
    .form-message.fade-out {
        opacity: 0;
    }
`;
document.head.appendChild(sprinkleStyle);