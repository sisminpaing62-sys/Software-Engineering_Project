document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================
       1. THEME TOGGLE (Dark/Light Mode)
       ========================================== */
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const savedTheme = localStorage.getItem("theme") || "light";
    
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === "dark") {
            themeIcon.className = "fas fa-sun";
        } else {
            themeIcon.className = "fas fa-moon";
        }
    }

    /* ==========================================
       2. MOBILE NAVBAR
       ========================================== */
    const menuIcon = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    menuIcon.addEventListener("click", () => {
        navbar.classList.toggle("open");
        menuIcon.querySelector("i").classList.toggle("fa-bars");
        menuIcon.querySelector("i").classList.toggle("fa-xmark");
    });

    // Close menu when a link is chosen
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            menuIcon.querySelector("i").className = "fas fa-bars";
        });
    });

    /* ==========================================
       3. STICKY HEADER & SCROLL PROGRESS BAR
       ========================================== */
    const header = document.querySelector(".header");
    const progressBar = document.getElementById("progress-bar");
    const backToTopBtn = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Sticky Header Matrix
        if (scrollTop > 50) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }

        // Scroll Progress Line calculation
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + "%";

        // Back To Top Display
        if (scrollTop > 500) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ==========================================
       4. HERO SECTION TYPING EFFECT
       ========================================== */
    const words = ["Frontend Developers", "UI/UX Designers", "Problem Solvers"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingText = document.getElementById("typing-text");

    function type() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 1500; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }
    // Fire up typing mechanism
    if(typingText) type();

    /* ==========================================
       5. SCROLL SPY & FADE-IN SECTIONS (Intersection Observer)
       ========================================== */
    const sections = document.querySelectorAll("section");
    
    const observerOptions = {
        root: null,
        threshold: 0.2,
        rootMargin: "0px"
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Animation Trigger
            if (entry.isIntersecting) {
                entry.target.classList.add("appear");
                
                // Update Nav Link Status via Scroll Spy
                const id = entry.target.getAttribute("id");
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    /* ==========================================
       6. FORM VALIDATION
       ========================================== */
    const form = document.getElementById("contact-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let isValid = true;

        // Input targets
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        // Simple Email Match Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Name Validation
        if (nameInput.value.trim() === "") {
            setError(nameInput);
            isValid = false;
        } else {
            clearError(nameInput);
        }

        // Email Validation
        if (!emailRegex.test(emailInput.value.trim())) {
            setError(emailInput);
            isValid = false;
        } else {
            clearError(emailInput);
        }

        // Message Validation
        if (messageInput.value.trim() === "") {
            setError(messageInput);
            isValid = false;
        } else {
            clearError(messageInput);
        }

        if (isValid) {
            alert("Success! Your message layout handles validation smoothly.");
            form.reset();
        }
    });

    function setError(input) {
        input.parentElement.classList.add("invalid");
    }

    function clearError(input) {
        input.parentElement.classList.remove("invalid");
    }
});
