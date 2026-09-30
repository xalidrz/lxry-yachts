/* LXRY — interactions (no animations) */
(function () {
  'use strict';
  var doc = document.documentElement;
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

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
      lbCount.textContent = (current + 1) + ' / ' + items.length;
    };
    var openLb = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('is-open'); lb.setAttribute('aria-hidden', 'false'); lb.inert = false;
      doc.style.overflow = 'hidden';
      $('.lb-close', lb).focus();
    };
    var closeLb = function () {
      lb.classList.remove('is-open'); lb.setAttribute('aria-hidden', 'true'); lb.inert = true;
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

  var year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
