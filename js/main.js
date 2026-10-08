/* Yılsa Teknik Servis — main.js */
(function () {
  'use strict';

  // ===== Mobil menü =====
  var burger = document.querySelector('.burger');
  var header = document.querySelector('.site-header');
  if (burger && header) {
    burger.addEventListener('click', function () {
      header.classList.toggle('menu-open');
      var expanded = header.classList.contains('menu-open');
      burger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
    // Link tıklanınca menü kapansın
    document.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        header.classList.remove('menu-open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== Yıl güncelleme =====
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ===== Çerez banner (KVKK + Google Ads uyumlu) =====
  var KEY = 'sl_cookie_v1';
  var banner = document.getElementById('cookie-banner');
  if (banner) {
    try {
      var saved = localStorage.getItem(KEY);
      if (!saved) {
        setTimeout(function () { banner.classList.add('show'); }, 800);
      }
    } catch (e) { /* localStorage yoksa banner gösterilmesin */ }

    var accept = banner.querySelector('.btn-accept');
    var decline = banner.querySelector('.btn-decline');
    function close(value) {
      try { localStorage.setItem(KEY, value); } catch (e) {}
      banner.classList.remove('show');
    }
    if (accept) accept.addEventListener('click', function () { close('accepted'); });
    if (decline) decline.addEventListener('click', function () { close('declined'); });
  }

  // ===== İletişim formu (WhatsApp'a gönderir) =====
  var WA_NUMBER = '905321669642';
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = (form.querySelector('[name="ad"]') || {}).value || '';
      var phone = (form.querySelector('[name="telefon"]') || {}).value || '';
      var device = (form.querySelector('[name="cihaz"]') || {}).value || '';
      var msg = (form.querySelector('[name="mesaj"]') || {}).value || '';
      var consent = (form.querySelector('[name="kvkk"]') || {}).checked;
      var status = document.getElementById('form-status');

      if (!name.trim() || !phone.trim() || !consent) {
        if (status) {
          status.textContent = 'Lütfen ad, telefon alanlarını doldurun ve KVKK metnini onaylayın.';
          status.style.color = '#dc2626';
        }
        return;
      }
      var text = encodeURIComponent(
        'Servis Talebi\n' +
        'Ad Soyad: ' + name + '\n' +
        'Telefon: ' + phone + '\n' +
        'Cihaz: ' + (device || 'Belirtilmedi') + '\n' +
        'Mesaj: ' + (msg || '-')
      );
      window.open('https://wa.me/' + WA_NUMBER + '?text=' + text, '_blank');
      if (status) {
        status.textContent = 'WhatsApp uygulamanız açılıyor. Açılmazsa bizi 0532 166 96 42 numarasından arayabilirsiniz.';
        status.style.color = '#16a34a';
      }
    });
  }

  // ===== Smooth scroll için anchor offset =====
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length > 1) {
        var t = document.querySelector(id);
        if (t) {
          e.preventDefault();
          var top = t.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });
})();
