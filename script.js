document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('add-to-cart')) return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Product slider functionality
    const sliderContainer = document.querySelector('.slider-container');
    const productCards = document.querySelectorAll('.product-card');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentIndex = 0;
    const cardWidth = productCards[0].offsetWidth + 32; // width + margin
    
    function updateSlider() {
        sliderContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < productCards.length - 3) {
            currentIndex++;
            updateSlider();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        cardWidth = productCards[0].offsetWidth + 32;
        updateSlider();
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartNotification = document.querySelector('.cart-notification');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Show notification
            cartNotification.classList.add('show');
            
            // Hide after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('show');
            }, 3000);
        });
    });

    // Parallax effect for hero image
    const parallaxImg = document.querySelector('.parallax-img');
    
    if (parallaxImg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            parallaxImg.style.transform = `translateY(${scrollPosition * 0.3}px)`;
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Video play button
    const playButton = document.querySelector('.play-button');
    const video = document.querySelector('.video-container video');
    
    if (playButton && video) {
        playButton.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                this.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                this.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate when in view
    document.querySelectorAll('.feature-card, .testimonial-card, .product-card').forEach(card => {
        observer.observe(card);
    });
});