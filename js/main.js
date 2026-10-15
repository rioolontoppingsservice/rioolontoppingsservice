/**
 * 24/7 Riool & Ontstoppingsservice — Main JavaScript
 * Mobile nav, FAQ accordion, sticky header, scroll behaviour
 */

(function () {
  'use strict';

  /* ——— DOM ready ——— */
  document.addEventListener('DOMContentLoaded', function () {
    initStickyHeader();
    initMobileMenu();
    initFaqAccordion();
    initContactCardForm();
    initSmoothScroll();
    initCurrentNavLink();
  });

  /* ——— Sticky header ——— */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ——— Mobile menu ——— */
  function initMobileMenu() {
    var toggleBtn  = document.querySelector('.mobile-toggle');
    var mobileMenu = document.querySelector('.mobile-menu');
    var closeBtn   = document.querySelector('.mobile-menu__close');

    if (!toggleBtn || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      toggleBtn.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      if (closeBtn) closeBtn.focus();
    }

    function closeMenu() {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
      toggleBtn.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', openMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
        closeMenu();
      }
    });

    /* Close when a link is clicked */
    var menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Close on backdrop click */
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  /* ——— FAQ accordion ——— */
  function initFaqAccordion() {
    var faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(function (item) {
      var trigger = item.querySelector('.faq-item__trigger');
      var body    = item.querySelector('.faq-item__body');

      if (!trigger || !body) return;

      trigger.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');

        /* Close all others */
        faqItems.forEach(function (other) {
          if (other !== item) {
            other.classList.remove('is-open');
            var otherTrigger = other.querySelector('.faq-item__trigger');
            var otherBody    = other.querySelector('.faq-item__body');
            if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            if (otherBody)    otherBody.hidden = true;
          }
        });

        /* Toggle current */
        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
          body.hidden = true;
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
          body.hidden = false;
        }
      });

      /* Keyboard: Enter / Space already fires click on buttons */
    });
  }

  /* ——— Hero contact-card form (quick quote) ——— */
  function initContactCardForm() {
    var form = document.querySelector('.contact-card__form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameField    = form.querySelector('[name="naam"]');
      var problemField = form.querySelector('[name="probleem"]');
      var btn          = form.querySelector('.contact-card__btn');

      /* Build a pre-filled mailto */
      var naam    = nameField    ? nameField.value.trim()    : '';
      var probleem = problemField ? problemField.value.trim() : '';

      var body = 'Naam: ' + naam + '%0D%0AProbleem: ' + probleem;
      var mailto = 'mailto:rioolontoppingsservice@gmail.com'
        + '?subject=' + encodeURIComponent('Aanvraag offerte via website')
        + '&body=' + body;

      window.location.href = mailto;

      /* Feedback */
      if (btn) {
        var original = btn.textContent;
        btn.textContent = 'Aanvraag verstuurd ✓';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 3000);
      }
    });
  }

  /* ——— Smooth scroll for on-page anchors ——— */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href   = link.getAttribute('href');
        var target = href === '#' ? null : document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        var headerHeight = document.querySelector('.site-header')
          ? document.querySelector('.site-header').offsetHeight
          : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

        window.scrollTo({ top: top, behavior: 'smooth' });
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ——— Mark current nav link ——— */
  function initCurrentNavLink() {
    var path  = window.location.pathname.replace(/\/$/, '') || '/';
    var links = document.querySelectorAll('.primary-nav__link, .mobile-menu__link');

    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      var normalised = href.replace(/\/$/, '') || '/';
      if (normalised === path) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

})();
