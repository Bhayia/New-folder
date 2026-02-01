document.addEventListener('DOMContentLoaded', () => {
    
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hero Image Loaded Hook ---
    const toolHero = document.querySelector('.hero');
    const heroImg = document.getElementById('hero-bg');
    
    if (heroImg.complete) {
        toolHero.classList.add('loaded');
    } else {
        heroImg.addEventListener('load', () => {
            toolHero.classList.add('loaded');
        });
    }

    // --- Intersection Observer for Fade-in Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.journey-card, .section-title, .philosophy-text, .stat-item');
    
    // Add base styles for animation via JS to keep CSS clean if JS fails
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Inject CSS class for the animation state
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .in-view {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);


    // --- Package Selection & Booking Form ---
    const packageCards = document.querySelectorAll('.package-card');
    const bookingFormContainer = document.getElementById('booking-form-container');
    const selectedPackageName = document.getElementById('selected-package-name');
    const packageInput = document.getElementById('package-input');
    const bookingForm = document.getElementById('join-form');
    const formMsg = document.getElementById('form-msg');
    const submitBtn = bookingForm.querySelector('button[type="submit"]');

    packageCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from others
            packageCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked
            card.classList.add('selected');
            
            // Show form
            const pkg = card.getAttribute('data-package');
            selectedPackageName.textContent = pkg;
            packageInput.value = pkg;
            
            bookingFormContainer.classList.remove('hidden');
            
            // Scroll to form
            bookingFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    });

    // --- Detailed Form Handling ---
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get data
        const formData = {
            package: packageInput.value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            callback: document.getElementById('callback').value,
            address: document.getElementById('address').value
        };

        // UI Feedback
        const originalBtnText = submitBtn.textContent;
        submitBtn.innerHTML = "Processing Journey...";
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            console.log('Booking Request Received:', formData);
            
            submitBtn.classList.add('hidden');
            formMsg.classList.remove('hidden');
            
            // Optional: Reset form after success
            setTimeout(() => {
                bookingForm.reset();
                bookingFormContainer.classList.add('hidden');
                packageCards.forEach(c => c.classList.remove('selected'));
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('hidden');
                formMsg.classList.add('hidden');
            }, 5000);
        }, 1500);
    });
});
