document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');
    const navUl = document.querySelector('nav ul'); // For closing mobile nav
    const navToggle = document.querySelector('.nav-toggle'); // For closing mobile nav


    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) { // Only preventDefault for internal links
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile nav if open and it's an internal link click
                    if (navUl.classList.contains('nav-active')) {
                        navUl.classList.remove('nav-active');
                        navToggle.classList.remove('active');
                    }
                }
            }
        });
    });

    // Mobile navigation toggle
    if (navToggle && navUl) {
        navToggle.addEventListener('click', () => {
            navUl.classList.toggle('nav-active');
            navToggle.classList.toggle('active');
        });
    }

    // Contact Form Handling (Basic - logs to console)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (name && email && message) {
                console.log('Form Submitted:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Message:', message);

                if (formStatus) {
                    formStatus.textContent = 'Thank you! Your message has been "sent" (logged to console).';
                    formStatus.style.color = 'lightgreen'; // Adjusted for dark background
                }
                contactForm.reset();
                setTimeout(() => { if(formStatus) formStatus.textContent = ''; }, 5000); // Clear status after 5s
            } else {
                if (formStatus) {
                    formStatus.textContent = 'Please fill out all fields.';
                    formStatus.style.color = '#ffc107'; // Warning color
                }
            }
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active navigation link highlighting on scroll
    const sections = document.querySelectorAll('main section');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref && linkHref.substring(1) === current) {
                link.classList.add('active');
            }
        });
        // Handle case for top of page
        if (current === '' && pageYOffset < sections[0].offsetTop - headerHeight - 50) {
            const homeLink = document.querySelector('nav ul li a[href="#hero"]');
            if (homeLink) homeLink.classList.add('active');
        }
    });
});