/**
 * Arté - Restaurante Interactivo Museo Arocena
 * Client-Side Interactive Engine
 */

function initAll() {
  initNavbarScroll();
  initMobileMenu();
  initMenuFilters();
  initPlateModal();
  initReservationForm();
  initFaqAccordion();
  initSmoothScroll();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* --------------------------------------------------------------------------
   1. Dynamic Menu Data & Filtering
   -------------------------------------------------------------------------- */
const MENU_ITEMS = [
  {
    id: 'm1',
    category: 'starters',
    name: 'Tártara de Atún en Lienzo Cítrico',
    artInspiration: 'Inspirado en el Impresionismo y los reflejos de luz de Sorolla',
    description: 'Atún aleta azul marinado en emulsión de yuzu y chile serrano, perlas de aguacate tatemado y velo de betabel deshidratado que imita una pincelada al óleo.',
    price: '$340 MXN',
    badge: 'Temporada Sorolla',
    pairing: 'Vino Blanco Chenin Blanc de Parras de la Fuente',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm2',
    category: 'starters',
    name: 'Jardín Escultural de Betabeles Asados',
    artInspiration: 'Homenaje a la Escultura Contemporánea del Museo Arocena',
    description: 'Variedad de betabeles confitados con queso de cabra artesanal de la Comarca Lagunera, crumble de nuez pecana garapiñada y reducción de vinagre balsámico añejo.',
    price: '$280 MXN',
    badge: 'Vegetariano',
    pairing: 'Chardonnay joven de Coahuila',
    image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm3',
    category: 'mains',
    name: 'Costilla Glaseada en Mole Barroco Virreinal',
    artInspiration: 'Colección de Arte Virreinal: Salón de los Siglos XVII y XVIII',
    description: 'Short rib braseada durante 18 horas a baja temperatura, bañada en mole artesanal de 28 ingredientes con notas de cacao y chiles secos, servida sobre puré de plátano macho.',
    price: '$520 MXN',
    badge: 'Firma de la Casa',
    pairing: 'Cabernet Sauvignon de Valle de Parras (Gran Reserva)',
    image: 'https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    category: 'mains',
    name: 'Pesca del Día en Cenizas de Habanero y Maíz',
    artInspiration: 'Interpretación de Contrastes Lumínicos del Claroscuro',
    description: 'Robalo salvaje sellado a la leña, costra de ceniza de totomoxtle, mousseline de elote amarillo tierno y emulsión de tomatillo milpero al mezcal.',
    price: '$480 MXN',
    badge: 'Sustentable',
    pairing: 'Sauvignon Blanc mineral del altiplano mexicano',
    image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm5',
    category: 'desserts',
    name: 'Esfera de Chocolate Óleo y Oro',
    artInspiration: 'Retablos Dorados y Pan de Oro Novohispano',
    description: 'Cúpula de chocolate semiamargo mexicano rellena de mousse de maracuyá y bizcocho húmedo de almendra, bañada en mesa con salsa tibia de toffee y toques de hoja de oro comestible.',
    price: '$260 MXN',
    badge: 'Experiencia en Mesa',
    pairing: 'Copa de Oporto o Carajillo de la Comarca',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm6',
    category: 'cocktails',
    name: 'Cóctel Claroscuro 1904',
    artInspiration: 'Arquitectura Neoclásica del Edificio Arocena',
    description: 'Mezcal espadín artesanal infusionado con carbón vegetal activo, licor de damiana coahuilense, néctar de toronja ruby y espuma perfumada de romero silvestre flameado.',
    price: '$220 MXN',
    badge: 'Mixología Botánica',
    pairing: 'Ideal como aperitivo de bienvenida',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm7',
    category: 'cocktails',
    name: 'Elixir de la Condesa',
    artInspiration: 'Retratos Femeninos del Siglo XIX',
    description: 'Gin premium, infusión de flor de jamaica y lavanda orgánica de la región, jugo fresco de limón eureka y cordial de peras con burbujas de prosecco.',
    price: '$210 MXN',
    badge: 'Refrescante & Floral',
    pairing: 'Perfecto para acompañar entradas y ensaladas',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm8',
    category: 'mains',
    name: 'Risotto de Hongos Silvestres y Trufa Lagunera',
    artInspiration: 'Paisajes y Botánica de Coahuila',
    description: 'Arroz arborio cocido a fuego lento en caldo concentrado de setas, queso de oveja curado local, mantequilla noisette y lajas de trufa fresca de verano.',
    price: '$410 MXN',
    badge: 'Vegetariano Gourmet',
    pairing: 'Pinot Noir joven o Nebbiolo',
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80'
  }
];

function initMenuFilters() {
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const menuContainer = document.getElementById('menu-items-grid');
  if (!menuContainer) return;

  function renderItems(filter = 'all') {
    const filtered = filter === 'all' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(item => item.category === filter);

    menuContainer.innerHTML = filtered.map(item => `
      <article class="card-editorial group bg-white rounded-2xl overflow-hidden border border-stone-200/70 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col">
        <div class="relative h-60 w-full overflow-hidden bg-stone-100">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="img-editorial w-full h-full object-cover"
            loading="lazy"
          />
          <span class="absolute top-4 left-4 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-stone-900/80 text-white backdrop-blur-md">
            ${item.badge}
          </span>
          <span class="absolute bottom-4 right-4 text-sm font-bold px-3 py-1 rounded-lg bg-white/95 text-stone-900 shadow-md">
            ${item.price}
          </span>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <p class="text-xs font-medium text-amber-800 tracking-wider uppercase mb-1.5 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-amber-600" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              ${item.artInspiration}
            </p>
            <h3 class="font-serif-display text-xl font-bold text-stone-900 group-hover:text-amber-800 transition-colors">
              ${item.name}
            </h3>
            <p class="text-sm text-stone-600 mt-2 line-clamp-3 leading-relaxed">
              ${item.description}
            </p>
          </div>

          <div class="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <span class="text-xs text-stone-500 italic">
              Maridaje: ${item.pairing.split('(')[0]}
            </span>
            <button 
              type="button" 
              onclick="openPlateDetails('${item.id}')"
              class="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-700 tracking-wide uppercase transition-colors"
            >
              Inspiración
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Initial render
  renderItems('all');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-stone-900', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-stone-700', 'hover:bg-stone-100');
      });
      btn.classList.add('bg-stone-900', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-700', 'hover:bg-stone-100');

      const filter = btn.getAttribute('data-filter') || 'all';
      renderItems(filter);
    });
  });
}

/* --------------------------------------------------------------------------
   2. Plate Detail Modal
   -------------------------------------------------------------------------- */
window.openPlateDetails = function(plateId) {
  const item = MENU_ITEMS.find(m => m.id === plateId);
  if (!item) return;

  const modal = document.getElementById('plate-modal');
  const title = document.getElementById('modal-plate-title');
  const insp = document.getElementById('modal-plate-insp');
  const desc = document.getElementById('modal-plate-desc');
  const pairing = document.getElementById('modal-plate-pairing');
  const price = document.getElementById('modal-plate-price');
  const img = document.getElementById('modal-plate-img');

  if (title) title.textContent = item.name;
  if (insp) insp.textContent = item.artInspiration;
  if (desc) desc.textContent = item.description;
  if (pairing) pairing.textContent = item.pairing;
  if (price) price.textContent = item.price;
  if (img) img.src = item.image;

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closePlateModal = function() {
  const modal = document.getElementById('plate-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

function initPlateModal() {
  const modal = document.getElementById('plate-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closePlateModal();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   3. Interactive Reservation Form & WhatsApp Integration
   -------------------------------------------------------------------------- */
function initReservationForm() {
  const form = document.getElementById('booking-form');
  const whatsappBtn = document.getElementById('btn-whatsapp-booking');
  const successModal = document.getElementById('reservation-success-modal');

  // WhatsApp quick trigger
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const name = document.getElementById('res-name')?.value || 'Invitado';
      const date = document.getElementById('res-date')?.value || 'Fecha por confirmar';
      const time = document.getElementById('res-time')?.value || 'Horario preferente';
      const guests = document.getElementById('res-guests')?.value || '2';
      const packageType = document.getElementById('res-package')?.value || 'Cena a la Carta';

      const message = `¡Hola Arté Restaurante en Museo Arocena! 🏛️🍽️\n\nQuisiera consultar disponibilidad de reservación con los siguientes detalles:\n• Nombre: ${name}\n• Personas: ${guests} comensales\n• Fecha: ${date}\n• Horario: ${time}\n• Experiencia: ${packageType}\n\n¿Tienen disponibilidad en esa fecha? Muchas gracias.`;

      const encoded = encodeURIComponent(message);
      // Link to WhatsApp API (Example number for Museo Arocena/Restaurante Concept: 528711234567)
      window.open(`https://wa.me/528711234567?text=${encoded}`, '_blank');
    });
  }

  // Form submission with validation and visual feedback
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('res-name')?.value;
      const guests = document.getElementById('res-guests')?.value;
      const date = document.getElementById('res-date')?.value;
      const time = document.getElementById('res-time')?.value;

      if (!name || !date || !time) {
        alert('Por favor completa todos los campos requeridos para tu solicitud.');
        return;
      }

      // Generate random reservation confirmation code
      const reservationId = 'ARTE-' + Math.floor(100000 + Math.random() * 900000);
      const codeElement = document.getElementById('confirmed-code');
      if (codeElement) codeElement.textContent = reservationId;

      const detailsElement = document.getElementById('confirmed-details');
      if (detailsElement) {
        detailsElement.textContent = `A nombre de ${name} para ${guests} persona(s) el ${date} a las ${time}.`;
      }

      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }

      form.reset();
    });
  }
}

window.closeSuccessModal = function() {
  const successModal = document.getElementById('reservation-success-modal');
  if (successModal) {
    successModal.classList.add('hidden');
    successModal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

/* --------------------------------------------------------------------------
   4. FAQ Accordion
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-toggle');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (btn && content) {
      btn.addEventListener('click', () => {
        const isOpen = content.classList.contains('open');

        // Close others
        document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('open'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (!isOpen) {
          content.classList.add('open');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });
}

/* --------------------------------------------------------------------------
   5. Mobile Navigation & Sticky Header Blur
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const menu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    if (menu) {
      menu.classList.remove('hidden-drawer');
      menu.classList.add('open-drawer');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (menu) {
      menu.classList.remove('open-drawer');
      menu.classList.add('hidden-drawer');
      document.body.style.overflow = '';
    }
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  navLinks.forEach(link => link.addEventListener('click', closeMenu));
}

function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-sm', 'bg-white/95');
      navbar.classList.remove('bg-white/80');
    } else {
      navbar.classList.remove('shadow-sm', 'bg-white/95');
      navbar.classList.add('bg-white/80');
    }
  });
}

/* --------------------------------------------------------------------------
   6. Smooth Anchor Scroll
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
