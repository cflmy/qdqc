/* 求道量子 · 主题 / 杂志动效
 * 顶栏品牌 Logo、主题切换、入场、滚动揭示、阅读进度。 */
(function () {
  'use strict';

  var KEY = 'mq-theme';
  var switchTimer = null;

  function readStored() {
    var v = null;
    try { v = localStorage.getItem(KEY); } catch (e) { /* privacy */ }
    return v === 'light' ? 'light' : 'dark';
  }

  function logoSrc(dark) {
    return dark ? '/static/logo.png' : '/static/logo-light.png';
  }

  function applyLogo(dark) {
    var src = logoSrc(dark);
    var nodes = document.querySelectorAll('.mq-img.brand-logo img, .nav-brand-logo');
    Array.prototype.forEach.call(nodes, function (img) {
      if (img.getAttribute('src') !== src) img.src = src;
    });
  }

  function apply(theme, opts) {
    var dark = theme === 'dark';
    var soft = opts && opts.soft;
    var root = document.documentElement;

    if (soft) {
      root.classList.add('theme-switching');
      if (switchTimer) clearTimeout(switchTimer);
      switchTimer = setTimeout(function () {
        root.classList.remove('theme-switching');
        switchTimer = null;
      }, 240);
    }

    root.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.textContent = dark ? '浅色' : '深色';
      btn.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
      btn.classList.toggle('on-dark', dark);
    }
    applyLogo(dark);
  }

  function toggle() {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(KEY, next); } catch (e) { /* ignore */ }
    apply(next, { soft: true });
  }

  apply(readStored());

  function markReady() {
    if (document.body) document.body.classList.add('is-ready');
  }

  /* 首页刊头：徽标 + 刊名 lockup（标语落在刊名下方，避免整图 Logo 与标题抢行） */
  function mountMasthead() {
    var intro = document.querySelector('main.main > .main-intro');
    var fig = document.querySelector('main.main > .mq-images .mq-img.brand-logo');
    if (!intro || !fig || intro.querySelector('.masthead-lockup')) return;

    var h1 = null;
    var lede = null;
    var kids = intro.children;
    for (var i = 0; i < kids.length; i++) {
      if (!h1 && kids[i].tagName === 'H1') h1 = kids[i];
      else if (!lede && kids[i].tagName === 'P' && kids[i].classList.contains('lede')) lede = kids[i];
    }
    if (!h1) return;

    var wrap = fig.parentNode;
    var lockup = document.createElement('div');
    lockup.className = 'masthead-lockup';

    var copy = document.createElement('div');
    copy.className = 'masthead-copy';
    copy.appendChild(h1);
    if (lede) copy.appendChild(lede);

    lockup.appendChild(fig);
    lockup.appendChild(copy);

    var kicker = intro.querySelector('.kicker');
    if (kicker) {
      if (kicker.nextSibling) intro.insertBefore(lockup, kicker.nextSibling);
      else intro.appendChild(lockup);
    } else {
      intro.insertBefore(lockup, intro.firstChild);
    }

    if (wrap && wrap.classList.contains('mq-images') && !wrap.firstElementChild) {
      wrap.parentNode.removeChild(wrap);
    }
  }

  function mountBrand() {
    var nav = document.querySelector('header.topnav');
    if (!nav || document.getElementById('nav-brand')) return;

    var dark = document.documentElement.getAttribute('data-theme') !== 'light';
    var brand = document.createElement('a');
    brand.id = 'nav-brand';
    brand.className = 'nav-brand';
    brand.href = '/';
    brand.setAttribute('aria-label', '求道量子');

    var img = document.createElement('img');
    img.className = 'nav-brand-logo';
    img.src = logoSrc(dark);
    img.alt = '求道量子';
    img.width = 36;
    img.height = 36;
    img.decoding = 'async';

    var text = document.createElement('span');
    text.className = 'nav-brand-text';
    text.textContent = '求道量子';

    brand.appendChild(img);
    brand.appendChild(text);

    var list = nav.querySelector('ul.nav');
    if (list) nav.insertBefore(brand, list);
    else nav.insertBefore(brand, nav.firstChild);
  }

  function mountToggle() {
    var nav = document.querySelector('header.topnav');
    if (!nav || document.getElementById('theme-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.title = '切换主题';
    btn.addEventListener('click', toggle);
    nav.appendChild(btn);
    apply(readStored());
  }

  function mountProgress() {
    if (document.getElementById('qd-progress')) return;
    var bar = document.createElement('div');
    bar.id = 'qd-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    var article = document.querySelector('.article .article-body, .article');
    function onScroll() {
      var el = document.getElementById('qd-progress');
      if (!el) return;
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var height = (doc.scrollHeight - doc.clientHeight) || 1;
      var ratio = Math.max(0, Math.min(1, scrollTop / height));
      if (article) {
        var rect = article.getBoundingClientRect();
        var total = article.offsetHeight - window.innerHeight;
        if (total > 40) {
          var passed = -rect.top;
          ratio = Math.max(0, Math.min(1, passed / total));
        }
      }
      el.style.width = (ratio * 100).toFixed(2) + '%';
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
  }

  function mountReveal() {
    if (!('IntersectionObserver' in window)) return;
    var nodes = document.querySelectorAll(
      '.article .article-body.md > h2, .article .article-body.md > h3, .article .article-body.md > blockquote, .article .article-body.md > pre'
    );
    if (!nodes.length) return;

    Array.prototype.forEach.call(nodes, function (n) {
      n.classList.add('qd-reveal');
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('qd-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    Array.prototype.forEach.call(nodes, function (n) { io.observe(n); });
  }

  function formatDates() {
    var nodes = document.querySelectorAll('.card-meta, .article-meta');
    Array.prototype.forEach.call(nodes, function (el) {
      var t = (el.textContent || '').trim();
      var m = t.match(/^(\d{4}-\d{2}-\d{2})T[\d:.]+Z?$/i);
      if (m) el.textContent = m[1];
    });
  }

  function tuneDropcap() {
    var p = document.querySelector('.article .article-body.md > p:first-of-type');
    if (!p) return;
    var t = (p.textContent || '').replace(/\s+/g, '');
    // 公式 / 代码开头的段落不做首字下沉，避免把 $ 放大
    if (!t || /^[\$\\\[\(\d]/.test(t) || t.indexOf('$$') === 0) return;
    if (!/^[\u4e00-\u9fffA-Za-z]/.test(t)) return;
    p.classList.add('has-dropcap');
  }

  function renderMath() {
    if (typeof renderMathInElement !== 'function') return;
    var roots = document.querySelectorAll('.article .article-body.md, .md-preview');
    if (!roots.length) return;
    var opts = {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '\\[', right: '\\]', display: true },
        { left: '$', right: '$', display: false },
        { left: '\\(', right: '\\)', display: false }
      ],
      throwOnError: false,
      ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
    };
    Array.prototype.forEach.call(roots, function (root) {
      try { renderMathInElement(root, opts); } catch (e) { /* ignore */ }
    });
  }

  function whenKatexReady(fn) {
    if (typeof renderMathInElement === 'function') {
      fn();
      return;
    }
    var n = 0;
    var timer = setInterval(function () {
      n += 1;
      if (typeof renderMathInElement === 'function') {
        clearInterval(timer);
        fn();
      } else if (n > 60) {
        clearInterval(timer);
      }
    }, 50);
  }

  function boot() {
    mountBrand();
    mountToggle();
    mountMasthead();
    formatDates();
    tuneDropcap();
    markReady();
    mountProgress();
    mountReveal();
    whenKatexReady(renderMath);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
