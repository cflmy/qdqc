/* 求道量子 · 自研后台：导航、专栏/新闻 CRUD、旧路径跳转 */
(function () {
  'use strict';

  var LEGACY_PUBLISH = /^\/admin-publish\/?$/;
  var LEGACY_EDIT = /^\/admin-edit\/?$/;
  var LEGACY_ADMIN = /^\/admin(?:\/|$)/;
  var PATH_POSTS = /^\/desk\/posts\/?$/;
  var PATH_COLUMNS = /^\/desk\/columns\/?$/;
  var PATH_NEWS = /^\/desk\/news\/?$/;
  var PATH_HUB = /^\/desk\/?$/;

  function path() {
    return window.location.pathname || '';
  }

  function queryParam(name) {
    try {
      return (new URLSearchParams(window.location.search || '')).get(name) || '';
    } catch (e) {
      return '';
    }
  }

  function queryId() {
    var id = queryParam('id').trim();
    return /^\d+$/.test(id) ? id : '';
  }

  function redirectLegacy() {
    var p = path();
    var q = window.location.search || '';
    if (LEGACY_PUBLISH.test(p)) {
      window.location.replace('/desk/posts' + q);
      return true;
    }
    if (LEGACY_EDIT.test(p)) {
      var id = queryId();
      window.location.replace(id ? ('/desk/posts?id=' + encodeURIComponent(id)) : '/desk/posts');
      return true;
    }
    if (LEGACY_ADMIN.test(p) && !/^\/admin\/login/.test(p) && !/^\/admin\/logout/.test(p)) {
      var tableMap = {
        posts: '/desk/posts',
        columns: '/desk/columns',
        news: '/desk/news'
      };
      var m = p.match(/^\/admin\/([^/]+)/);
      var target = m ? (tableMap[m[1]] || '/desk') : '/desk';
      window.location.replace(target + q);
      return true;
    }
    return false;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function todayIso() {
    var d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function stripFrontChrome() {
    document.body.classList.add('desk-admin');
    document.body.classList.remove('has-rail');
    var rail = document.querySelector('aside.side-rail');
    if (rail) rail.remove();
  }

  function injectNav() {
    if (!/^\/desk/.test(path())) return;
    stripFrontChrome();
    if (document.querySelector('.admin-nav')) return;
    var p = path();
    var links = [
      { href: '/desk', label: '概览', active: PATH_HUB.test(p) },
      { href: '/desk/posts', label: '文章', active: PATH_POSTS.test(p) },
      { href: '/desk/columns', label: '专栏', active: PATH_COLUMNS.test(p) },
      { href: '/desk/news', label: '新闻', active: PATH_NEWS.test(p) }
    ];
    var nav = document.createElement('nav');
    nav.className = 'admin-nav';
    nav.setAttribute('aria-label', '后台导航');
    nav.innerHTML = links
      .map(function (l) {
        return '<a href="' + esc(l.href) + '"' + (l.active ? ' aria-current="page"' : '') + '>' + esc(l.label) + '</a>';
      })
      .join('') + '<a class="admin-nav-logout" href="/admin/logout">退出</a>';
    var intro = document.querySelector('.main-intro');
    if (intro) intro.insertBefore(nav, intro.firstChild);
  }

  function setIntro(title, ledeHtml) {
    var intro = document.querySelector('.main-intro');
    if (!intro) return;
    var h1 = intro.querySelector('h1');
    if (h1) h1.textContent = title;
    var lede = intro.querySelector('.lede') || intro.querySelector('p:not(.admin-hub-note)');
    if (lede) lede.innerHTML = ledeHtml;
  }

  function statusBanner(text, kind) {
    var banner = document.querySelector('.edit-status');
    if (!banner) {
      banner = document.createElement('p');
      banner.className = 'edit-status';
      var intro = document.querySelector('.main-intro');
      if (intro) intro.appendChild(banner);
    }
    banner.className = 'edit-status' + (kind ? ' ' + kind : '');
    banner.innerHTML = text;
  }

  function resolveForm(shell) {
    if (!shell) return null;
    if (shell.tagName === 'FORM') return shell;
    return shell.querySelector('form');
  }

  function setField(form, name, value) {
    var el = form.querySelector('[name="' + name + '"]');
    if (!el) return;
    el.value = value == null ? '' : String(value);
  }

  function ensureHidden(form, name, value) {
    var h = form.querySelector('input[name="' + name + '"]');
    if (!h) {
      h = document.createElement('input');
      h.type = 'hidden';
      h.name = name;
      form.insertBefore(h, form.firstChild);
    }
    h.value = String(value);
    return h;
  }

  function hideIdField(form) {
    var h = form.querySelector('input[name="id"]');
    if (!h) return;
    h.type = 'hidden';
    var lab = h.closest('label');
    if (lab) lab.style.display = 'none';
  }

  function fetchRows(url) {
    return fetch(url, { credentials: 'same-origin', headers: { Accept: 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (payload) {
        if (!payload) return [];
        return Array.isArray(payload.rows) ? payload.rows : [];
      })
      .catch(function () { return []; });
  }

  function deskMode() {
    if (queryId()) return 'edit';
    if (queryParam('new') === '1') return 'compose';
    return 'list';
  }

  function markList() {
    document.body.classList.add('desk-list');
    var shell = document.querySelector('.site-form');
    if (shell) shell.classList.add('editor-skin', 'is-list-only');
  }

  function markWriting() {
    document.body.classList.add('desk-writing');
    var main = document.querySelector('main.main');
    if (main) main.classList.add('desk-writing');
    var shell = document.querySelector('.site-form');
    if (shell) shell.classList.add('editor-skin', 'meta-form');
  }

  function mountListBar(newHref, label, hint) {
    if (document.querySelector('.pub-compose-bar')) return;
    var bar = document.createElement('div');
    bar.className = 'pub-compose-bar';
    bar.innerHTML =
      '<a class="pub-new-btn" href="' + esc(newHref) + '">' + esc(label) + '</a>' +
      '<p class="pub-compose-hint">' + esc(hint) + '</p>';
    var cards = document.querySelector('main.main > .content.cards');
    var head = document.querySelector('.pub-list-head');
    if (head) head.parentNode.insertBefore(bar, head);
    else if (cards) cards.parentNode.insertBefore(bar, cards);
  }

  function decorateList(sectionTitle, sectionHint, emptyText) {
    var cards = document.querySelector('main.main > .content.cards');
    if (!cards) return;
    if (!document.querySelector('.pub-list-head')) {
      var head = document.createElement('div');
      head.className = 'pub-list-head';
      head.innerHTML = '<h2>' + esc(sectionTitle) + '</h2><p>' + esc(sectionHint) + '</p>';
      cards.parentNode.insertBefore(head, cards);
    }
    cards.classList.add('pub-list');
    Array.prototype.forEach.call(cards.querySelectorAll('.card-link'), function (a) {
      if (a.querySelector('.pub-edit-tip')) return;
      var tip = document.createElement('span');
      tip.className = 'pub-edit-tip';
      tip.textContent = '编辑';
      a.appendChild(tip);
    });
    if (!cards.querySelector('.card') && !cards.querySelector('.pub-empty')) {
      var empty = document.createElement('p');
      empty.className = 'pub-empty';
      empty.textContent = emptyText;
      cards.appendChild(empty);
    }
  }

  function bindMetaForm(form, cfg) {
    var submit = form.querySelector('.actions button');
    var cancel = form.querySelector('.actions a');
    if (submit) submit.textContent = cfg.submitLabel || '保存';
    if (cancel) {
      cancel.textContent = '返回列表';
      cancel.setAttribute('href', cfg.listPath);
    }
    form.addEventListener('submit', function () {
      if (cfg.ensureId) ensureHidden(form, 'id', cfg.ensureId);
      if (cfg.createdField) {
        var c = form.querySelector('[name="' + cfg.createdField + '"]');
        if (c && !String(c.value || '').trim()) c.value = todayIso();
      }
      if (cfg.dateField) {
        var d = form.querySelector('[name="' + cfg.dateField + '"]');
        if (d && !String(d.value || '').trim()) d.value = todayIso();
      }
    });
  }

  function loadRow(form, apiUrl, id, mapRow) {
    statusBanner('正在加载…', 'is-loading');
    fetchRows(apiUrl).then(function (rows) {
      var row = rows.filter(function (r) { return String(r.id) === String(id); })[0];
      if (!row) {
        statusBanner('未找到记录 #' + esc(id) + '。<a href="' + esc(mapRow.listPath) + '">返回列表</a>', 'is-error');
        return;
      }
      mapRow.apply(form, row);
      statusBanner('', '');
    });
  }

  function mountMetaModule(opts) {
    if (!opts.testPath(path())) return;

    var mode = deskMode();
    var shell = document.querySelector('.site-form');
    var form = resolveForm(shell);

    if (mode === 'list') {
      setIntro(opts.titles.list, opts.lede.list);
      markList();
      mountListBar(opts.listPath + '?new=1', opts.newLabel, opts.newHint);
      decorateList(opts.sectionTitle, opts.sectionHint, opts.emptyText);
      return;
    }

    if (!form) return;
    markWriting();
    hideIdField(form);

    if (mode === 'compose') {
      setIntro(opts.titles.compose, opts.lede.compose);
      form.setAttribute('action', opts.insertAction);
      bindMetaForm(form, {
        listPath: opts.listPath,
        submitLabel: opts.insertSubmit,
        createdField: opts.createdField,
        dateField: opts.dateField
      });
      return;
    }

    var id = queryId();
    if (!id) return;
    setIntro(opts.titles.edit, opts.lede.edit);
    form.setAttribute('action', opts.updateAction);
    ensureHidden(form, 'id', id);
    bindMetaForm(form, {
      listPath: opts.listPath,
      submitLabel: opts.updateSubmit,
      ensureId: id
    });
    loadRow(form, opts.apiUrl, id, {
      listPath: opts.listPath,
      apply: opts.applyRow
    });
  }

  function bootHub() {
    if (!PATH_HUB.test(path())) return;
    stripFrontChrome();
    setIntro('后台管理', '统一管理文章、专栏与量子新闻。数据写入 SQLite，前台即时可读。');
  }

  function boot() {
    if (redirectLegacy()) return;
    injectNav();
    bootHub();

    mountMetaModule({
      testPath: function (p) { return PATH_COLUMNS.test(p); },
      listPath: '/desk/columns',
      insertAction: '/_form/column',
      updateAction: '/_form/column-edit',
      apiUrl: '/api/columns',
      newLabel: '新建专栏',
      newHint: 'slug 须唯一，将用于 /column/{slug} 路径。',
      sectionTitle: '专栏列表',
      sectionHint: '点击条目编辑名称、摘要、排序与连载状态。',
      emptyText: '尚无专栏。点击上方按钮创建。',
      createdField: 'created_at',
      titles: {
        list: '专栏管理',
        compose: '新建专栏',
        edit: '编辑专栏'
      },
      lede: {
        list: '维护 Vol. 书架上的专栏元数据。',
        compose: '填写 slug 与排序；前台书架按 sort_order 排列。',
        edit: '修改后保存即可更新专栏页。<a href="/desk/columns">返回列表</a>'
      },
      insertSubmit: '创建专栏',
      updateSubmit: '保存专栏',
      applyRow: function (form, row) {
        setField(form, 'id', row.id);
        setField(form, 'name', row.name);
        setField(form, 'slug', row.slug);
        setField(form, 'summary', row.summary);
        setField(form, 'sort_order', row.sort_order);
        setField(form, 'status', row.status || 'ongoing');
        setField(form, 'created_at', row.created_at);
      }
    });

    mountMetaModule({
      testPath: function (p) { return PATH_NEWS.test(p); },
      listPath: '/desk/news',
      insertAction: '/_form/news',
      updateAction: '/_form/news-edit',
      apiUrl: '/api/news',
      newLabel: '新建快讯',
      newHint: 'url 可为外链；published_at 留空则默认今天。',
      sectionTitle: '新闻列表',
      sectionHint: '侧栏与 /news 页按 published_at 倒序展示。',
      emptyText: '尚无新闻。点击上方按钮添加。',
      createdField: 'created_at',
      dateField: 'published_at',
      titles: {
        list: '量子新闻',
        compose: '新建快讯',
        edit: '编辑快讯'
      },
      lede: {
        list: '维护侧栏与新闻归档页的 SQLite 快讯。',
        compose: '标题与原文链接必填；摘要可选。',
        edit: '修改后保存即可更新侧栏展示。<a href="/desk/news">返回列表</a>'
      },
      insertSubmit: '添加快讯',
      updateSubmit: '保存快讯',
      applyRow: function (form, row) {
        setField(form, 'id', row.id);
        setField(form, 'title', row.title);
        setField(form, 'url', row.url);
        setField(form, 'source', row.source);
        setField(form, 'summary', row.summary);
        setField(form, 'published_at', String(row.published_at || '').slice(0, 10));
        setField(form, 'created_at', row.created_at);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
