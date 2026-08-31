/* 求道量子 · 发布文章页分栏 Markdown 编辑器
 * 仿 markdown.com.cn/editor：左侧源码编辑区（含行号）、右侧实时预览，
 * 顶部扁平图标工具栏，底部状态栏（字数 / 行列 / 同步滚动）。
 * 只增强「正文」文本域（textarea[name="content"]），表单提交时同步回原字段。
 * 颜色/主题跟随全局黑白 CSS 变量，无需关心深浅色。 */
(function () {
  'use strict';

  /* ---------- 图标（内联 SVG，currentColor 跟随主题） ---------- */

  var ICONS = {
    heading: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><text x="12" y="17" text-anchor="middle" font-size="13" font-weight="700" stroke="none" fill="currentColor">H</text></svg>',
    chevron: '<svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
    bold: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 12a4 4 0 0 0 0-8H7v16h7a4 4 0 0 0 0-8H7"/></svg>',
    italic: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 4h-9M14 20H5M15 4L9 20"/></svg>',
    strike: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4H9a3 3 0 0 0-2.83 4"/><path d="M14 12a4 4 0 0 1 0 8H6"/><path d="M4 12h16"/></svg>',
    code: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>',
    quote: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 6H3"/><path d="M21 12H8"/><path d="M21 18H8"/><path d="M3 12v6"/></svg>',
    ul: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/></svg>',
    ol: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h11"/><path d="M10 12h11"/><path d="M10 18h11"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
    link: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
    image: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>',
    codeblock: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M10 8l-2 4 2 4"/><path d="M14 8l2 4-2 4"/></svg>',
    table: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>',
    hr: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/></svg>',
    eye: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    full: '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>'
  };

  /* ---------- 安全 & 简易 Markdown 渲染（自研、零依赖） ---------- */

  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function inline(md) {
    var s = escapeHtml(md);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s"']+)\)/g, '<img src="$2" alt="$1">');
    s = s.replace(/\[([^\]]+)\]\(([^)\s"']+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__([^_\n]+)__/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*\w])\*([^*\n*]+)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
    s = s.replace(/(^|[^_\w])_([^_\n_]+)_(?=[^_\w]|$)/g, '$1<em>$2</em>');
    s = s.replace(/~~([^~\n]+)~~/g, '<del>$1</del>');
    return s;
  }

  function splitRow(r) {
    var s = r.trim();
    if (s.charAt(0) === '|') s = s.slice(1);
    if (s.slice(-1) === '|') s = s.slice(0, -1);
    return s.split('|').map(function (c) { return c.trim(); });
  }

  function tableHtml(rows) {
    var head = splitRow(rows[0]);
    var aligns = splitRow(rows[1]).map(function (c) {
      if (/^-+:$/.test(c)) return 'right';
      if (/^:-+$/.test(c)) return 'left';
      if (/^:-+:$/.test(c)) return 'center';
      return '';
    });
    var h = '<table><thead><tr>';
    head.forEach(function (cell, j) {
      h += '<th' + (aligns[j] ? ' style="text-align:' + aligns[j] + '"' : '') + '>' + inline(cell) + '</th>';
    });
    h += '</tr></thead><tbody>';
    for (var k = 2; k < rows.length; k++) {
      var cells = splitRow(rows[k]);
      h += '<tr>';
      for (var j = 0; j < head.length; j++) {
        h += '<td' + (aligns[j] ? ' style="text-align:' + aligns[j] + '"' : '') + '>' + inline(cells[j] || '') + '</td>';
      }
      h += '</tr>';
    }
    return h + '</tbody></table>';
  }

  function render(src) {
    if (!src || !src.trim()) {
      return '<p class="md-empty">（稍后这里会实时渲染 Markdown 预览…）</p>';
    }
    var lines = src.replace(/\r\n/g, '\n').split('\n');
    var out = [];
    var para = [];
    var list = [];
    var listType = null;
    var i = 0;

    function flushPara() {
      if (para.length) {
        out.push('<p>' + inline(para.join(' ')) + '</p>');
        para = [];
      }
    }
    function flushList() {
      if (list.length) {
        out.push('<' + listType + '>' + list.join('') + '</' + listType + '>');
        list = [];
        listType = null;
      }
    }
    function flushAll() { flushPara(); flushList(); }

    while (i < lines.length) {
      var L = lines[i];

      var fm = L.match(/^```([\w+-]*)\s*$/);
      if (fm) {
        flushAll();
        var buf = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) {
          buf.push(escapeHtml(lines[i]));
          i++;
        }
        i++;
        out.push('<pre><code' + (fm[1] ? ' data-lang="' + fm[1] + '"' : '') + '>' + buf.join('\n') + '</code></pre>');
        continue;
      }

      if (/^\s*\|.*\|\s*$/.test(L) && i + 1 < lines.length && /^\s*\|?[\s:|-]*-[\s:|-]*\|?\s*$/.test(lines[i + 1])) {
        flushAll();
        var rows = [L];
        i += 2;
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i]) && lines[i].trim() !== '') {
          rows.push(lines[i]);
          i++;
        }
        out.push(tableHtml(rows));
        continue;
      }

      var h = L.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        flushAll();
        var lvl = h[1].length;
        out.push('<h' + lvl + '>' + inline(h[2]) + '</h' + lvl + '>');
        i++;
        continue;
      }

      if (/^\s*(---|\*\*\*|___)\s*$/.test(L)) {
        flushAll();
        out.push('<hr>');
        i++;
        continue;
      }

      if (/^\s*>/.test(L)) {
        flushAll();
        var q = [];
        while (i < lines.length && /^\s*>/.test(lines[i])) {
          q.push(lines[i].replace(/^\s*>\s?/, ''));
          i++;
        }
        out.push('<blockquote>' + render(q.join('\n')) + '</blockquote>');
        continue;
      }

      var ul = L.match(/^\s*[-*+]\s+(.*)$/);
      if (ul) {
        flushPara();
        if (listType !== 'ul') { flushList(); listType = 'ul'; }
        list.push('<li>' + inline(ul[1]) + '</li>');
        i++;
        continue;
      }

      var ol = L.match(/^\s*\d+[.)]\s+(.*)$/);
      if (ol) {
        flushPara();
        if (listType !== 'ol') { flushList(); listType = 'ol'; }
        list.push('<li>' + inline(ol[1]) + '</li>');
        i++;
        continue;
      }

      if (/^\s*$/.test(L)) {
        flushAll();
        i++;
        continue;
      }

      para.push(L);
      i++;
    }
    flushAll();
    return out.join('\n');
  }

  /* ---------- 编辑器控件 ---------- */

  var TOOLS = [
    { cmd: 'heading', icon: 'heading' },
    { cmd: 'sep' },
    { cmd: 'bold', icon: 'bold', title: '加粗' },
    { cmd: 'italic', icon: 'italic', title: '斜体' },
    { cmd: 'strike', icon: 'strike', title: '删除线' },
    { cmd: 'code', icon: 'code', title: '行内代码' },
    { cmd: 'sep' },
    { cmd: 'quote', icon: 'quote', title: '引用块' },
    { cmd: 'ul', icon: 'ul', title: '无序列表' },
    { cmd: 'ol', icon: 'ol', title: '有序列表' },
    { cmd: 'sep' },
    { cmd: 'link', icon: 'link', title: '插入链接' },
    { cmd: 'image', icon: 'image', title: '插入图片' },
    { cmd: 'codeblock', icon: 'codeblock', title: '代码块' },
    { cmd: 'table', icon: 'table', title: '插入表格' },
    { cmd: 'hr', icon: 'hr', title: '分割线' }
  ];

  var HEADING_LV = ['一级标题', '二级标题', '三级标题', '四级标题', '五级标题', '六级标题'];

  function buildEditor(form, ta) {
    var out = document.createElement('div');
    out.className = 'md-editor';

    var toolbar = '<div class="md-toolbar"><div class="md-tools">';
    TOOLS.forEach(function (t) {
      if (t.cmd === 'sep') {
        toolbar += '<span class="md-sep"></span>';
      } else if (t.cmd === 'heading') {
        toolbar += '<div class="md-drop" data-drop="heading"><button type="button" class="md-btn tool-btn" data-cmd="heading" title="标题">' +
          ICONS.heading + '<span class="md-caret">' + ICONS.chevron + '</span></button>' +
          '<div class="md-drop-menu">';
        for (var n = 1; n <= 6; n++) {
          toolbar += '<button type="button" class="md-drop-item" data-head="' + n + '"><b>H' + n + '</b><span>' + HEADING_LV[n - 1] + '</span></button>';
        }
        toolbar += '</div></div>';
      } else {
        toolbar += '<button type="button" class="md-btn tool-btn" data-cmd="' + t.cmd + '" title="' + t.title + '">' + ICONS[t.icon] + '</button>';
      }
    });
    toolbar += '</div><div class="md-meta">' +
      '<button type="button" class="md-btn tool-btn" data-preview-toggle title="预览/编辑切换">' + ICONS.eye + '</button>' +
      '<button type="button" class="md-btn tool-btn" data-full title="全屏/退出">' + ICONS.full + '</button></div></div>';

    out.innerHTML =
      toolbar +
      '<div class="md-body md-view-edit">' +
      '<div class="md-pane md-pane-edit"><span class="md-pane-tag">Markdown</span>' +
      '<div class="md-scroll"><div class="line-numbers" aria-hidden="true"></div>' +
      '<textarea class="md-source" placeholder="在这里用 Markdown 撰写正文…" spellcheck="false"></textarea></div></div>' +
      '<div class="md-pane md-pane-preview"><span class="md-pane-tag">预览</span>' +
      '<div class="md-preview-scroll"><div class="md-preview"></div></div></div>' +
      '</div>' +
      '<div class="md-status">' +
      '<span class="md-status-item md-status-count">0 字</span>' +
      '<span class="md-status-bar">|</span>' +
      '<span class="md-status-item md-status-pos">行 1, 列 1</span>' +
      '<span class="md-status-right"><label class="md-status-sync"><input type="checkbox"> 同步滚动</label></span>' +
      '</div>';

    // 替换 <label>正文<textarea…></label> 为干净的字段容器
    var labelEl = ta.closest('label');
    var box = document.createElement('div');
    box.className = 'md-field';
    var span = document.createElement('span');
    span.className = 'md-field-label';
    span.textContent = labelEl && labelEl.firstChild ? (labelEl.firstChild.nodeValue || '正文') : '正文';
    box.appendChild(span);
    box.appendChild(out);
    ta.classList.add('md-hidden');
    if (ta.hasAttribute('required')) {
      ta.removeAttribute('required');
    }
    box.appendChild(ta);
    if (labelEl && labelEl.parentNode) {
      labelEl.parentNode.replaceChild(box, labelEl);
    } else {
      form.insertBefore(box, form.firstChild);
    }

    var src = out.querySelector('.md-source');
    var pv = out.querySelector('.md-preview-scroll');
    var pr = out.querySelector('.md-preview');
    var lns = out.querySelector('.line-numbers');
    var countEl = out.querySelector('.md-status-count');
    var posEl = out.querySelector('.md-status-pos');
    var syncCb = out.querySelector('.md-status-sync input');
    src.value = ta.value || '';
    src.setAttribute('required', '');

    /* ---- 行号 ---- */
    function renderLineNumbers() {
      var total = src.value.split('\n').length;
      var h = '';
      for (var n = 1; n <= total; n++) h += '<span>' + n + '</span>';
      lns.innerHTML = h;
    }

    /* ---- 状态栏：字数 + 光标行列 ---- */
    function updateStatus() {
      var v = src.value;
      countEl.textContent = v.replace(/\s+/g, '').length + ' 字';
      var start = src.selectionStart;
      var upTo = v.slice(0, start);
      var row = upTo.split('\n').length;
      var col = start - upTo.lastIndexOf('\n');
      posEl.textContent = '行 ' + row + ', 列 ' + col;
    }

    /* ---- 同步滚动：编辑区滚动时按比例滚动预览 ---- */
    function syncPreview() {
      if (!syncCb.checked) return;
      var sh = src.scrollHeight - src.clientHeight;
      var ph = pv.scrollHeight - pv.clientHeight;
      if (sh <= 0 || ph <= 0) return;
      pv.scrollTop = src.scrollTop / sh * ph;
    }

    var typing = null;
    function refresh() {
      ta.value = src.value;      // 同步回隐藏的原字段，保证提交带值
      pr.innerHTML = render(src.value);
      renderLineNumbers();
      updateStatus();
    }
    function debounceRefresh() {
      ta.value = src.value;
      renderLineNumbers();
      updateStatus();
      if (typing) clearTimeout(typing);
      typing = setTimeout(function () {
        pr.innerHTML = render(src.value);
        syncPreview();
        typing = null;
      }, 120);
    }
    if (syncCb) {
      syncCb.addEventListener('change', syncPreview);
    }
    src.addEventListener('input', debounceRefresh);
    src.addEventListener('keyup', updateStatus);
    src.addEventListener('click', updateStatus);
    src.addEventListener('scroll', function () {
      lns.style.transform = 'translateY(-' + src.scrollTop + 'px)';
      syncPreview();
    });
    form.addEventListener('submit', function () { ta.value = src.value; });
    refresh();

    /* ---- 工具栏动作 ---- */
    function sel() {
      return { start: src.selectionStart, end: src.selectionEnd, val: src.value.slice(src.selectionStart, src.selectionEnd) };
    }
    function place(start, end) {
      src.focus();
      src.setSelectionRange(start, end);
      updateStatus();
    }
    function wrap(pre, post, placeholder) {
      var r = sel();
      var mid = r.val || placeholder;
      src.value = src.value.slice(0, r.start) + pre + mid + post + src.value.slice(r.end);
      place(r.start + pre.length, r.start + pre.length + mid.length);
      debounceRefresh();
    }
    function linePrefix(prefix) {
      var r = sel();
      var before = src.value.slice(0, r.start);
      var lineStart = before.lastIndexOf('\n') + 1;
      var text = src.value.slice(lineStart, r.end);
      src.value = src.value.slice(0, lineStart) + prefix + text + src.value.slice(r.end);
      place(r.start + prefix.length, r.end + prefix.length);
      debounceRefresh();
    }
    function insertAtCursor(text) {
      var r = sel();
      src.value = src.value.slice(0, r.start) + text + src.value.slice(r.end);
      var pos = r.start + text.length;
      place(pos, pos);
      debounceRefresh();
    }

    var actions = {
      bold: function () { wrap('**', '**', '加粗文字'); },
      italic: function () { wrap('*', '*', '斜体文字'); },
      strike: function () { wrap('~~', '~~', '删除线'); },
      code: function () { wrap('`', '`', 'code'); },
      quote: function () { linePrefix('> '); },
      ul: function () { linePrefix('- '); },
      ol: function () { linePrefix('1. '); },
      link: wrap.bind(null, '[', '](https://example.com)', '链接文字'),
      image: wrap.bind(null, '![', '](https://example.com/image.png)', '图片说明'),
      codeblock: function () { insertAtCursor('\n```text\n在这里写代码…\n```\n'); },
      table: function () { insertAtCursor('\n| 列一 | 列二 | 列三 |\n|------|------|------|\n| 内容 | 内容 | 内容 |\n'); },
      hr: function () { insertAtCursor('\n---\n'); }
    };

    function closeDrops() {
      Array.prototype.forEach.call(out.querySelectorAll('.md-drop.open'), function (d) { d.classList.remove('open'); });
    }

    out.addEventListener('click', function (e) {
      var drop = e.target.closest('.md-drop');
      var b = e.target.closest('button');
      if (drop) {
        var isMenu = e.target.closest('.md-drop-menu');
        if (!isMenu) { // 点标题按钮：开合下拉
          e.stopPropagation();
          var open = drop.classList.toggle('open');
          if (open) {
            Array.prototype.forEach.call(out.querySelectorAll('.md-drop'), function (d) { if (d !== drop) d.classList.remove('open'); });
          }
          return;
        }
        // 点菜单项：插入对应级别标题
        var it = e.target.closest('.md-drop-item');
        if (it) {
          var lv = it.getAttribute('data-head');
          var prefix = '';
          for (var k = 0; k < +lv; k++) prefix += '#';
          linePrefix(prefix + ' ');
          closeDrops();
          return;
        }
        return;
      }
      if (!b) { closeDrops(); return; }
      if (b.hasAttribute('data-full')) {
        out.classList.toggle('full');
        b.classList.toggle('on');
        closeDrops();
        return;
      }
      if (b.hasAttribute('data-preview-toggle')) {
        var body = out.querySelector('.md-body');
        var view = body.classList.contains('md-view-edit') ? 'md-view-preview' : 'md-view-edit';
        body.classList.remove('md-view-edit', 'md-view-preview');
        body.classList.add(view);
        closeDrops();
        return;
      }
      var cmd = b.getAttribute('data-cmd');
      if (cmd && actions[cmd]) {
        actions[cmd]();
        closeDrops();
      }
    });
  }

  /* ---------- 写作台布局：重组元信息字段 ---------- */

  function composeMeta(form) {
    if (form.querySelector('.pub-meta')) return;
    var meta = document.createElement('div');
    meta.className = 'pub-meta';
    var row2 = document.createElement('div');
    row2.className = 'pub-row2';
    var title = null, summary = null, hasRow2 = false;

    Array.prototype.forEach.call(form.querySelectorAll('label'), function (lab) {
      var inp = lab.querySelector('input[name], textarea[name]');
      if (!inp) return;
      var n = inp.getAttribute('name');
      if (n === 'content') return; // 正文交给编辑器
      lab.classList.add('pub-field');
      if (n === 'title') {
        title = lab;
        lab.classList.add('pub-title');
        inp.setAttribute('placeholder', '输入文章标题…');
      } else if (n === 'slug' || n === 'tag') {
        lab.classList.add('pub-col');
        row2.appendChild(lab);
        hasRow2 = true;
        inp.setAttribute('placeholder', n === 'slug' ? '链接标识（可选）' : '标签（可选）');
      } else if (n === 'summary') {
        summary = lab;
        lab.classList.add('pub-summary');
        inp.setAttribute('rows', '3');
        inp.setAttribute('placeholder', '一句话摘要（可选）');
      }
    });

    if (title) meta.appendChild(title);
    if (hasRow2) meta.appendChild(row2);
    if (summary) meta.appendChild(summary);

    if (!meta.childNodes.length) return;
    var field = form.querySelector('.md-field');
    if (field && field.parentNode) {
      field.parentNode.insertBefore(meta, field);
    } else {
      form.insertBefore(meta, form.firstChild);
    }
  }

  /* ---------- 挂载 ---------- */

  function init() {
    var form = document.querySelector('.site-form');
    if (!form || form.querySelector('.md-editor')) return;
    var ta = form.querySelector('textarea[name="content"]');
    if (!ta) return;
    form.classList.add('editor-skin');
    buildEditor(form, ta);
    composeMeta(form);

    // 中文文案微调（只改文案，不改插件源码）
    var submit = form.querySelector('.actions button');
    if (submit) submit.textContent = '发布文章';
    var cancel = form.querySelector('.actions a');
    if (cancel) cancel.textContent = '取消';
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();