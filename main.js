/* LXRY — motion & interaction
   GSAP + ScrollTrigger + SplitText + Lenis (all self-hosted in /vendor).
   Rule: WhatsApp, phone, email and external links are never delayed by any animation. */
(function () {
  'use strict';
  var doc = document.documentElement;
  var hasGsap = typeof window.gsap !== 'undefined';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  var motion = hasGsap && !reduce.matches;
  var lenis = null;

  function markReady() { doc.classList.add('ready'); }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------------- Press feedback + ripple (every button) ---------------- */
  var pressables = '.btn, .social, .menu-btn, .lb-btn';
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest(pressables);
    if (!el || (e.pointerType === 'mouse' && e.button !== 0)) return;
    el.classList.add('is-pressed');
    window.setTimeout(function () { el.classList.remove('is-pressed'); }, 120);
    if (reduce.matches) return;
    var host = el.querySelector('.ripple-host') || el;
    var r = host.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 2.2;
    var dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (e.clientX - r.left - size / 2) + 'px';
    dot.style.top = (e.clientY - r.top - size / 2) + 'px';
    host.appendChild(dot);
    dot.addEventListener('animationend', function () { dot.remove(); });
  }, { passive: true });

  /* ---------------- Navbar ---------------- */
  var nav = $('.nav');
  var solidFrom = $('.hero') ? 40 : -1;
  function navSolid() { nav.classList.toggle('is-solid', window.scrollY > solidFrom); }
  navSolid();
  window.addEventListener('scroll', navSolid, { passive: true });

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = $('.menu-btn');
  var menu = $('#mobile-menu');
  function setMenu(open) {
    doc.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    if (lenis) { open ? lenis.stop() : lenis.start(); }
  }
  menu.inert = true;
  menuBtn.addEventListener('click', function () { setMenu(!doc.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && doc.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  /* ---------------- Page transitions (internal pages only) ---------------- */
  var curtain = $('.curtain');
  function isInternalPage(a) {
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return false;
    var href = a.getAttribute('href') || '';
    if (!href || href.charAt(0) === '#' || /^(mailto:|tel:|https?:|\/\/)/i.test(href)) return false;
    var url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return false;
    if (url.pathname === location.pathname && url.hash) return false;
    return true;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    // Same-page anchors: smooth scroll
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#' && href.length > 1) {
      var target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        if (doc.classList.contains('menu-open')) setMenu(false);
        if (lenis) lenis.scrollTo(target, { offset: -60 }); else target.scrollIntoView();
      }
      return;
    }
    if (!motion || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    if (!isInternalPage(a)) return; // WhatsApp / tel / mail / external: untouched, instant
    e.preventDefault();
    try { sessionStorage.setItem('lxry-transition', '1'); } catch (err) {}
    var go = function () { location.href = a.href; };
    gsap.fromTo(curtain, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power3.inOut', onComplete: go });
    window.setTimeout(go, 900); // safety net
  });
  window.addEventListener('pageshow', function (e) {
    if (e.persisted && hasGsap) { gsap.set(curtain, { yPercent: 100 }); doc.classList.remove('from-transition'); }
  });

  /* ---------------- Tabs ---------------- */
  var tabs = $$('[role="tab"]');
  function selectTab(tab, focus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      $('#' + t.getAttribute('aria-controls')).hidden = !on;
    });
    if (focus) tab.focus();
    if (hasGsap && window.ScrollTrigger) ScrollTrigger.refresh();
  }
  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (d) { e.preventDefault(); selectTab(tabs[(i + d + tabs.length) % tabs.length], true); }
    });
  });

  /* ---------------- Lightbox ---------------- */
  var lb = $('#lightbox');
  if (lb) {
    var items = $$('.g-item');
    var lbImg = $('img', lb), lbCount = $('.lb-count', lb);
    var current = 0, lastFocus = null;
    var show = function (i, dir) {
      current = (i + items.length) % items.length;
      var it = items[current];
      var swap = function () {
        lbImg.src = it.getAttribute('data-full');
        lbImg.alt = $('img', it).alt;
        lbCount.textContent = (current + 1) + ' / ' + items.length;
      };
      if (motion && dir) {
        gsap.to(lbImg, { x: -40 * dir, autoAlpha: 0, duration: 0.22, ease: 'power2.in', onComplete: function () {
          swap();
          gsap.fromTo(lbImg, { x: 40 * dir, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: 0.45, ease: 'power3.out' });
        } });
      } else { swap(); }
    };
    var openLb = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lb.inert = false;
      if (lenis) lenis.stop(); else doc.style.overflow = 'hidden';
      if (motion) gsap.fromTo(lbImg, { scale: 0.92, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: 'power3.out' });
      $('.lb-close', lb).focus();
    };
    var closeLb = function () {
      lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); lb.inert = true;
      if (lenis) lenis.start(); else doc.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    lb.inert = true;
    items.forEach(function (it, i) { it.addEventListener('click', function () { openLb(i); }); });
    $('.lb-close', lb).addEventListener('click', closeLb);
    $('.lb-prev', lb).addEventListener('click', function () { show(current - 1, -1); });
    $('.lb-next', lb).addEventListener('click', function () { show(current + 1, 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') show(current - 1, -1);
      else if (e.key === 'ArrowRight') show(current + 1, 1);
    });
    var tx = null;
    lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      tx = null;
    });
  }

  /* ---------------- FAQ: animated open/close ---------------- */
  $$('.faq details').forEach(function (d) {
    var summary = $('summary', d), answer = $('.answer', d);
    summary.addEventListener('click', function (e) {
      if (!motion) return;
      e.preventDefault();
      if (d.open) {
        gsap.to(answer, { height: 0, autoAlpha: 0, duration: 0.45, ease: 'power3.inOut', onComplete: function () { d.open = false; gsap.set(answer, { clearProps: 'all' }); if (window.ScrollTrigger) ScrollTrigger.refresh(); } });
      } else {
        d.open = true;
        gsap.fromTo(answer, { height: 0, autoAlpha: 0 }, { height: 'auto', autoAlpha: 1, duration: 0.6, ease: 'power3.out', onComplete: function () { gsap.set(answer, { clearProps: 'all' }); if (window.ScrollTrigger) ScrollTrigger.refresh(); } });
      }
    });
  });

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  /* ================= Motion-only from here ================= */
  if (!motion) {
    doc.classList.remove('show-preloader', 'from-transition');
    markReady();
    return;
  }

  gsap.registerPlugin(ScrollTrigger, SplitText);

  /* Smooth scroll */
  if (typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* Scroll progress bar */
  var bar = $('.progress');
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  /* Navbar hides on scroll down, returns on scroll up */
  var navShown = true;
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: function (self) {
      var down = self.direction === 1 && self.scroll() > 240;
      if (down === navShown && !doc.classList.contains('menu-open')) {
        navShown = !down;
        gsap.to(nav, { yPercent: down ? -100 : 0, duration: 0.5, ease: 'power3.out' });
      }
    }
  });

  /* ---------- Intro: preloader → curtain → hero ---------- */
  var intro = gsap.timeline({ paused: true });
  function heroIntro() {
    var hero = $('.hero');
    if (!hero) { markReady(); return; }
    var h1 = $('[data-hero-split]', hero);
    var tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    var img = $('.hero-media img', hero);
    if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0);
    if (h1) {
      var st = new SplitText(h1, { type: 'lines,chars', mask: 'lines', linesClass: 'split-line' });
      markReady();
      tl.from(st.chars, { yPercent: 115, rotate: 6, duration: 1.3, stagger: 0.028 }, 0.15);
    } else { markReady(); }
    tl.from($$('[data-hero-fade]', hero), { y: 34, autoAlpha: 0, duration: 1.1, stagger: 0.1 }, 0.55);
    tl.from($$('.hero-foot', hero), { autoAlpha: 0, duration: 1.2 }, 0.9);
    return tl;
  }

  var showPre = doc.classList.contains('show-preloader');
  var fromTransition = doc.classList.contains('from-transition');
  try { sessionStorage.setItem('lxry-seen', '1'); sessionStorage.removeItem('lxry-transition'); } catch (err) {}

  if (showPre) {
    var pre = $('.preloader');
    var letters = $$('.pl-word span', pre);
    intro
      .to(letters, { yPercent: 0, duration: 0.9, stagger: 0.07, ease: 'expo.out' })
      .to($('.pl-line', pre), { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }, 0.2)
      .to($('.pl-sub', pre), { autoAlpha: 1, duration: 0.5 }, 0.5)
      .to(letters, { yPercent: -110, duration: 0.6, stagger: 0.04, ease: 'power3.in' }, 1.15)
      .to([$('.pl-line', pre), $('.pl-sub', pre)], { autoAlpha: 0, duration: 0.3 }, 1.2)
      .to(pre, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, 1.45)
      .add(function () { doc.classList.remove('show-preloader'); gsap.set(pre, { clearProps: 'all' }); }, 2.35)
      .add(heroIntro, 1.75);
    intro.play();
  } else if (fromTransition) {
    gsap.set(curtain, { yPercent: 0 });
    doc.classList.remove('from-transition');
    gsap.to(curtain, { yPercent: -100, duration: 0.8, ease: 'expo.inOut', delay: 0.05, onComplete: function () { gsap.set(curtain, { yPercent: 100 }); } });
    gsap.delayedCall(0.35, heroIntro);
  } else {
    heroIntro();
  }
  // Never leave content hidden
  window.setTimeout(markReady, 2600);

  /* ---------- Hero parallax on scroll ---------- */
  var heroImg = $('.hero-media img');
  if (heroImg) {
    gsap.to(heroImg, { yPercent: 14, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    gsap.to('.hero .wrap', { yPercent: -18, autoAlpha: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  }

  /* ---------- Split headings: masked line reveal ---------- */
  document.fonts && document.fonts.ready.then(function () { ScrollTrigger.refresh(); });
  $$('[data-split]').forEach(function (el) {
    SplitText.create(el, {
      type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
      onSplit: function (self) {
        return gsap.from(self.lines, {
          yPercent: 110, duration: 1.2, stagger: 0.09, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        });
      }
    });
  });

  /* ---------- Statement: words light up as you scroll ---------- */
  $$('[data-scrub-words]').forEach(function (el) {
    var st = new SplitText(el, { type: 'words' });
    gsap.fromTo(st.words, { opacity: 0.14 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true }
    });
  });

  /* ---------- Generic fade-up + staggered groups ---------- */
  $$('[data-fade]').forEach(function (el) {
    gsap.from(el, { y: 50, autoAlpha: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });
  $$('[data-stagger]').forEach(function (group) {
    var kids = group.children;
    gsap.from(kids, {
      y: 80, autoAlpha: 0, duration: 1.2, stagger: { amount: Math.min(kids.length * 0.12, 0.9) }, ease: 'expo.out',
      scrollTrigger: { trigger: group, start: 'top 88%', once: true }
    });
  });

  /* ---------- Lines draw across ---------- */
  $$('[data-line]').forEach(function (el) {
    gsap.from(el, { scaleX: 0, duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: el, start: 'top 92%', once: true } });
  });
  $$('.inc-list').forEach(function (list) {
    var rows = $$('li', list);
    gsap.from(rows, { x: -40, autoAlpha: 0, duration: 1, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger: list, start: 'top 85%', once: true } });
  });

  /* ---------- Image wipes ---------- */
  $$('[data-reveal]').forEach(function (el) {
    var img = $('img', el);
    var tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    tl.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
    if (img) tl.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: 'expo.out', clearProps: el.classList.contains('parallax') ? '' : 'transform' }, 0.1);
  });

  /* ---------- Parallax ---------- */
  $$('.parallax img, .follow .bg img').forEach(function (img) {
    gsap.fromTo(img, { yPercent: -10 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentNode, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('[data-speed]').forEach(function (el) {
    var s = parseFloat(el.getAttribute('data-speed'));
    gsap.to(el, { yPercent: s * -30, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Count-up numbers ---------- */
  $$('[data-count]').forEach(function (el) {
    var end = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var obj = { v: 0 };
    el.textContent = '0' + suffix;
    gsap.to(obj, {
      v: end, duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
    });
  });

  /* ---------- Marquee (reacts to scroll speed & direction) ---------- */
  $$('.marquee-track').forEach(function (track) {
    var loop = gsap.to(track, { xPercent: -50, ease: 'none', duration: 38, repeat: -1 });
    var dir = 1;
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: function (self) {
        dir = self.direction;
        var v = Math.min(Math.abs(self.getVelocity()) / 300, 6);
        gsap.to(loop, { timeScale: dir * (1 + v), duration: 0.3, overwrite: true });
        gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.3, overwrite: false });
      }
    });
  });

  /* ---------- Offer big number drift ---------- */
  $$('.offer .big-num').forEach(function (el) {
    gsap.fromTo(el, { xPercent: 20 }, { xPercent: -20, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  /* ---------- Footer wordmark ---------- */
  $$('.footer-word span').forEach(function (s, i) {
    gsap.from(s, { yPercent: 100, duration: 1.4, ease: 'expo.out', delay: i * 0.08, scrollTrigger: { trigger: '.footer-word', start: 'top 95%', once: true } });
  });

  /* ---------- Desktop-only effects ---------- */
  var mm = gsap.matchMedia();

  // Pinned horizontal fleet
  mm.add('(min-width: 1024px)', function () {
    var sec = $('.hfleet');
    if (!sec) return;
    var track = $('.htrack', sec);
    var dist = function () { return track.scrollWidth - window.innerWidth; };
    var tween = gsap.to(track, {
      x: function () { return -dist(); }, ease: 'none',
      scrollTrigger: { trigger: $('.hscroll', sec), start: 'top top', end: function () { return '+=' + dist(); }, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 }
    });
    $$('.hcard .media img', track).forEach(function (img) {
      gsap.fromTo(img, { xPercent: -8, scale: 1.18 }, { xPercent: 8, scale: 1.18, ease: 'none', scrollTrigger: { trigger: img.closest('.hcard'), containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } });
    });
    return function () { gsap.set(track, { clearProps: 'all' }); };
  });

  // Cursor, magnetic buttons, card tilt
  mm.add('(hover: hover) and (pointer: fine)', function () {
    doc.classList.add('has-cursor');
    var ring = $('.cursor'), dot = $('.cursor-dot'), label = $('.c-label', ring);
    var rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' }), ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
    var dx = gsap.quickTo(dot, 'x', { duration: 0.08 }), dy = gsap.quickTo(dot, 'y', { duration: 0.08 });
    var onMove = function (e) { if (ring.classList.contains('is-hidden')) { gsap.set([ring, dot], { x: e.clientX, y: e.clientY }); onEnter(); } rx(e.clientX); ry(e.clientY); dx(e.clientX); dy(e.clientY); };
    var onOver = function (e) {
      var v = e.target.closest('[data-cursor]');
      var l = e.target.closest('a, button, summary, [role="tab"]');
      ring.classList.toggle('is-view', !!v);
      ring.classList.toggle('is-link', !v && !!l);
      if (v) label.textContent = v.getAttribute('data-cursor');
    };
    var onLeave = function () { ring.classList.add('is-hidden'); dot.classList.add('is-hidden'); };
    var onEnter = function () { ring.classList.remove('is-hidden'); dot.classList.remove('is-hidden'); };
    window.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    var magnets = $$('.magnet');
    var mHandlers = magnets.map(function (m) {
      var xTo = gsap.quickTo(m, 'x', { duration: 0.6, ease: 'power3' }), yTo = gsap.quickTo(m, 'y', { duration: 0.6, ease: 'power3' });
      var move = function (e) { var r = m.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.35); yTo((e.clientY - r.top - r.height / 2) * 0.45); };
      var leave = function () { gsap.to(m, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.4)' }); };
      m.addEventListener('pointermove', move); m.addEventListener('pointerleave', leave);
      return [m, move, leave];
    });

    var tilts = $$('[data-tilt]');
    var tHandlers = tilts.map(function (c) {
      gsap.set(c, { transformPerspective: 900 });
      var move = function (e) {
        var r = c.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(c, { rotateY: px * 7, rotateX: -py * 7, duration: 0.6, ease: 'power3.out' });
      };
      var leave = function () { gsap.to(c, { rotateY: 0, rotateX: 0, duration: 1, ease: 'power3.out' }); };
      c.addEventListener('pointermove', move); c.addEventListener('pointerleave', leave);
      return [c, move, leave];
    });

    return function () {
      doc.classList.remove('has-cursor');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      mHandlers.concat(tHandlers).forEach(function (h) { h[0].removeEventListener('pointermove', h[1]); h[0].removeEventListener('pointerleave', h[2]); gsap.set(h[0], { clearProps: 'transform' }); });
    };
  });

  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
