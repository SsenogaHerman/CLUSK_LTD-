// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", function() {
    const mobileMenu = document.getElementById("mobile-menu");
    const navMenu = document.querySelector(".nav-menu");

    mobileMenu.addEventListener("click", function() {
        mobileMenu.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Header scroll effect
window.addEventListener("scroll", function() {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.98)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
    } else {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    }
});

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
document.addEventListener("DOMContentLoaded", function() {
    const animateElements = document.querySelectorAll(".product-card");
    
    animateElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener("load", function() {
    document.body.classList.add("loaded");
});

// Parallax effect for hero section
window.addEventListener("scroll", function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-img");
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px) scale(${1 + scrolled * 0.0001})`;
    }
});

// Add hover effects for interactive elements
document.addEventListener("DOMContentLoaded", function() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll(".btn");
    
    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + "px";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            ripple.classList.add("ripple");
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);

// Form submission handling for CLUSK general contact form
document.addEventListener("DOMContentLoaded", function() {
    const cluskContactForm = document.querySelector(".contact-form-clusk"); // Assuming you add a class 'contact-form-clusk' to this form

    if (cluskContactForm) {
        cluskContactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get("name");
            const email = formData.get("email");
            const subject = formData.get("subject");
            const message = formData.get("message");
            
            // Construct WhatsApp message
            const whatsappMessage = `Hello! I have a message from your website:%0A%0A` +
                `Name: ${name || 'N/A'}%0A` +
                `Email: ${email || 'N/A'}%0A` +
                `Subject: ${subject || 'N/A'}%0A` +
                `Message: ${message || 'N/A'}%0A%0A` +
                `Please respond at your earliest convenience.`;
            
            // Replace '256777280553' with the actual WhatsApp number for CLUSK general inquiries if different
            const whatsappURL = `https://wa.me/256777280553?text=${whatsappMessage}`;
            
            // Open in a new tab/window
            window.open(whatsappURL, "_blank" );

            // Show success message
            alert("Your message has been prepared! You will be redirected to WhatsApp to send it.");
            
            // Reset form
            this.reset();
        });
    }
});

