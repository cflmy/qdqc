/* 求道量子 · 主题 / 杂志动效
 * 主题切换、Logo 适配、is-ready 入场、滚动揭示、文章阅读进度。 */
(function () {
  'use strict';

  var KEY = 'mq-theme';
  var switchTimer = null;

  function readStored() {
    var v = null;
    try { v = localStorage.getItem(KEY); } catch (e) { /* privacy */ }
    return v === 'light' ? 'light' : 'dark';
  }

  function applyLogo(dark) {
    var img = document.querySelector('.mq-img.brand-logo img');
    if (!img) return;
    var want = dark ? '/static/logo.png' : '/static/logo-light.png';
    if (img.getAttribute('src') !== want) img.src = want;
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

  function boot() {
    mountToggle();
    markReady();
    mountProgress();
    mountReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
