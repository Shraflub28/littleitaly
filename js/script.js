// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Force elements to be visible (fallback for animation issues)
    document.querySelectorAll('.menu-item, .speciality-item, .about-content > div, .contact-container > div, .section-title, .menu-grid, .speciality-items').forEach(element => {
        element.style.opacity = '1';
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Active Navigation Link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Menu Category Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Here you would add filter logic for menu items
                const category = this.textContent.toLowerCase();
                console.log('Filtering by:', category);
                
                // Placeholder for actual filtering logic
                // This would be connected to your backend or data structure
            });
        });
    }

    // Form Submission Handling
    const contactForm = document.querySelector('.contact-form form');
    const reservationForm = document.querySelector('.reservation-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formValid = validateForm(this);
            
            if (formValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                submitBtn.textContent = 'SENDING...';
                
                // Simulate API call
                setTimeout(() => {
                    submitBtn.textContent = 'SENT SUCCESSFULLY';
                    this.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        submitBtn.textContent = 'SEND MESSAGE';
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form validation
            const formValid = validateForm(this);
            
            if (formValid) {
                // Simulate form submission
                const reserveBtn = this.querySelector('.reserve-btn');
                reserveBtn.textContent = 'PROCESSING...';
                
                // Simulate API call
                setTimeout(() => {
                    reserveBtn.textContent = 'RESERVED SUCCESSFULLY';
                    this.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(() => {
                        reserveBtn.textContent = 'BOOK NOW';
                    }, 3000);
                }, 1500);
            }
        });
    }
    
    // Testimonial Carousel (if you add testimonials later)
    setupTestimonialCarousel();

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Form Validation Function
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('error');
            
            // Add error message if it doesn't exist
            let errorMsg = input.nextElementSibling;
            if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                errorMsg = document.createElement('div');
                errorMsg.classList.add('error-message');
                errorMsg.textContent = 'This field is required';
                input.parentNode.insertBefore(errorMsg, input.nextSibling);
            }
        } else {
            input.classList.remove('error');
            
            // Remove error message if it exists
            const errorMsg = input.nextElementSibling;
            if (errorMsg && errorMsg.classList.contains('error-message')) {
                errorMsg.remove();
            }
            
            // Email validation
            if (input.type === 'email' && !validateEmail(input.value)) {
                isValid = false;
                input.classList.add('error');
                
                let errorMsg = input.nextElementSibling;
                if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                    errorMsg = document.createElement('div');
                    errorMsg.classList.add('error-message');
                    errorMsg.textContent = 'Please enter a valid email address';
                    input.parentNode.insertBefore(errorMsg, input.nextSibling);
                }
            }
        }
    });
    
    return isValid;
}

// Email Validation Function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Setup Testimonial Carousel Function (for future implementation)
function setupTestimonialCarousel() {
    // Placeholder for testimonial carousel functionality
    // This can be implemented when testimonials are added to the website
    console.log('Testimonial carousel ready for implementation');
}

// Add animation when elements come into view
function animateOnScroll() {
    // Target elements with the specific animate-on-scroll class
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
    
    // Make sure all elements are visible regardless of animation status
    document.querySelectorAll('.menu-item, .speciality-item, .menu-grid, .speciality-items').forEach(element => {
        if (element.style.opacity !== '1') {
            element.style.opacity = '1';
        }
    });
}

// Only add this event listener if it hasn't been added in index.html
if (!window.animateScrollListenerAdded) {
    window.addEventListener('scroll', animateOnScroll);
    window.animateScrollListenerAdded = true;
} 