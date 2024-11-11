// Datos de proyectos
const projectsData = [
    {
        id: 1,
        title: "E-commerce Platform",
        description: "Plataforma de comercio electrónico moderna con pasarela de pagos integrada",
        image: "assets/img/projects/ecommerce.jpg", // Imagen local
        category: "web",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 2,
        title: "Task Management App",
        description: "Aplicación de gestión de tareas con características colaborativas",
        image: "https://via.placeholder.com/600x400",
        category: "app",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        demoLink: "#",
        githubLink: "#"
    },
    {
        id: 3,
        title: "Travel Agency UI",
        description: "Diseño UI/UX para aplicación de reservas de viajes",
        image: "https://via.placeholder.com/600x400",
        category: "ui",
        technologies: ["Figma", "Adobe XD", "Prototyping"],
        demoLink: "#",
        githubLink: "#"
    }
];

// Clase principal para manejar la aplicación
class PortfolioApp {
    constructor() {
        this.initializeApp();
    }

    async initializeApp() {
        // Inicializar todos los componentes cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            this.initLoader();
            this.initTheme();
            this.initNavigation();
            this.initProjects();
            this.initSkills();
            this.initContactForm();
            this.initScrollAnimations();
            this.initBackToTop();
        });
    }

    // Loader
    initLoader() {
        const loader = document.getElementById('loader');
        if (!loader) return;

        window.addEventListener('load', () => {
            loader.classList.add('hidden');
            setTimeout(() => loader.style.display = 'none', 500);
        });
    }

    // Tema oscuro/claro
    initTheme() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) return;

        // Obtener tema guardado o preferencia del sistema
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');

        // Aplicar tema inicial
        this.applyTheme(currentTheme);

        // Toggle del tema
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            this.applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        const icon = document.querySelector('#themeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Navegación
    initNavigation() {
        const header = document.querySelector('.header');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (!header || !navToggle || !navMenu) return;

        // Toggle menú móvil
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Scroll suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', e => {
                e.preventDefault();
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');

                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                header.classList.remove('scroll-up');
                return;
            }

            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-up');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                header.classList.remove('scroll-down');
                header.classList.add('scroll-up');
            }
            lastScroll = currentScroll;
        });
    }

    // Proyectos
    initProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        const filterBtns = document.querySelectorAll('.filter-btn');
        
        if (!projectsGrid) return;

        // Renderizar proyectos
        this.renderProjects('all');

        // Filtros
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.renderProjects(filter);
            });
        });
    }

    renderProjects(filter) {
        const projectsGrid = document.getElementById('projectsGrid');
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(project => project.category === filter);

        projectsGrid.innerHTML = filteredProjects.map(project => `
            <article class="project-card" data-category="${project.category}">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay">
                        <div class="project-links">
                            <a href="${project.demoLink}" class="project-link" target="_blank">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                            <a href="${project.githubLink}" class="project-link" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-technologies">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                </div>
            </article>
        `).join('');

        // Animación de entrada
        const projects = document.querySelectorAll('.project-card');
        projects.forEach((project, index) => {
            project.style.animationDelay = `${index * 0.1}s`;
            project.classList.add('fade-in');
        });
    }

    // Habilidades
    initSkills() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-progress') + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Formulario de contacto
    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validación del formulario
            const formData = new FormData(form);
            if (!this.validateForm(formData)) return;

            try {
                // Aquí iría la lógica para enviar el formulario
                await this.submitForm(formData);
                this.showNotification('¡Mensaje enviado con éxito!', 'success');
                form.reset();
            } catch (error) {
                this.showNotification('Error al enviar el mensaje. Por favor, intenta de nuevo.', 'error');
            }
        });
    }

    validateForm(formData) {
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            this.showNotification('Por favor, ingresa un email válido.', 'error');
            return false;
        }
        return true;
    }

    async submitForm(formData) {
        // Simulación de envío de formulario
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }, 100);
    }

    // Animaciones de scroll
    initScrollAnimations() {
        const elements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => observer.observe(element));
    }

    // Botón volver arriba
    initBackToTop() {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Inicializar la aplicación
new PortfolioApp();