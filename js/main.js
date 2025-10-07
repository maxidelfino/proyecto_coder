const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const contactForm = document.getElementById('contact-form');
const buttonEmail = document.getElementById('buttonEmail');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about__text, .about__image, .project-card, .timeline__item, .contact__info, .contact__form').forEach(el => {
    el.classList.add('fade-element');
    observer.observe(el);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#buttonEmail' && targetId !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(contactForm);
        const subject = formData.get('subject') || 'Consulta';
        const body = `Nombre: ${formData.get('name')}%0D%0AEmail: ${formData.get('email')}%0D%0A%0D%0AMensaje:%0D%0A${formData.get('message')}`;

        buttonEmail.setAttribute('href', `mailto:ormasteelconstrucciones@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`);
        buttonEmail.click();

        contactForm.reset();

        const submitButton = contactForm.querySelector('.btn');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Mensaje Enviado';
        submitButton.style.backgroundColor = 'var(--color-steel-dark)';

        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    });
}