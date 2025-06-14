// Form submission handling for CUSUFEED
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get("name");
            const phone = formData.get("phone");
            const location = formData.get("location");
            const quantity = formData.get("quantity");
            const message = formData.get("message");
            
            // Create WhatsApp message
            const whatsappMessage = `Hello! I would like to order CUSUFEED.%0A%0A` +
                `Name: ${name}%0A` +
                `Phone: ${phone}%0A` +
                `Location: ${location}%0A` +
                `Quantity: ${quantity} bags (50kg each)%0A` +
                `Total Cost: UGX ${(quantity * 50000).toLocaleString()}%0A%0A` +
                `Additional Message: ${message || "None"}%0A%0A` +
                `Please confirm my order. Thank you!`;
            
            // Open WhatsApp with pre-filled message
            // Using https://wa.me/ for broader compatibility across devices and browsers
            const whatsappURL = `https://wa.me/256777280553?text=${whatsappMessage}`;
            
            // Open in a new tab/window
            window.open(whatsappURL, "_blank" );

            // Show success message
            alert("Your order request has been prepared! You will be redirected to WhatsApp to send it.");
            
            // Reset form
            this.reset();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(".benefit-card, .feature, .contact-method, .step");
    
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + "%";
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + "%";
            }
        }
        
        updateCounter();
    }

    // Trigger counter animation when stats come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll(".stat-number");
                statNumbers.forEach(stat => {
                    const value = parseInt(stat.textContent);
                    if (!isNaN(value)) {
                        animateCounter(stat, value);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector(".hero-stats");
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});
