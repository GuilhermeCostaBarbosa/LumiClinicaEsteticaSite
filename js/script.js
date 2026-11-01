/**
 * LUMI — Premium Aesthetics Clinic
 * Vanilla JavaScript interactions, navigation, lightbox, and booking logic.
 */

// ==========================================================================
// 1. CENTRALIZED CLINIC CONFIGURATION
// Easily customizable for future real clients or deployments
// ==========================================================================
const LUMI_CONFIG = {
  brandName: 'LUMI',
  tagline: 'Beauty in simplicity',
  phone: '+33 1 40 20 53 46',
  phoneRaw: '33140205346',
  whatsappNumber: '33140205346',
  whatsappDefaultMsg: 'Hello LUMI Studio, I would like to inquire about booking a personalized aesthetics consultation.',
  email: 'bonjour@lumi-studio.com',
  instagram: 'https://instagram.com/lumi.studio',
  instagramHandle: '@lumi.studio',
  address: 'Rue de Laborde, 21, 75008 Paris, France',
  openingHours: 'Mon – Sat: 09:00 – 20:00 | Sun: Closed'
};

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initVideoBannerFallback();
  initGalleryLightbox();
  initBookingModals();
  initContactForms();
  initScrollTop();
  initScrollAnimations();
  initWhatsAppCTAs();
});

// ==========================================================================
// 2. HEADER SCROLL & NAVIGATION
// ==========================================================================
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 3. MOBILE DRAWER NAVIGATION (ANIMATED & ACCESSIBLE)
// ==========================================================================
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const backdrop = document.querySelector('.mobile-drawer-backdrop');
  const navLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-btn');
  const hamburgerLabel = toggleBtn ? toggleBtn.querySelector('.hamburger-label') : null;

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.classList.add('is-open');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (hamburgerLabel) hamburgerLabel.textContent = 'Close';
    document.body.style.overflow = 'hidden';

    // Focus first link for accessibility
    const firstLink = drawer.querySelector('.mobile-nav-link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 150);
    }
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    if (hamburgerLabel) hamburgerLabel.textContent = 'Menu';
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = drawer.classList.contains('active');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
      toggleBtn.focus();
    }
  });

  // Automatically close if screen resized back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024 && drawer.classList.contains('active')) {
      closeDrawer();
    }
  }, { passive: true });
}

// ==========================================================================
// 4. VIDEO BANNER WITH ZERO-BREAKAGE FALLBACK
// ==========================================================================
function initVideoBannerFallback() {
  const videoEl = document.querySelector('.video-banner-video');
  if (!videoEl) return;

  videoEl.addEventListener('canplaythrough', () => {
    videoEl.classList.add('is-ready');
  });

  const playPromise = videoEl.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      videoEl.classList.add('is-ready');
    }).catch(() => {
      // Browser autoplay policy or pending asset: keep editorial image active
      videoEl.style.display = 'none';
    });
  }

  videoEl.addEventListener('error', () => {
    // When video file is not uploaded yet, hide video tag and showcase editorial photo
    videoEl.style.display = 'none';
  });
}

// ==========================================================================
// 5. ASYMMETRICAL GALLERY LIGHTBOX
// ==========================================================================
function initGalleryLightbox() {
  const workItems = document.querySelectorAll('.work-item');
  const lightbox = document.querySelector('.lightbox-modal');
  if (!workItems.length || !lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxCaption = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  let currentIndex = 0;
  const galleryData = Array.from(workItems).map((item) => {
    const img = item.querySelector('img');
    return {
      src: img ? img.getAttribute('src') : '',
      alt: img ? img.getAttribute('alt') : 'LUMI aesthetics treatment',
      title: item.dataset.caption || (img ? img.getAttribute('alt') : 'Clinical artistry')
    };
  });

  const showImage = (index) => {
    if (index < 0) index = galleryData.length - 1;
    if (index >= galleryData.length) index = 0;
    currentIndex = index;

    const data = galleryData[currentIndex];
    if (lightboxImg) {
      lightboxImg.src = data.src;
      lightboxImg.alt = data.alt;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = data.title;
    }
  };

  const openLightbox = (index) => {
    showImage(index);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  workItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
    item.setAttribute('tabindex', '0');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `View ${item.dataset.caption || 'gallery photo'} in lightbox`);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}

// ==========================================================================
// 6. APPOINTMENT BOOKING MODAL
// ==========================================================================
function initBookingModals() {
  const modal = document.querySelector('.booking-modal-overlay');
  const triggerBtns = document.querySelectorAll('[data-open-booking]');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal) return;

  const openModal = (preselectedService = '') => {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (preselectedService) {
      const select = modal.querySelector('select[name="service"]');
      if (select) {
        select.value = preselectedService;
      }
    }
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  triggerBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const service = btn.getAttribute('data-service') || '';
      openModal(service);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Make service cards clickable to trigger booking for that service
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card) => {
    card.addEventListener('click', () => {
      const serviceName = card.dataset.service || '';
      openModal(serviceName);
    });
  });
}

// ==========================================================================
// 7. FORM VALIDATION & CLEAR FEEDBACK
// ==========================================================================
function initContactForms() {
  const forms = document.querySelectorAll('form.needs-validation');

  forms.forEach((form) => {
    const feedback = form.querySelector('.form-feedback');
    const inputs = form.querySelectorAll('input, select, textarea');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Real-time clearance of invalid markers as user types
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
        if (feedback && feedback.classList.contains('error')) {
          feedback.style.display = 'none';
          feedback.className = 'form-feedback';
        }
      });

      input.addEventListener('focus', () => {
        if (input.classList.contains('is-invalid')) {
          input.classList.remove('is-invalid');
        }
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = form.querySelector('input[name="name"]');
      const contactInput = form.querySelector('input[name="contact"]') || form.querySelector('input[name="email"]');
      const serviceSelect = form.querySelector('select[name="service"]');

      if (!nameInput || !contactInput) return;

      const nameVal = nameInput.value.trim();
      const contactVal = contactInput.value.trim();
      const selectedService = serviceSelect ? serviceSelect.value : 'Consultation';

      let hasError = false;

      // Validate required name
      if (!nameVal) {
        nameInput.classList.add('is-invalid');
        hasError = true;
      } else {
        nameInput.classList.remove('is-invalid');
      }

      // Validate required contact
      if (!contactVal) {
        contactInput.classList.add('is-invalid');
        hasError = true;
      } else {
        contactInput.classList.remove('is-invalid');
      }

      if (hasError) {
        if (feedback) {
          feedback.style.display = 'flex';
          feedback.className = 'form-feedback error';
          feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.6rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#823024" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <div>
                <strong>Please complete the highlighted fields.</strong><br>
                <span>We need your name and contact details to reserve your private appointment.</span>
              </div>
            </div>
          `;
        }
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Indicate submitting state with elegant button micro-interaction
      const origBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.classList.add('is-submitting');
        submitBtn.innerHTML = `
          <span class="btn-text">Recording Request...</span>
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('is-submitting');
          submitBtn.innerHTML = origBtnHtml;
        }

        // Show refined, reassuring clinical confirmation
        if (feedback) {
          feedback.style.display = 'flex';
          feedback.className = 'form-feedback success';
          feedback.innerHTML = `
            <div style="display: flex; align-items: flex-start; gap: 0.65rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#27482A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0; margin-top: 2px;">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div>
                <strong>Appointment request confirmed with care, ${escapeHtml(nameVal)}.</strong><br>
                <span>Selected treatment: <em>${escapeHtml(selectedService)}</em>. Our clinical team will reach out to <strong>${escapeHtml(contactVal)}</strong> within 24 hours to coordinate your visit.</span><br>
                <span style="display: inline-block; margin-top: 0.4rem; font-size: 0.76rem; opacity: 0.85;">(Production Notice: Form ready for Netlify Forms, Formspree, or your clinic booking webhook.)</span>
              </div>
            </div>
          `;
        }

        // Clear inputs and invalid/valid classes
        form.reset();
        inputs.forEach(input => {
          input.classList.remove('is-invalid');
          input.classList.remove('is-valid');
        });
      }, 550);
    });
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================================================
// 8. SCROLL TO TOP & UTILITIES
// ==========================================================================
function initScrollTop() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================================================
// 9. WHATSAPP CLICK HANDLER
// ==========================================================================
function initWhatsAppCTAs() {
  const ctas = document.querySelectorAll('[data-whatsapp]');
  ctas.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const encodedMsg = encodeURIComponent(LUMI_CONFIG.whatsappDefaultMsg);
      const url = `https://wa.me/${LUMI_CONFIG.whatsappNumber}?text=${encodedMsg}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
}

// ==========================================================================
// 10. SCROLL-TRIGGERED ENTRANCE ANIMATIONS
// ==========================================================================
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.fade-up').forEach((el) => {
    observer.observe(el);
  });
}
