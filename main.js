/* LXRY — interactions. The only animation is on buttons. */
(function () {
  'use strict';
  var doc = document.documentElement;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* Parts of the page made inert while a modal (menu or lightbox) is open,
     so keyboard focus stays inside the modal. */
  function setBackgroundInert(on, except) {
    ['.skip', '.nav', '#main', '.footer', '.fab-wrap', '#consent'].forEach(function (sel) {
      var el = $(sel);
      if (el && el !== except) el.inert = on;
    });
  }

  /* Button press + ripple. Purely visual: it never prevents or delays the click. */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.addEventListener('pointerdown', function (e) {
    var el = e.target.closest('.btn, .social, .menu-btn, .lb-btn');
    if (!el || (e.pointerType === 'mouse' && e.button !== 0)) return;
    el.classList.add('is-pressed');
    window.setTimeout(function () { el.classList.remove('is-pressed'); }, 120);
    if (reduce.matches) return;
    var r = el.getBoundingClientRect();
    var size = Math.max(r.width, r.height) * 2.2;
    var dot = document.createElement('span');
    dot.className = 'ripple';
    dot.style.width = dot.style.height = size + 'px';
    dot.style.left = (e.clientX - r.left - size / 2) + 'px';
    dot.style.top = (e.clientY - r.top - size / 2) + 'px';
    el.appendChild(dot);
    dot.addEventListener('animationend', function () { dot.remove(); });
  }, { passive: true });

  /* Navbar: transparent over the hero, solid once scrolled */
  var nav = $('.nav');
  var solidFrom = $('.hero') ? 40 : -1;
  function navSolid() { nav.classList.toggle('is-solid', window.scrollY > solidFrom); }
  navSolid();
  window.addEventListener('scroll', navSolid, { passive: true });

  /* Mobile menu */
  var menuBtn = $('.menu-btn');
  var menu = $('#mobile-menu');
  function setMenu(open) {
    doc.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!open));
    menu.inert = !open;
    // Keep the menu button reachable (it closes the menu); lock everything else
    ['.skip', '#main', '.footer', '.fab-wrap', '#consent'].forEach(function (sel) { var el = $(sel); if (el) el.inert = open; });
    $$('.nav a, .nav-cta').forEach(function (el) { el.inert = open; });
    if (open) { var first = $('a, button', menu); if (first) first.focus(); }
  }
  menu.inert = true;
  menuBtn.addEventListener('click', function () { setMenu(!doc.classList.contains('menu-open')); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && doc.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia('(min-width: 1200px)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });

  /* Gallery lightbox */
  var lb = $('#lightbox');
  if (lb) {
    var items = $$('.g-item');
    var lbImg = $('img', lb), lbCount = $('.lb-count', lb);
    var current = 0, lastFocus = null;
    var show = function (i) {
      current = (i + items.length) % items.length;
      var it = items[current];
      lbImg.src = it.getAttribute('data-full');
      lbImg.alt = $('img', it).alt;
      lbCount.textContent = 'Photo ' + (current + 1) + ' of ' + items.length;
    };
    var openLb = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lb.inert = false;
      setBackgroundInert(true, lb);
      doc.style.overflow = 'hidden';
      $('.lb-close', lb).focus();
    };
    var closeLb = function () {
      lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); lb.inert = true;
      setBackgroundInert(false, lb);
      doc.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    lb.inert = true;
    items.forEach(function (it, i) { it.addEventListener('click', function () { openLb(i); }); });
    $('.lb-close', lb).addEventListener('click', closeLb);
    $('.lb-prev', lb).addEventListener('click', function () { show(current - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb || e.target.tagName === 'FIGURE') closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') show(current - 1);
      else if (e.key === 'ArrowRight') show(current + 1);
    });
    var tx = null;
    lb.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (tx === null) return;
      var dx = e.changedTouches[0].clientX - tx;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      tx = null;
    });
  }

  /* ---------- Cookie consent & third-party embeds ----------
     Nothing from a third party loads until the visitor clicks Accept, or clicks
     "Load map" / "Play video" on that specific item. */
  var KEY = 'lxry-consent';
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function loadEmbed(box, autoplay) {
    if (box.querySelector('iframe')) return;
    var f = document.createElement('iframe');
    var src = box.getAttribute('data-src');
    if (autoplay && box.classList.contains('embed-video')) src += (src.indexOf('?') < 0 ? '?' : '&') + 'autoplay=1';
    f.src = src;
    f.title = box.getAttribute('data-title');
    f.loading = 'lazy';
    f.referrerPolicy = 'strict-origin-when-cross-origin';
    f.allowFullscreen = true;
    if (box.classList.contains('embed-video')) f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    var ph = $('.embed-ph', box), poster = $('.embed-poster', box);
    if (ph) ph.remove();
    if (poster) poster.remove();
    box.appendChild(f);
  }
  $$('[data-embed]').forEach(function (box) {
    $('[data-embed-load]', box).addEventListener('click', function () { loadEmbed(box, true); });
  });

  var banner = $('#consent');
  function showBanner(show) {
    banner.hidden = !show;
    doc.classList.toggle('consent-open', show);
  }
  function applyConsent(v) {
    if (v === 'accepted') $$('[data-embed]').forEach(function (b) { loadEmbed(b, false); });
  }
  $$('[data-consent]', banner).forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-consent');
      var before = getConsent();
      setConsent(v);
      showBanner(false);
      // Withdrawing consent: reload so third-party frames are removed
      if (v === 'rejected' && (before === 'accepted' || $('[data-embed] iframe'))) { location.reload(); return; }
      applyConsent(v);
    });
  });
  $$('[data-cookie-settings]').forEach(function (b) {
    b.addEventListener('click', function () { showBanner(true); $('[data-consent="accepted"]', banner).focus(); });
  });
  var saved = getConsent();
  if (saved === 'accepted' || saved === 'rejected') applyConsent(saved); else showBanner(true);

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
