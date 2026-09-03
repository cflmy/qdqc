/* 求道量子 · 专栏书册交互
 * /columns → 书架；/column/{slug} → 开卷目录；
 * 首页 → 专栏门 + 主栏目录；全站 → 侧栏导读与量子新闻 */
(function () {
  'use strict';

  var FALLBACK = [
    {
      slug: 'marqdo',
      name: 'Marqdo 专栏',
      summary: '文档即代码、站点与写作台——用 .mq.md 把想法落成可读可运行的系统。',
      sort_order: 1,
      status: 'ongoing'
    },
    {
      slug: 'linear-algebra',
      name: '线性代数专栏',
      summary: '向量、矩阵与本征：量子计算所需的数学直觉，循序铺垫。',
      sort_order: 2,
      status: 'ongoing'
    },
    {
      slug: 'quantum-algorithms',
      name: '量子算法专栏',
      summary: '门线路、Shor / Grover 与纠错入门；建议具备线代直觉后阅读。',
      sort_order: 3,
      status: 'ongoing'
    }
  ];

  var TAGS = [
    { name: '量子基础', slug: 'quantum' },
    { name: '算法', slug: 'algorithm' },
    { name: '硬件', slug: 'hardware' },
    { name: '科普', slug: 'sci-pop' },
    { name: 'Marqdo', slug: 'marqdo' }
  ];

  function pathInfo() {
    var p = window.location.pathname || '';
    if (/^\/desk(?:\/|$)/.test(p) || /^\/login\/?$/.test(p)) return { mode: 'desk' };
    if (/^\/columns\/?$/.test(p)) return { mode: 'shelf' };
    if (/^\/news\/?$/.test(p)) return { mode: 'news' };
    var m = p.match(/^\/column\/([^/?#]+)\/?$/);
    if (m) return { mode: 'volume', slug: decodeURIComponent(m[1]) };
    if (p === '/' || p === '') return { mode: 'home' };
    return { mode: '' };
  }

  function pad2(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function statusLabel(s) {
    if (s === 'ongoing') return '连载中';
    if (s === 'complete') return '已完结';
    return s || '专栏';
  }

  function sortColumns(rows) {
    return (rows || []).slice().sort(function (a, b) {
      return (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0);
    });
  }

  function fetchJson(url) {
    return fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (payload) {
        if (!payload) return [];
        return Array.isArray(payload.rows) ? payload.rows : (Array.isArray(payload) ? payload : []);
      })
      .catch(function () { return []; });
  }

  function mainEl() {
    return document.querySelector('main.main');
  }

  var COVER = {
    marqdo: '/static/covers/vol-marqdo.jpg',
    'linear-algebra': '/static/covers/vol-linear-algebra.jpg',
    'quantum-algorithms': '/static/covers/vol-quantum.jpg'
  };

  function coverFor(slug, i) {
    if (COVER[slug]) return COVER[slug];
    var keys = Object.keys(COVER);
    return COVER[keys[i % keys.length]] || COVER.marqdo;
  }

  function mountShelf(columns) {
    var main = mainEl();
    if (!main || main.querySelector('.vol-shelf')) return;
    document.body.classList.add('layout-shelf');

    var books = sortColumns(columns.length ? columns : FALLBACK)
      .map(function (col, i) {
        var no = pad2(i + 1);
        var img = coverFor(col.slug, i);
        return (
          '<a class="vol-book" data-vol="' + (i + 1) + '" href="/column/' + esc(col.slug) + '">' +
            '<div class="vol-book-media">' +
              '<img src="' + esc(img) + '" alt="" loading="lazy" decoding="async">' +
            '</div>' +
            '<div class="vol-book-body">' +
              '<div>' +
                '<div class="vol-book-no">Volume <strong>' + no + '</strong></div>' +
                '<h2 class="vol-book-name">' + esc(col.name) + '</h2>' +
                '<p class="vol-book-summary">' + esc(col.summary || '') + '</p>' +
              '</div>' +
              '<div class="vol-book-foot">' +
                '<span>' + esc(statusLabel(col.status)) + '</span>' +
                '<em>开卷 →</em>' +
              '</div>' +
            '</div>' +
          '</a>'
        );
      })
      .join('');

    var shelf = document.createElement('section');
    shelf.className = 'vol-shelf';
    shelf.setAttribute('aria-label', '专栏书架');
    shelf.innerHTML =
      '<header class="vol-shelf-head">' +
        '<p class="vol-shelf-kicker">Library</p>' +
        '<div>' +
          '<h1 class="vol-shelf-title">专栏书架</h1>' +
          '<p class="vol-shelf-lede">杂志式错落排版：主卷铺开，侧卷叠放。点开一册，像读目录那样循序前进。</p>' +
        '</div>' +
      '</header>' +
      '<div class="vol-books">' + books + '</div>';

    main.appendChild(shelf);
  }

  function postsForColumn(posts, slug) {
    return (posts || [])
      .filter(function (p) { return String(p.column_slug || '') === String(slug); })
      .sort(function (a, b) {
        var pa = a.pinned === 1 || a.pinned === '1' ? 1 : 0;
        var pb = b.pinned === 1 || b.pinned === '1' ? 1 : 0;
        if (pa !== pb) return pb - pa;
        return String(a.created_at || '').localeCompare(String(b.created_at || ''));
      });
  }

  function mountVolume(slug, columns, posts) {
    var main = mainEl();
    if (!main || main.querySelector('.vol-open')) return;
    document.body.classList.add('layout-volume');

    var list = sortColumns(columns.length ? columns : FALLBACK);
    var col = null;
    var idx = 0;
    for (var i = 0; i < list.length; i++) {
      if (String(list[i].slug) === String(slug)) {
        col = list[i];
        idx = i;
        break;
      }
    }
    if (!col) {
      col = { slug: slug, name: '专栏', summary: '', status: 'ongoing' };
    }

    var volNo = pad2(idx + 1);
    var items = postsForColumn(posts, slug);
    var first = items[0];
    var accentIdx = (idx % 3) + 1;

    var toc = items.length
      ? items
          .map(function (p, i) {
            var n = pad2(i + 1);
            var href = '/post/' + encodeURIComponent(p.slug || '');
            var date = String(p.created_at || '').slice(0, 10);
            return (
              '<li>' +
                '<a href="' + esc(href) + '">' +
                  '<span class="vol-toc-num">' + n + '</span>' +
                  '<span>' +
                    '<span class="vol-toc-title">' + esc(p.title || p.slug || '') + '</span>' +
                    (p.summary ? '<p class="vol-toc-summary">' + esc(p.summary) + '</p>' : '') +
                  '</span>' +
                  '<span class="vol-toc-page">' + esc(date || '→') + '</span>' +
                '</a>' +
              '</li>'
            );
          })
          .join('')
      : '<li class="vol-toc-empty">这一册还在装订中。回到书架看看其它卷，或稍后再来。</li>';

    var open = document.createElement('section');
    open.className = 'vol-open';
    open.setAttribute('data-vol', String(accentIdx));
    open.style.setProperty(
      '--vol-accent',
      accentIdx === 1 ? 'var(--accent)' : accentIdx === 2 ? 'var(--mark)' : 'var(--accent-2)'
    );
    open.innerHTML =
      '<div class="vol-spread">' +
        '<aside class="vol-spine" aria-hidden="true">' +
          '<span class="vol-spine-label">Contents</span>' +
          '<span class="vol-spine-no">Vol.' + volNo + '</span>' +
        '</aside>' +
        '<div class="vol-verso">' +
          '<img class="vol-verso-cover" src="' + esc(coverFor(col.slug, idx)) + '" alt="">' +
          '<div class="vol-verso-copy">' +
            '<p class="vol-kicker">// volume ' + volNo + '</p>' +
            '<h1>' + esc(col.name) + '</h1>' +
          '</div>' +
        '</div>' +
        '<div class="vol-recto">' +
          '<p class="vol-blurb">' + esc(col.summary || '') + '</p>' +
          '<div class="vol-meta">' +
            '<span>' + esc(statusLabel(col.status)) + '</span>' +
            '<span>' + items.length + ' 篇</span>' +
            '<span>循序阅读</span>' +
          '</div>' +
          (first
            ? '<a class="vol-start" href="/post/' + esc(first.slug) + '">从第一章开始</a>'
            : '<a class="vol-start" href="/columns">返回书架</a>') +
        '</div>' +
      '</div>' +
      '<div class="vol-toc">' +
        '<div class="vol-toc-head">' +
          '<h2>目录</h2>' +
          '<a href="/columns">← 书架</a>' +
        '</div>' +
        '<ol class="vol-toc-list">' + toc + '</ol>' +
      '</div>';

    main.appendChild(open);
    document.title = col.name + ' · 求道量子';
  }

  function enhanceHomeGate(columns) {
    var gate = document.querySelector('.column-gate');
    if (!gate) return;
    gate.classList.add('column-gate--shelf');
    var list = gate.querySelector('.column-gate-list');
    if (!list) return;

    var cols = sortColumns(columns.length ? columns : FALLBACK);
    list.innerHTML = cols
      .slice(0, 3)
      .map(function (col, i) {
        return (
          '<li>' +
            '<a href="/column/' + esc(col.slug) + '">' +
              '<div class="cg-media"><img src="' + esc(coverFor(col.slug, i)) + '" alt="" loading="lazy"></div>' +
              '<div class="cg-copy">' +
                '<span class="cg-vol">Vol. ' + pad2(i + 1) + '</span>' +
                '<span class="cg-name">' + esc(col.name) + '</span>' +
                '<span class="cg-desc">' + esc(col.summary || '') + '</span>' +
              '</div>' +
            '</a>' +
          '</li>'
        );
      })
      .join('');

    var more = gate.querySelector('.column-gate-more');
    if (more) {
      more.innerHTML = '<a href="/columns">进入专栏书架 →</a>';
    }
  }

  /* 主栏：专栏门移出 intro，铺满中间列后再接「本期目录」 */
  function promoteHomeGate() {
    var main = mainEl();
    var gate = document.querySelector('.column-gate');
    if (!main || !gate) return;
    if (gate.parentElement === main) return;
    gate.classList.add('column-gate--shelf');
    var toc = main.querySelector(':scope > .home-toc-label');
    var cards = main.querySelector(':scope > .content.cards');
    var anchor = toc || cards;
    if (anchor) main.insertBefore(gate, anchor);
    else main.appendChild(gate);
  }

  /* 主栏：专栏门下方加「本期目录」小标题 */
  function ensureHomeTocLabel() {
    var main = mainEl();
    if (!main || main.querySelector('.home-toc-label')) return;
    var cards = main.querySelector(':scope > .content.cards');
    if (!cards) return;
    var lab = document.createElement('p');
    lab.className = 'home-toc-label';
    lab.textContent = '本期目录';
    main.insertBefore(lab, cards);
  }

  function isPinned(p) {
    return p && (p.pinned === 1 || p.pinned === '1' || p.pinned === true);
  }

  function newsListHtml(newsRows, limit) {
    /* 仅展示数据库 /api/news 返回的行，无本地假数据 */
    var news = Array.isArray(newsRows) ? newsRows.slice() : [];
    if (!news.length) {
      return '<li class="side-news-empty">暂无快讯，请在库表 news 中添加。</li>';
    }
    if (limit && limit > 0) news = news.slice(0, limit);
    return news
      .map(function (n) {
        var date = String(n.published_at || '').slice(0, 10);
        var ext = /^https?:\/\//i.test(String(n.url || ''));
        return (
          '<li>' +
            '<a href="' + esc(n.url || '#') + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
              '<span class="side-news-meta">' +
                '<time>' + esc(date) + '</time>' +
                (n.source ? '<span class="side-news-src">' + esc(n.source) + '</span>' : '') +
              '</span>' +
              '<span class="side-news-title">' + esc(n.title || '') + '</span>' +
            '</a>' +
          '</li>'
        );
      })
      .join('');
  }

  function mountNewsArchive(newsRows) {
    var main = mainEl();
    if (!main || main.querySelector('.news-archive')) return;
    document.body.classList.add('layout-news');

    var news = Array.isArray(newsRows) ? newsRows : [];
    var items = news.length
      ? news
          .map(function (n) {
            var date = String(n.published_at || '').slice(0, 10);
            var ext = /^https?:\/\//i.test(String(n.url || ''));
            return (
              '<li class="news-archive-item">' +
                '<a href="' + esc(n.url || '#') + '"' + (ext ? ' target="_blank" rel="noopener noreferrer"' : '') + '>' +
                  '<span class="news-archive-meta">' +
                    '<time>' + esc(date) + '</time>' +
                    (n.source ? '<span>' + esc(n.source) + '</span>' : '') +
                  '</span>' +
                  '<span class="news-archive-title">' + esc(n.title || '') + '</span>' +
                  (n.summary ? '<p class="news-archive-summary">' + esc(n.summary) + '</p>' : '') +
                '</a>' +
              '</li>'
            );
          })
          .join('')
      : '<li class="news-archive-empty">库中尚无新闻。向 news 表插入记录后刷新即可。</li>';

    var wrap = document.createElement('section');
    wrap.className = 'news-archive';
    wrap.setAttribute('aria-label', '量子新闻');
    wrap.innerHTML =
      '<header class="news-archive-head">' +
        '<p class="news-archive-kicker">// brief</p>' +
        '<h1>量子新闻</h1>' +
        '<p class="news-archive-lede">数据来自 SQLite news 表（/api/news），按时间倒序。点标题打开原文。</p>' +
      '</header>' +
      '<ol class="news-archive-list">' + items + '</ol>';

    main.appendChild(wrap);
    document.title = '量子新闻 · 求道量子';
  }

  /* 右侧栏：仅量子新闻，无滚动条；标题旁箭头进独立页 */
  function renderNewsRail(newsRows) {
    if (document.querySelector('aside.side-rail')) return;
    if (pathInfo().mode === 'news') return;

    var rail = document.createElement('aside');
    rail.className = 'side-rail side-rail--news';
    rail.setAttribute('aria-label', '量子新闻');
    rail.innerHTML =
      '<div class="side-rail-head">' +
        '<p class="side-rail-label">量子新闻</p>' +
        '<a class="side-rail-jump" href="/news" title="浏览全部新闻" aria-label="浏览全部新闻">全部 →</a>' +
      '</div>' +
      '<div class="side-rail-body">' +
        '<ul class="side-news-list">' + newsListHtml(newsRows, 24) + '</ul>' +
      '</div>';

    var main = mainEl();
    if (main && main.parentNode) {
      main.parentNode.insertBefore(rail, main.nextSibling);
    } else {
      document.body.appendChild(rail);
    }
    document.body.classList.add('has-rail');
  }

  /* 刊头右侧：紧凑导读（本刊 / 读序 / 标签 / 置顶） */
  function renderMastheadGuide(posts) {
    if (pathInfo().mode !== 'home') return;
    var intro = document.querySelector('main.main > .main-intro');
    if (!intro || intro.querySelector('.masthead-guide')) return;

    var pins = (posts || []).filter(isPinned).slice(0, 2);
    var tagsHtml = TAGS.map(function (t) {
      return '<a class="side-tag" href="/tag/' + esc(t.slug) + '">' + esc(t.name) + '</a>';
    }).join('');

    var pinsHtml = pins.length
      ? '<div class="mg-pins">' +
          pins
            .map(function (p) {
              return '<a href="/post/' + esc(p.slug || '') + '">' + esc(p.title || p.slug || '') + '</a>';
            })
            .join('') +
        '</div>'
      : '';

    var brand = document.createElement('div');
    brand.className = 'masthead-brand';
    while (intro.firstChild) brand.appendChild(intro.firstChild);

    var guide = document.createElement('aside');
    guide.className = 'masthead-guide';
    guide.setAttribute('aria-label', '导读');
    guide.innerHTML =
      '<p class="mg-label">导读</p>' +
      '<p class="mg-blurb">以求道之心，探量子之密。<a href="/about">关于本刊</a></p>' +
      '<p class="mg-sub">建议读序</p>' +
      '<ol class="mg-path">' +
        '<li><a href="/column/linear-algebra">线性代数</a></li>' +
        '<li><a href="/column/quantum-algorithms">量子算法</a></li>' +
        '<li class="mg-path-soft"><a href="/column/marqdo">Marqdo</a></li>' +
      '</ol>' +
      '<div class="mg-tags">' + tagsHtml + '</div>' +
      pinsHtml;

    intro.classList.add('masthead-split');
    intro.appendChild(brand);
    intro.appendChild(guide);
  }

  function enhanceSidePanel() {
    return Promise.all([fetchJson('/api/news'), fetchJson('/api/posts')]).then(function (pair) {
      renderNewsRail(pair[0]);
      renderMastheadGuide(pair[1]);
    });
  }

  function boot() {
    var info = pathInfo();
    if (info.mode === 'desk') return;

    if (info.mode === 'home') {
      promoteHomeGate();
      ensureHomeTocLabel();
      enhanceSidePanel();
      fetchJson('/api/columns').then(function (cols) {
        if (cols && cols.length) enhanceHomeGate(cols);
      });
      return;
    }

    if (info.mode === 'news') {
      fetchJson('/api/news').then(mountNewsArchive);
      return;
    }

    enhanceSidePanel();

    if (!info.mode) return;

    Promise.all([fetchJson('/api/columns'), fetchJson('/api/posts')]).then(function (pair) {
      var columns = pair[0];
      var posts = pair[1];
      if (info.mode === 'shelf') mountShelf(columns);
      else if (info.mode === 'volume') mountVolume(info.slug, columns, posts);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
