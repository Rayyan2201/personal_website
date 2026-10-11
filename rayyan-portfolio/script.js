(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let themeCycleOrigin = null;
  const year = document.getElementById('year');

  if (year) year.textContent = String(new Date().getFullYear());

  const updateThemeMetaAndLabel = () => {
    const mode = root.dataset.themeMode || 'system';
    const theme = root.dataset.theme || 'light';
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#0b0e14' : '#f4f5f7');

    if (themeToggle) {
      const modeLabel = mode === 'system' ? 'Sistem otomatis' : mode === 'dark' ? 'Gelap manual' : 'Terang manual';
      const themeLabel = theme === 'dark' ? 'gelap' : 'terang';
      let nextLabel;
      if (mode === 'system') {
        nextLabel = `klik untuk mengunci tema ${theme === 'dark' ? 'terang' : 'gelap'}`;
      } else if (themeCycleOrigin) {
        nextLabel = mode !== themeCycleOrigin
          ? `klik untuk tema ${themeCycleOrigin === 'dark' ? 'gelap' : 'terang'}`
          : 'klik untuk kembali ke mode sistem';
      } else {
        nextLabel = `klik untuk beralih ke tema ${theme === 'dark' ? 'terang' : 'gelap'}`;
      }
      themeToggle.setAttribute('aria-label', `Mode tema ${modeLabel}; tampilan saat ini ${themeLabel}; ${nextLabel}`);
      themeToggle.title = `Tema: ${modeLabel} (${themeLabel}). ${nextLabel}.`;
    }
  };

  const applyTheme = (mode, persist = true) => {
    const selectedMode = mode === 'light' || mode === 'dark' ? mode : 'system';
    const effectiveTheme = selectedMode === 'system' ? (systemTheme.matches ? 'dark' : 'light') : selectedMode;
    root.dataset.themeMode = selectedMode;
    root.dataset.theme = effectiveTheme;
    updateThemeMetaAndLabel();
    if (persist) {
      try { localStorage.setItem('rayyan-theme', selectedMode); } catch (_) {}
    }
  };

  // Respect the existing manual preference; otherwise use the browser/device theme.
  applyTheme(root.dataset.themeMode || 'system', false);

  themeToggle?.addEventListener('click', () => {
    const currentMode = root.dataset.themeMode || 'system';
    let nextMode;

    if (currentMode === 'system') {
      // The first click always visibly switches away from the current system theme.
      themeCycleOrigin = root.dataset.theme || (systemTheme.matches ? 'dark' : 'light');
      nextMode = themeCycleOrigin === 'dark' ? 'light' : 'dark';
    } else if (themeCycleOrigin) {
      // Cycle through the opposite theme, the original theme, then System.
      if (currentMode !== themeCycleOrigin) {
        nextMode = themeCycleOrigin;
      } else {
        nextMode = 'system';
        themeCycleOrigin = null;
      }
    } else {
      // A preference restored from older localStorage values can still return to System.
      themeCycleOrigin = currentMode;
      nextMode = currentMode === 'dark' ? 'light' : 'dark';
    }

    applyTheme(nextMode);
  });

  const handleSystemThemeChange = () => {
    if ((root.dataset.themeMode || 'system') === 'system') applyTheme('system', false);
  };
  if (typeof systemTheme.addEventListener === 'function') {
    systemTheme.addEventListener('change', handleSystemThemeChange);
  } else if (typeof systemTheme.addListener === 'function') {
    // Support older Safari versions.
    systemTheme.addListener(handleSystemThemeChange);
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Buka menu navigasi' : 'Tutup menu navigasi');
    navLinks?.classList.toggle('open', !isOpen);
  });

  navLinks?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle?.setAttribute('aria-expanded', 'false');
      menuToggle?.setAttribute('aria-label', 'Buka menu navigasi');
    });
  });

  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    reveals.forEach((element) => observer.observe(element));
  } else {
    reveals.forEach((element) => element.classList.add('is-visible'));
  }

  // Thin page-progress indicator: keeps the visitor oriented on long pages.
  const progressBar = document.getElementById('scrollProgressBar');
  let scrollFrame = 0;
  const updateScrollProgress = () => {
    if (!progressBar) return;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    progressBar.style.transform = `scaleX(${progress})`;
    // Catch up on sections skipped by a fast scrollbar drag or a large scroll jump.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach((element) => {
        if (!element.classList.contains('is-visible') && element.getBoundingClientRect().top < window.innerHeight * 0.94) {
          element.classList.add('is-visible');
        }
      });
    }
    scrollFrame = 0;
  };
  const scheduleScrollProgress = () => {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(updateScrollProgress);
  };
  window.addEventListener('scroll', scheduleScrollProgress, { passive: true });
  window.addEventListener('resize', scheduleScrollProgress, { passive: true });
  updateScrollProgress();

  // Highlight the navigation link that corresponds to the section in view.
  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')]
    .filter((link) => document.getElementById(link.getAttribute('href').slice(1)));
  const sections = sectionLinks
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);
  if ('IntersectionObserver' in window && sections.length) {
    const activeSectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = `#${entry.target.id}`;
        sectionLinks.forEach((link) => {
          if (link.getAttribute('href') === activeId) {
            link.setAttribute('aria-current', 'location');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      });
    }, { rootMargin: '-25% 0px -62% 0px', threshold: 0 });
    sections.forEach((section) => activeSectionObserver.observe(section));
  }

  // Give cards a restrained pointer-following highlight on capable devices.
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (finePointer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.experience-card, .skill-card, .quick-facts, .contact-link').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
        card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.style.removeProperty('--spot-x');
        card.style.removeProperty('--spot-y');
      });
    });

    // Subtle 3D portrait tilt, disabled on touch screens and small layouts.
    const portraitCard = document.querySelector('.portrait-card');
    const portraitWrap = document.querySelector('.hero-visual');
    if (portraitCard && portraitWrap && window.matchMedia('(min-width: 721px)').matches) {
      portraitWrap.addEventListener('pointermove', (event) => {
        const rect = portraitCard.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 7;
        const rotateX = (0.5 - y) * 6;
        portraitCard.classList.add('tilt-active');
        portraitCard.style.transform = `translate(-12px, -2px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(-1deg)`;
      }, { passive: true });
      portraitWrap.addEventListener('pointerleave', () => {
        portraitCard.classList.remove('tilt-active');
        portraitCard.style.removeProperty('transform');
      });
    }

    // Small ripple feedback makes the main calls-to-action feel tactile.
    document.querySelectorAll('.button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const rect = button.getBoundingClientRect();
        button.style.setProperty('--ripple-x', `${event.clientX - rect.left}px`);
        button.style.setProperty('--ripple-y', `${event.clientY - rect.top}px`);
        button.classList.remove('is-rippling');
        // Force a reflow so a second click can replay the same short animation.
        void button.offsetWidth;
        button.classList.add('is-rippling');
        window.setTimeout(() => button.classList.remove('is-rippling'), 700);
      });
    });
  }

  // Close the mobile menu on Escape and when clicking outside it.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
      navLinks?.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
      menuToggle.focus();
    }
  });
  document.addEventListener('pointerdown', (event) => {
    if (menuToggle?.getAttribute('aria-expanded') !== 'true') return;
    if (navLinks?.contains(event.target) || menuToggle.contains(event.target)) return;
    navLinks?.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Buka menu navigasi');
  });
})();
