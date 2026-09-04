/**
 * Тема «Центральный» — весь интерактив на нативном JS (без jQuery).
 */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var D = window.APS_DATA || { services: {}, premium: [], budget: [], hours: {} };

  /* ================= обложка ================= */
  var cover = document.getElementById('cover');
  if (cover) {
    var page = document.getElementById('cover-page');
    var stamp = document.getElementById('cover-stamp');
    var enterBtn = document.getElementById('cover-enter');
    var done = false;

    var hideCover = function () {
      cover.classList.add('cover-gone');
      document.body.classList.remove('lock');
    };

    if (sessionStorage.getItem('aps_cover') === '1' || reduced) {
      hideCover();
    } else {
      document.body.classList.add('lock');
    }

    if (enterBtn) {
      enterBtn.addEventListener('click', function () {
        if (done) return;
        done = true;
        sessionStorage.setItem('aps_cover', '1');
        if (reduced) { hideCover(); return; }
        var label = enterBtn.querySelector('[data-label]');
        if (label) label.textContent = 'Поехали!';
        enterBtn.classList.add('anim-rev');
        if (stamp) stamp.style.display = 'flex';
        page.classList.add('flip');
        setTimeout(hideCover, 1080);
      });
    }
  }

  /* ================= шапка ================= */
  var head = document.getElementById('site-head');
  var onScroll = function () {
    if (!head) return;
    head.classList.toggle('scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  var burger = document.getElementById('burger');
  var mnav = document.getElementById('mnav');
  if (burger && mnav) {
    burger.addEventListener('click', function () {
      var open = mnav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mnav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mnav.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  /* ================= reveal ================= */
  var reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ================= scramble ================= */
  var GLYPHS = 'АВДЖКМНПРСТ0123456789·:';
  document.querySelectorAll('.scr').forEach(function (el) {
    var text = el.getAttribute('data-text') || el.textContent;
    if (reduced) { el.textContent = text; return; }
    var started = false;
    var ioS = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || started) return;
        started = true; ioS.disconnect();
        var frame = 0, start = performance.now();
        var tick = function (now) {
          frame++;
          var reveal = Math.floor((now - start) / 38);
          var out = text.split('').map(function (ch, i) {
            if (ch === ' ' || ch === '·' || i < reveal) return ch;
            return GLYPHS[(i * 7 + frame * 5) % GLYPHS.length];
          }).join('');
          el.textContent = out;
          if (reveal <= text.length) requestAnimationFrame(tick); else el.textContent = text;
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.4 });
    ioS.observe(el);
  });

  /* ================= счётчики ================= */
  var fmt = function (n) { return new Intl.NumberFormat('ru-RU').format(n); };
  document.querySelectorAll('.cnt').forEach(function (el) {
    var to = parseInt(el.getAttribute('data-to'), 10) || 0;
    if (reduced) { el.textContent = fmt(to); return; }
    var ioC = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        ioC.disconnect();
        var start = performance.now(), dur = 1500;
        var tick = function (now) {
          var p = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(to * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });
    ioC.observe(el);
  });

  /* ================= табло ремзоны ================= */
  var STAGES = ['Принят', 'Диагностика', 'Ремонт', 'Готов'];
  var POOL = [
    { car: 'Lada Vesta', job: 'Подготовка к техосмотру' },
    { car: 'VW Tiguan', job: 'Ремонт суппорта' },
    { car: 'Geely Coolray', job: 'Плановое ТО' },
    { car: 'Renault Duster', job: 'Замена сцепления' },
    { car: 'Nissan Qashqai', job: 'Диагностика АКПП' }
  ];
  var board = document.getElementById('board-rows');
  if (board && !reduced) {
    setInterval(function () {
      var rows = board.querySelectorAll('.board-row');
      if (!rows.length) return;
      var row = rows[Math.floor(Math.random() * rows.length)];
      var st = row.querySelector('.st');
      var stage = parseInt(st.className.match(/st-(\d)/)[1], 10);
      if (stage >= 3) {
        var j = POOL[Math.floor(Math.random() * POOL.length)];
        row.querySelector('.car').textContent = j.car;
        row.querySelector('.job').textContent = j.job;
        stage = 0;
        row.classList.remove('fresh'); void row.offsetWidth; row.classList.add('fresh');
      } else {
        stage += 1;
      }
      st.className = 'st st-' + stage;
      st.textContent = STAGES[stage];
      var bar = row.querySelector('.prog i');
      bar.className = stage === 3 ? 'done' : 'run';
      if (stage !== 3) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = ''; }
    }, 3200);
  }

  /* ================= отзывы ================= */
  var slides = document.querySelectorAll('.rev-slide');
  var thumbs = document.querySelectorAll('.rev-thumb');
  var revIdx = 0;
  var showRev = function (i) {
    revIdx = (i + slides.length) % slides.length;
    slides.forEach(function (s, k) { s.classList.toggle('active', k === revIdx); });
    thumbs.forEach(function (t, k) { t.classList.toggle('on', k === revIdx); });
  };
  var prev = document.getElementById('rev-prev');
  var next = document.getElementById('rev-next');
  if (prev) prev.addEventListener('click', function () { showRev(revIdx - 1); });
  if (next) { next.querySelector('svg').style.transform = 'rotate(45deg)'; next.addEventListener('click', function () { showRev(revIdx + 1); }); }
  if (prev) prev.querySelector('svg').style.transform = 'rotate(225deg)';
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () { showRev(parseInt(t.getAttribute('data-i'), 10)); });
  });

  /* ================= FAQ и раскрытие услуг ================= */
  document.querySelectorAll('.faq-q').forEach(function (q) {
    q.addEventListener('click', function () {
      var item = q.closest('.faq-item');
      var open = item.classList.toggle('open');
      q.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.querySelectorAll('.svc-toggle').forEach(function (t) {
    t.addEventListener('click', function () {
      var row = t.closest('.svc-row-x');
      var open = row.classList.toggle('open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* ================= фильтры услуг ================= */
  var fbtns = document.querySelectorAll('.fbtn');
  var search = document.getElementById('svc-search');
  var rows = document.querySelectorAll('#svc-list .svc-row-x');
  var curCat = 'all';
  var applyFilters = function () {
    var q = search ? search.value.trim().toLowerCase() : '';
    rows.forEach(function (r) {
      var okCat = curCat === 'all' || r.getAttribute('data-cat') === curCat;
      var okQ = !q || r.getAttribute('data-title').indexOf(q) !== -1;
      r.style.display = (okCat && okQ) ? '' : 'none';
    });
  };
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      fbtns.forEach(function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      curCat = b.getAttribute('data-cat');
      applyFilters();
    });
  });
  if (search) search.addEventListener('input', applyFilters);

  /* ================= калькулятор ================= */
  var estBrand = document.getElementById('est-brand');
  var estService = document.getElementById('est-service');
  var tween = function (el, to) {
    if (reduced) { el.textContent = fmt(to) + ' ₽'; return; }
    var from = parseInt((el.textContent || '0').replace(/\D/g, ''), 10) || 0;
    var start = performance.now(), dur = 700;
    var tick = function (now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(from + (to - from) * eased)) + ' ₽';
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  var calcEst = function () {
    if (!estBrand || !estService) return;
    var brand = estBrand.value;
    var opt = estService.options[estService.selectedIndex];
    var base = D.services[opt.value] || 3000;
    var factor = D.premium.indexOf(brand) !== -1 ? 1.45 : (D.budget.indexOf(brand) !== -1 ? 0.85 : 1);
    var low = Math.round(base * factor / 100) * 100;
    var high = Math.round(base * factor * 1.35 / 100) * 100;
    document.getElementById('est-name').textContent = brand + ' · ' + opt.getAttribute('data-title');
    document.getElementById('est-time').textContent = opt.getAttribute('data-time');
    tween(document.getElementById('est-low'), low);
    tween(document.getElementById('est-high'), high);
    var cta = document.getElementById('est-cta');
    if (cta) cta.setAttribute('data-service', opt.value);
  };
  if (estBrand && estService) {
    estBrand.addEventListener('change', calcEst);
    estService.addEventListener('change', calcEst);
    calcEst();
  }

  /* ================= часы и статус ================= */
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var clockEls = document.querySelectorAll('[data-clock]');
  var statusLines = document.querySelectorAll('.status-line');
  var statusLabel = document.querySelector('[data-status-label]');

  var openInfo = function () {
    var now = new Date();
    var h = D.hours[String(now.getDay())] || '9-21';
    var parts = h.split('-');
    var from = parseInt(parts[0], 10), to = parseInt(parts[1], 10);
    var mins = now.getHours() * 60 + now.getMinutes();
    var open = mins >= from * 60 && mins < to * 60;
    return {
      open: open,
      label: open ? 'открыто до ' + to + ':00' : 'откроется сегодня в ' + from + ':00'
    };
  };
  var tickStatus = function () {
    var now = new Date();
    clockEls.forEach(function (el) {
      el.innerHTML = pad(now.getHours()) + ':' + pad(now.getMinutes()) + '<em>:' + pad(now.getSeconds()) + '</em>';
    });
    var info = openInfo();
    statusLines.forEach(function (el) {
      var dot = el.querySelector('.dot');
      var txt = el.querySelector('.status-text');
      if (dot) dot.className = 'dot ' + (info.open ? 'go' : 'warn');
      if (txt) txt.textContent = info.open ? 'сейчас открыто' : 'сейчас закрыто';
      el.classList.toggle('open', info.open);
      el.classList.toggle('closed', !info.open);
    });
    if (statusLabel) statusLabel.textContent = info.label;
  };
  tickStatus();
  setInterval(tickStatus, 1000);

  /* ================= модалка записи ================= */
  var modal = document.getElementById('booking-modal');
  var modalForm = modal ? modal.querySelector('[data-form]') : null;
  var modalOk = modal ? modal.querySelector('[data-ok]') : null;

  var openModal = function (service) {
    if (!modal) return;
    if (modalForm && modalOk) { modalForm.hidden = false; modalOk.hidden = true; }
    if (service && modal) {
      var sel = modal.querySelector('select[name="service"]');
      if (sel) sel.value = service;
    }
    modal.hidden = false;
    document.body.classList.add('lock');
    var first = modal.querySelector('input[name="name"]');
    if (first) setTimeout(function () { first.focus(); }, 60);
  };
  var closeModal = function () {
    if (!modal) return;
    modal.hidden = true;
    if (!cover || cover.classList.contains('cover-gone')) document.body.classList.remove('lock');
  };

  document.querySelectorAll('[data-booking]').forEach(function (b) {
    b.addEventListener('click', function () {
      openModal(b.getAttribute('data-service') || '');
    });
  });
  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(function (c) { c.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  /* ================= формы ================= */
  var validate = function (form) {
    var ok = true;
    var setErr = function (input, msg) {
      var f = input.closest('.field');
      var m = f ? f.querySelector('.fmsg') : null;
      input.classList.toggle('err-b', !!msg);
      if (m) { m.hidden = !msg; if (msg) m.textContent = msg; }
      if (msg) ok = false;
    };
    var name = form.querySelector('[name="name"]');
    var phone = form.querySelector('[name="phone"]');
    var agree = form.querySelector('[name="agree"]');
    setErr(name, name && name.value.trim().length < 2 ? 'Как к вам обращаться?' : '');
    setErr(phone, phone && phone.value.replace(/\D/g, '').length < 10 ? 'Введите телефон полностью' : '');
    if (agree) setErr(agree, agree.checked ? '' : 'Нужно согласие на обработку данных');
    return ok;
  };

  document.querySelectorAll('.aps-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var btn = form.querySelector('[type="submit"]');
      var html = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Отправляем…';
      setTimeout(function () {
        btn.disabled = false;
        btn.innerHTML = html;
        var order = 'ЗН-' + Math.floor(1000 + Math.random() * 9000);
        var wrap = form.closest('[data-formwrap]') || form.parentElement;
        var okBox = wrap.querySelector('[data-ok]') || (form.parentElement.querySelector('[data-ok]'));
        if (okBox) {
          var num = okBox.querySelector('[data-order]');
          if (num) num.textContent = order;
          form.hidden = true;
          okBox.hidden = false;
        }
        form.reset();
      }, 900);
    });
  });

  document.querySelectorAll('[data-reset]').forEach(function (b) {
    b.addEventListener('click', function () {
      var okBox = b.closest('[data-ok]');
      var wrap = okBox.parentElement;
      var form = wrap.querySelector('.aps-form');
      okBox.hidden = true;
      if (form) form.hidden = false;
      if (modal && !modal.hidden) closeModal();
    });
  });
})();
