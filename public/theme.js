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

  /* 小屏杂志抽屉：侧栏改为 off-canvas，保留归档入口 */
  function mqNarrow() {
    return window.matchMedia('(max-width: 860px)').matches;
  }

  function drawerEligible() {
    var side = document.querySelector('aside.side');
    if (!side) return false;
    var b = document.body;
    if (!b) return false;
    if (b.classList.contains('desk-admin') || b.classList.contains('desk-list') || b.classList.contains('desk-writing')) {
      return false;
    }
    if (b.classList.contains('layout-shelf') || b.classList.contains('layout-volume') || b.classList.contains('layout-news')) {
      return false;
    }
    return b.classList.contains('has-sidebar');
  }

  function setDrawer(open) {
    var side = document.querySelector('aside.side');
    var btn = document.getElementById('nav-menu-toggle');
    var veil = document.getElementById('nav-drawer-veil');
    if (!side || !drawerEligible() || !mqNarrow()) {
      document.body.classList.remove('nav-open');
      document.documentElement.style.removeProperty('overflow');
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-label', '打开目录');
      }
      if (veil) veil.hidden = true;
      return;
    }
    document.body.classList.toggle('nav-open', open);
    document.documentElement.style.overflow = open ? 'hidden' : '';
    if (btn) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? '关闭目录' : '打开目录');
    }
    if (veil) veil.hidden = !open;
    if (open) {
      var first = side.querySelector('a');
      if (first) try { first.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    }
  }

  function mountDrawer() {
    var nav = document.querySelector('header.topnav');
    var side = document.querySelector('aside.side');
    if (!nav || !side) return;

    if (!document.getElementById('nav-menu-toggle')) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.id = 'nav-menu-toggle';
      btn.className = 'nav-menu-toggle';
      btn.setAttribute('aria-controls', 'site-side-drawer');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '打开目录');
      btn.innerHTML =
        '<span class="nav-menu-bars" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="nav-menu-label">目录</span>';
      btn.addEventListener('click', function () {
        setDrawer(!document.body.classList.contains('nav-open'));
      });
      var brand = document.getElementById('nav-brand');
      if (brand && brand.nextSibling) nav.insertBefore(btn, brand.nextSibling);
      else nav.insertBefore(btn, nav.firstChild);
    }

    if (!side.id) side.id = 'site-side-drawer';
    side.setAttribute('role', 'navigation');
    side.setAttribute('aria-label', '站点目录');

    if (!document.getElementById('nav-drawer-veil')) {
      var veil = document.createElement('button');
      veil.type = 'button';
      veil.id = 'nav-drawer-veil';
      veil.className = 'nav-drawer-veil';
      veil.setAttribute('aria-label', '关闭目录');
      veil.hidden = true;
      veil.addEventListener('click', function () { setDrawer(false); });
      document.body.appendChild(veil);
    }

    if (!mountDrawer._bound) {
      mountDrawer._bound = true;
      document.addEventListener('keydown', function (ev) {
        if (ev.key === 'Escape') setDrawer(false);
      });
      window.addEventListener('resize', function () {
        if (!mqNarrow()) setDrawer(false);
      });
      side.addEventListener('click', function (ev) {
        var t = ev.target;
        if (t && t.closest && t.closest('a')) setDrawer(false);
      });
    }

    setDrawer(false);
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

  function markPinnedCards() {
    var cards = document.querySelectorAll('main.main > .content.cards .card');
    if (!cards.length) return;
    fetch('/api/posts', { credentials: 'same-origin', headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (payload) {
        if (!payload) return;
        var rows = Array.isArray(payload.rows) ? payload.rows : [];
        var pinned = {};
        rows.forEach(function (row) {
          if (row && (row.pinned === 1 || row.pinned === '1') && row.slug) {
            pinned[String(row.slug)] = true;
          }
        });
        Array.prototype.forEach.call(cards, function (card) {
          var a = card.querySelector('a.card-link');
          if (!a) return;
          var href = a.getAttribute('href') || '';
          var m = href.match(/\/post\/([^/?#]+)/);
          if (!m) return;
          var slug = decodeURIComponent(m[1]);
          if (pinned[slug]) card.classList.add('is-pinned');
        });
      })
      .catch(function () { /* 静默 */ });
  }

  function boot() {
    mountBrand();
    mountToggle();
    mountDrawer();
    mountMasthead();
    formatDates();
    tuneDropcap();
    markPinnedCards();
    markReady();
    mountProgress();
    mountReveal();
    whenKatexReady(renderMath);
    // volume.js 可能稍后改 body class，再同步一次抽屉可用性
    setTimeout(mountDrawer, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
