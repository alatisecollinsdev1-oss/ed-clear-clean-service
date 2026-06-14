/* ============================================================
   ED CLEAR & CLEAN SERVICES — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── PAGE LOADER ──────────────────────────────────────────
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1200);
    });
  }

  // ── STICKY HEADER ────────────────────────────────────────
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    // Back to top
    const btt = document.querySelector('.back-to-top');
    if (btt) {
      btt.classList.toggle('visible', window.scrollY > 400);
    }
    // Parallax
    document.querySelectorAll('.parallax-bg').forEach(el => {
      const speed = parseFloat(el.dataset.speed) || 0.4;
      const rect  = el.closest('section, .page-hero, .cta-banner')?.getBoundingClientRect();
      if (rect) {
        const offset = rect.top * speed;
        el.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    });
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── MOBILE MENU ──────────────────────────────────────────
  const hamburger    = document.querySelector('.hamburger');
  const mobileMenu   = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      mobileOverlay.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileOverlay.addEventListener('click', closeMobileMenu);
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
  }
  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ── ACTIVE NAV LINK ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') === currentPage) a.classList.add('active');
  });

  // ── SCROLL REVEAL ────────────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Underline draw
        const underline = entry.target.querySelector?.('.underline-draw');
        if (underline) underline.classList.add('animated');
        // Process line
        const pLine = entry.target.querySelector?.('.process-line-fill');
        if (pLine) pLine.classList.add('animated');
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    revealObserver.observe(el);
  });

  // Also observe section headers for underline
  document.querySelectorAll('.section-header').forEach(el => revealObserver.observe(el));
  document.querySelectorAll('.process-grid').forEach(el => revealObserver.observe(el));

  // ── COUNTER ANIMATION ────────────────────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const target   = parseInt(el.dataset.count);
    const suffix   = el.dataset.suffix || '';
    const duration = 2000;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target + suffix;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, step);
  }

  // ── HERO WORD REVEAL ─────────────────────────────────────
  const heroHeadline = document.querySelector('.hero-headline');
  if (heroHeadline) {
    const words = heroHeadline.textContent.trim().split(' ');
    heroHeadline.innerHTML = words.map((w, i) =>
      `<span class="hero-word" style="animation-delay:${0.3 + i * 0.1}s">${w}&nbsp;</span>`
    ).join('');
  }

  // ── BACK TO TOP ──────────────────────────────────────────
  const btt = document.querySelector('.back-to-top');
  if (btt) btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ── SCROLL INDICATOR ─────────────────────────────────────
  const scrollInd = document.querySelector('.scroll-indicator');
  if (scrollInd) {
    scrollInd.addEventListener('click', () => {
      const next = document.querySelector('#about-snippet, .about-section, section:nth-of-type(2)');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── FAQ ACCORDION ────────────────────────────────────────
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── CONTACT FORM ─────────────────────────────────────────
  const quoteForm = document.getElementById('quoteForm');
  if (quoteForm) {
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate required fields
    let valid = true;
    quoteForm.querySelectorAll('[required]').forEach(field => {
      field.closest('.form-group').classList.remove('shake');
      if (!field.value.trim()) {
        valid = false;
        field.closest('.form-group').classList.add('shake');
        setTimeout(() => field.closest('.form-group').classList.remove('shake'), 500);
      }
    });

    if (!valid) return;

    // Show loading state on button
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(quoteForm);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const data = await response.json();

      if (data.success) {
        // Show success state
        quoteForm.style.display = 'none';
        const success = document.getElementById('formSuccess');
        if (success) success.classList.add('show');
      } else {
        // Show error
        submitBtn.innerHTML = '❌ Something went wrong — try again';
        submitBtn.disabled = false;
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 3000);
      }
    } catch (err) {
      submitBtn.innerHTML = '❌ Network error — try again';
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 3000);
    }
  });
}

  // ── BUBBLES (Hero) ───────────────────────────────────────
  const bubbleContainer = document.querySelector('.bubbles-wrap');
  if (bubbleContainer) {
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('div');
      b.className = 'bubble';
      const size = Math.random() * 24 + 8;
      b.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random() * 100}%;
        bottom:-${size}px;
        animation-duration:${Math.random() * 8 + 6}s;
        animation-delay:${Math.random() * 6}s;
      `;
      bubbleContainer.appendChild(b);
    }
  }

  // ── PAGE HERO PARALLAX ───────────────────────────────────
  const pageHeroBg = document.querySelector('.page-hero-bg');
  if (pageHeroBg) {
    setTimeout(() => pageHeroBg.style.transform = 'scale(1)', 100);
  }

  // ── SMOOTH HOVER ON SERVICE CARDS (touch fallback) ───────
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('touchstart', () => card.classList.add('touch-hover'), { passive: true });
    card.addEventListener('touchend',   () => setTimeout(() => card.classList.remove('touch-hover'), 400));
  });

});
