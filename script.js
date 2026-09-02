/* Loam Atelier — Phase 1 motion mockup. GSAP + ScrollTrigger + Lenis. */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------
     Smooth scroll (Lenis) — skipped entirely under reduced motion.
  ---------------------------------------------------------------- */
  var lenis = null;
  if (!prefersReduce && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToTarget(target) {
    var offset = -80;
    if (lenis) { lenis.scrollTo(target, { offset: offset }); }
    else if (target) {
      var y = (typeof target === 'string' ? document.querySelector(target) : target);
      if (y) window.scrollTo({ top: y.getBoundingClientRect().top + window.scrollY + offset, behavior: prefersReduce ? 'auto' : 'smooth' });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        closeMenu();
        scrollToTarget(id);
      }
    });
  });

  /* ----------------------------------------------------------------
     Custom cursor (pointer:fine only)
  ---------------------------------------------------------------- */
  if (window.matchMedia('(pointer:fine)').matches && !prefersReduce) {
    var dot = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    var xTo = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    var yTo = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    var xToRing = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    var yToRing = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    window.addEventListener('mousemove', function (e) {
      xTo(e.clientX); yTo(e.clientY);
      xToRing(e.clientX); yToRing(e.clientY);
    });

    var viewTargets = document.querySelectorAll('.pin-caption-link, .project-link, .journal-card, .about-image-wrap');
    var linkTargets = document.querySelectorAll('a, button');

    linkTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        gsap.to(ring, { opacity: 1, scale: 1, duration: 0.3 });
        gsap.to(dot, { opacity: 0, duration: 0.2 });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(ring, { opacity: 0, scale: 0.6, duration: 0.3 });
        gsap.to(dot, { opacity: 1, duration: 0.2 });
      });
    });
    viewTargets.forEach(function (el) {
      el.addEventListener('mouseenter', function () { ring.querySelector('span').style.opacity = 1; });
      el.addEventListener('mouseleave', function () { ring.querySelector('span').style.opacity = 0; });
    });
    ring.querySelector('span').style.opacity = 0;
    ring.querySelector('span').style.transition = 'opacity .2s';
  }

  /* ----------------------------------------------------------------
     Header solid state
  ---------------------------------------------------------------- */
  var header = document.querySelector('[data-header]');
  ScrollTrigger.create({
    start: 'top -80',
    onEnter: function () { header.classList.add('is-solid'); },
    onLeaveBack: function () { header.classList.remove('is-solid'); }
  });

  /* ----------------------------------------------------------------
     Full-screen menu
  ---------------------------------------------------------------- */
  var menuToggle = document.querySelector('[data-menu-open]');
  var menuClose = document.querySelector('[data-menu-close]');
  var menuOverlay = document.querySelector('[data-menu-overlay]');
  var menuItems = gsap.utils.toArray('.menu-item');
  var menuFooter = document.querySelector('.menu-footer');
  var menuTl = gsap.timeline({ paused: true })
    .set(menuOverlay, { visibility: 'visible' })
    .to(menuItems, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06 })
    .to(menuFooter, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3');

  function openMenu() {
    document.documentElement.classList.add('no-scroll');
    if (lenis) lenis.stop();
    menuOverlay.classList.add('is-open');
    menuOverlay.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuTl.play();
  }
  function closeMenu() {
    if (!menuOverlay.classList.contains('is-open')) return;
    document.documentElement.classList.remove('no-scroll');
    if (lenis) lenis.start();
    menuOverlay.classList.remove('is-open');
    menuOverlay.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuTl.reverse();
  }
  menuToggle.addEventListener('click', function () {
    menuOverlay.classList.contains('is-open') ? closeMenu() : openMenu();
  });
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', function (e) {
    if (e.target === menuOverlay) closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ----------------------------------------------------------------
     Hero entrance + ken burns + parallax + scroll indicator
  ---------------------------------------------------------------- */
  var heroLines = gsap.utils.toArray('.line-inner');
  var heroEyebrow = document.querySelector('.hero-eyebrow');

  if (prefersReduce) {
    gsap.set(heroLines, { y: '0%' });
    gsap.set(heroEyebrow, { opacity: 1, y: 0 });
  } else {
    gsap.set(heroEyebrow, { opacity: 0, y: 16 });
    var heroTl = gsap.timeline({ delay: 0.2 });
    heroTl
      .to(heroLines, { y: '0%', duration: 1.1, ease: 'power3.out', stagger: 0.12 })
      .to(heroEyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.15);

    gsap.to('[data-kenburns]', { scale: 1.08, duration: 16, ease: 'none' });
  }

  gsap.utils.toArray('[data-parallax-bg]').forEach(function (el) {
    gsap.to(el, {
      yPercent: 14, ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });
  gsap.utils.toArray('[data-parallax-inner]').forEach(function (el) {
    gsap.to(el, {
      yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  var scrollIndicator = document.querySelector('[data-scroll-indicator]');
  window.addEventListener('scroll', function onFirstScroll() {
    if (window.scrollY > 40) {
      scrollIndicator.classList.add('is-hidden');
      window.removeEventListener('scroll', onFirstScroll);
    }
  });

  /* ----------------------------------------------------------------
     Generic reveal recipe (everything except the pinned showcase /
     mobile project rows / menu, which have bespoke choreography)
  ---------------------------------------------------------------- */
  gsap.utils.toArray('.reveal-rise:not(.project-row)').forEach(function (el) {
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
    });
  });
  gsap.utils.toArray('.reveal-fade').forEach(function (el) {
    gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    });
  });

  var journalCards = gsap.utils.toArray('.journal-card');
  if (journalCards.length) {
    ScrollTrigger.batch(journalCards, {
      start: 'top 88%',
      onEnter: function (batch) { gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' }); },
      onLeaveBack: function (batch) { gsap.set(batch, { opacity: 0, y: 40 }); }
    });
    gsap.set(journalCards, { opacity: 0, y: 40 });
  }

  /* Studio intro word reveal */
  var introWords = gsap.utils.toArray('.reveal-word');
  if (introWords.length) {
    gsap.fromTo(introWords, { opacity: 0.22, filter: 'blur(6px)' }, {
      opacity: 1, filter: 'blur(0px)', duration: 0.6, stagger: 0.025, ease: 'power2.out',
      scrollTrigger: { trigger: '.intro-statement', start: 'top 72%', toggleActions: 'play none none reverse' }
    });
  }

  /* Service dividers */
  gsap.utils.toArray('[data-divider]').forEach(function (el, i) {
    gsap.to(el, {
      width: '100%', duration: 1, ease: 'power3.out', delay: i * 0.08,
      scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }
    });
  });

  /* ----------------------------------------------------------------
     Signature pinned showcase — scale-to-fullscreen + parallax +
     staggered text, cross-fading through all three projects.
  ---------------------------------------------------------------- */
  var mm = gsap.matchMedia();

  mm.add('(min-width: 769px)', function () {
    var pinSection = document.querySelector('[data-pin-section]');
    var pinStage = document.querySelector('[data-pin-stage]');
    var pinFrame = document.querySelector('[data-pin-frame]');
    var pinParallax = document.querySelector('[data-pin-parallax]');
    var plates = gsap.utils.toArray('[data-pin-plate]');
    var captions = gsap.utils.toArray('[data-pin-caption]');
    var progressEl = document.querySelector('[data-pin-progress]');

    var childSelectors = '.pin-caption-index, .word, .pin-caption-desc, .pin-caption-link';

    if (prefersReduce) {
      gsap.set(pinFrame, { width: '100vw', height: '100vh', borderRadius: 0 });
      gsap.set(captions[0], { opacity: 1 });
      gsap.set(captions[0].querySelectorAll(childSelectors), { opacity: 1, y: 0 });
      return;
    }

    gsap.set(captions, { opacity: 0, pointerEvents: 'none' });
    gsap.set(captions[0], { opacity: 1, pointerEvents: 'auto' });
    captions.forEach(function (c) {
      gsap.set(c.querySelectorAll(childSelectors), { opacity: 0, y: 24 });
    });
    gsap.set(pinStage, { backgroundColor: '#F5F2EC' });

    var T1 = 3.0, T2 = 5.0, TOTAL = 7.4;

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: pinSection,
        start: 'top top',
        end: '+=350%',
        scrub: 1,
        pin: pinStage,
        anticipatePin: 1,
        onUpdate: function (self) {
          var t = self.progress * TOTAL;
          var idx = t < T1 ? 0 : (t < T2 ? 1 : 2);
          progressEl.textContent = ('0' + (idx + 1)) + ' / 03';
        }
      }
    });

    tl.to(pinFrame, { width: '100vw', height: '100vh', borderRadius: 0, duration: 1.6, ease: 'none' }, 0);
    tl.to(pinStage, { backgroundColor: '#2A2A24', duration: 1.2, ease: 'none' }, 0);
    tl.to(pinParallax, { yPercent: -18, ease: 'none', duration: TOTAL }, 0);
    tl.to(plates[0], { scale: 1.12, ease: 'none', duration: T1 }, 0);

    tl.to(captions[0].querySelectorAll(childSelectors), { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, 1.5);
    tl.to(captions[0], { opacity: 0, duration: 0.4 }, T1 - 0.2);

    tl.to(plates[1], { opacity: 1, duration: 0.6 }, T1 - 0.2);
    tl.to(plates[0], { opacity: 0, duration: 0.6 }, T1 - 0.2);
    tl.to(plates[1], { scale: 1.12, ease: 'none', duration: T2 - T1 }, T1);
    tl.set(captions[1], { pointerEvents: 'auto' }, T1);
    tl.to(captions[1], { opacity: 1, duration: 0.4 }, T1 + 0.4);
    tl.to(captions[1].querySelectorAll(childSelectors), { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, T1 + 0.6);
    tl.to(captions[1], { opacity: 0, duration: 0.4 }, T2 - 0.2);

    tl.to(plates[2], { opacity: 1, duration: 0.6 }, T2 - 0.2);
    tl.to(plates[1], { opacity: 0, duration: 0.6 }, T2 - 0.2);
    tl.to(plates[2], { scale: 1.12, ease: 'none', duration: TOTAL - T2 }, T2);
    tl.set(captions[2], { pointerEvents: 'auto' }, T2);
    tl.to(captions[2], { opacity: 1, duration: 0.4 }, T2 + 0.4);
    tl.to(captions[2].querySelectorAll(childSelectors), { opacity: 1, y: 0, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, T2 + 0.6);
  });

  /* Mobile project rows: plain reveal (no pin — see PRODUCT.md constraint) */
  mm.add('(max-width: 768px)', function () {
    gsap.utils.toArray('.project-row').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      });
    });
  });

  /* ----------------------------------------------------------------
     Approach — pinned scrubbed step highlight (desktop), same
     choreography language as the showcase above.
  ---------------------------------------------------------------- */
  mm.add('(min-width: 769px)', function () {
    var steps = gsap.utils.toArray('.approach-step');
    if (!steps.length) return;

    if (prefersReduce) { gsap.set(steps, { opacity: 1 }); return; }

    ScrollTrigger.create({
      trigger: '.approach',
      start: 'top top',
      end: '+=200%',
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: function (self) {
        var idx = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
        steps.forEach(function (s, i) { s.classList.toggle('is-active', i === idx); });
      }
    });
  });

  /* ----------------------------------------------------------------
     Testimonial carousel (manual, odometer counter)
  ---------------------------------------------------------------- */
  (function () {
    var slides = gsap.utils.toArray('.testimonial-slide');
    var counterEl = document.querySelector('[data-counter-current]');
    var prevBtn = document.querySelector('[data-carousel-prev]');
    var nextBtn = document.querySelector('[data-carousel-next]');
    var current = 0;

    function go(nextIndex) {
      if (nextIndex === current) return;
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');

      if (prefersReduce) {
        counterEl.textContent = ('0' + (current + 1));
      } else {
        gsap.to(counterEl, {
          yPercent: -100, opacity: 0, duration: 0.25, ease: 'power2.in',
          onComplete: function () {
            counterEl.textContent = ('0' + (current + 1));
            gsap.fromTo(counterEl, { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
          }
        });
      }
    }
    if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); });
  })();

})();
