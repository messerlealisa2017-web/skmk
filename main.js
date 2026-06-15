/* ============================================
   СК МК — main.js
   ============================================ */

// Google Sheets URLs (заменить на актуальные)
var CLIENT_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzaeVv7pjaQDIAJz6ndN1QuFUNWIaMIB4EgZQANSjHrSdIDAbM4uNQtqZg2EuwOWIWO/exec';

document.addEventListener('DOMContentLoaded', function () {

  // ============ БУРГЕР-МЕНЮ ============
  var burger = document.getElementById('burger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      burger.classList.toggle('active');
    });
  }

  // ============ МАСКА ТЕЛЕФОНА ============
  function phoneMask(el) {
    if (!el) return;
    el.addEventListener('input', function (e) {
      var v = e.target.value.replace(/\D/g, '');
      if (v.charAt(0) === '8') v = '7' + v.slice(1);
      if (v.charAt(0) !== '7' && v.length > 0) v = '7' + v;
      var f = '';
      if (v.length > 0) f = '+7';
      if (v.length > 1) f += ' (' + v.slice(1, 4);
      if (v.length >= 4) f += ') ' + v.slice(4, 7);
      if (v.length >= 7) f += '-' + v.slice(7, 9);
      if (v.length >= 9) f += '-' + v.slice(9, 11);
      e.target.value = f;
    });
  }
  phoneMask(document.getElementById('c_phone'));

  // ============ ВЫБОР ТИПА ОБРАЩЕНИЯ ============
  var typeSelect = document.getElementById('c_type');
  var workerRedirect = document.getElementById('workerRedirect');
  var formFields = document.getElementById('formFields');

  if (typeSelect) {
    typeSelect.addEventListener('change', function () {
      if (this.value === 'worker') {
        if (workerRedirect) workerRedirect.classList.add('show');
        if (formFields) formFields.style.display = 'none';
      } else {
        if (workerRedirect) workerRedirect.classList.remove('show');
        if (formFields) formFields.style.display = '';
      }
    });
  }

  // ============ ОТПРАВКА ФОРМЫ ============
  function submitForm(url, data, statusEl, btn) {
    var orig = btn.textContent;
    btn.textContent = 'Отправляем...';
    btn.disabled = true;
    if (statusEl) { statusEl.className = 'form-status'; statusEl.textContent = ''; }

    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function () {
      if (statusEl) {
        statusEl.textContent = '✓ Заявка принята. Менеджер свяжется в течение рабочего дня.';
        statusEl.className = 'form-status success';
      }
      btn.closest('form').reset();
      if (formFields) formFields.style.display = '';
      if (workerRedirect) workerRedirect.classList.remove('show');
    }).catch(function () {
      if (statusEl) {
        statusEl.textContent = '✗ Ошибка отправки. Позвоните нам: +7 (931) 274-03-17';
        statusEl.className = 'form-status error';
      }
    }).finally(function () {
      btn.textContent = orig;
      btn.disabled = false;
    });
  }

  var clientForm = document.getElementById('clientForm');
  if (clientForm) {
    clientForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var type = document.getElementById('c_type');
      if (type && type.value === 'worker') return; // соискателей не отправляем

      submitForm(CLIENT_SHEET_URL, {
        date:     new Date().toLocaleString('ru-RU'),
        type:     type ? type.options[type.selectedIndex].text : '',
        name:     (document.getElementById('c_name') || {}).value || '',
        phone:    (document.getElementById('c_phone') || {}).value || '',
        spec:     (document.getElementById('c_spec') || {}).value || '',
        comment:  (document.getElementById('c_comment') || {}).value || '',
        page:     window.location.pathname
      },
        document.getElementById('clientFormStatus'),
        this.querySelector('button[type="submit"]')
      );
    });
  }

  // ============ ТАБЫ СПЕЦИАЛЬНОСТЕЙ ============
  var tabs = document.querySelectorAll('.spec-tab');
  var panels = document.querySelectorAll('.spec-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      tab.classList.add('active');
      var target = document.getElementById(tab.dataset.panel);
      if (target) target.classList.add('active');
    });
  });

  // ============ FAQ ============
  var faqItems = document.querySelectorAll('.faq-question');
  faqItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var answer = this.nextElementSibling;
      var isOpen = this.classList.contains('open');
      // Закрыть все
      document.querySelectorAll('.faq-question').forEach(function (q) { q.classList.remove('open'); });
      document.querySelectorAll('.faq-answer').forEach(function (a) { a.classList.remove('open'); });
      // Открыть текущий если был закрыт
      if (!isOpen) {
        this.classList.add('open');
        if (answer) answer.classList.add('open');
      }
    });
  });

  // ============ ПЛАВНАЯ ПРОКРУТКА ============
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (mobileMenu) mobileMenu.classList.remove('open');
      }
    });
  });

});
