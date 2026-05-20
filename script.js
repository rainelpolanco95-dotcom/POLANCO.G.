const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');
const heroMessages = [
  'Estrategias digitales que venden más.',
  'Branding premium para marcas ambiciosas.',
  'Publicidad efectiva con enfoque en resultados.',
];
let messageIndex = 0;

function toggleMenu() {
  mainNav.classList.toggle('open');
  navToggle.classList.toggle('active');
}

function updateHeroText() {
  const heroTitle = document.querySelector('.hero-copy h1');
  heroTitle.textContent = 'POLANCO.G';
  const heroParagraph = document.querySelector('.hero-copy p');
  heroParagraph.textContent = heroMessages[messageIndex];
  messageIndex = (messageIndex + 1) % heroMessages.length;
}

function validateForm(event) {
  event.preventDefault();
  const name = contactForm.name.value.trim();
  const email = contactForm.email.value.trim();
  const phone = contactForm.phone.value.trim();
  const interest = contactForm.interest.value;
  const message = contactForm.message.value.trim();

  if (!name || !email || !phone || !interest || !message) {
    formFeedback.textContent = 'Por favor completa todos los campos antes de enviar el formulario.';
    return;
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validPhone = /^[0-9+\s()-]{7,20}$/;

  if (!validEmail.test(email)) {
    formFeedback.textContent = 'Ingresa un correo válido.';
    return;
  }

  if (!validPhone.test(phone)) {
    formFeedback.textContent = 'Ingresa un teléfono válido.';
    return;
  }

  const whatsappPhone = '18292321745';
  const whatsappMessage = `Hola, soy ${name}. Estoy interesado en ${interest}. Mi correo es ${email}, mi teléfono es ${phone}. Mensaje: ${message}`;
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`;

  formFeedback.style.color = '#9df5ff';
  formFeedback.textContent = 'Abriendo WhatsApp para enviar tu solicitud al número 8292321745...';
  window.open(whatsappUrl, '_blank');
  contactForm.reset();
}

function handleScroll() {
  if (window.scrollY > 450) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Animación de aparición de tarjetas aliadas en el viewport
function observeAlliedCards() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const alliedCards = document.querySelectorAll('.allied-card');
  alliedCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
  });
}

// Filtro de categorías para aliados
function setupAlliedFilters() {
  const categories = ['all', 'marketing', 'diseño', 'desarrollo', 'publicidad', 'consultoría', 'e-commerce'];
  const container = document.querySelector('.allies-grid');
  
  if (!container) return;

  const filterContainer = document.createElement('div');
  filterContainer.className = 'filter-buttons';
  filterContainer.style.display = 'flex';
  filterContainer.style.justifyContent = 'center';
  filterContainer.style.gap = '1rem';
  filterContainer.style.marginBottom = '2rem';
  filterContainer.style.flexWrap = 'wrap';

  categories.forEach((category) => {
    const btn = document.createElement('button');
    btn.textContent = category === 'all' ? 'Ver Todo' : category.charAt(0).toUpperCase() + category.slice(1);
    btn.className = 'filter-btn';
    btn.style.padding = '0.6rem 1.2rem';
    btn.style.borderRadius = '999px';
    btn.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    btn.style.background = category === 'all' ? 'var(--red)' : 'transparent';
    btn.style.color = 'var(--white)';
    btn.style.cursor = 'pointer';
    btn.style.fontWeight = '600';
    btn.style.transition = 'all 0.3s ease';
    
    if (category === 'all') btn.style.boxShadow = '0 8px 24px rgba(255, 31, 63, 0.3)';

    btn.addEventListener('mouseover', () => {
      if (category !== 'all') {
        btn.style.borderColor = 'rgba(255, 31, 63, 0.5)';
        btn.style.background = 'rgba(255, 31, 63, 0.1)';
      }
    });

    btn.addEventListener('mouseout', () => {
      if (category !== 'all') {
        btn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        btn.style.background = 'transparent';
      }
    });

    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.style.background = 'transparent';
        b.style.boxShadow = 'none';
        b.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      });

      btn.style.background = 'var(--red)';
      btn.style.boxShadow = '0 8px 24px rgba(255, 31, 63, 0.3)';
      btn.style.borderColor = 'var(--red)';

      const cards = document.querySelectorAll('.allied-card');
      cards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0.3';
          card.style.transform = 'scale(0.95)';
        }
      });
    });

    filterContainer.appendChild(btn);
  });

  container.parentElement.insertBefore(filterContainer, container);
}

// Efectos hover personalizados para tarjetas aliadas
function setupAlliedHoverEffects() {
  const alliedCards = document.querySelectorAll('.allied-card');
  
  alliedCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const style = card.getAttribute('style') || '';
      if (!style.includes('--mouse')) {
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  });
}

navToggle.addEventListener('click', toggleMenu);
backToTop.addEventListener('click', scrollToTop);
contactForm.addEventListener('submit', validateForm);
window.addEventListener('scroll', handleScroll);

setInterval(updateHeroText, 4200);
updateHeroText();

// Inicializar observador de tarjetas aliadas cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  observeAlliedCards();
  setupAlliedFilters();
  setupAlliedHoverEffects();
});
