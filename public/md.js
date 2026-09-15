/* 求道量子 · 简易 Markdown → HTML（零依赖，供文章页与写作台共用） */
(function (global) {
  'use strict';

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function protectMath(s) {
    var slots = [];
    function hold(m) {
      slots.push(m);
      return '\u0000M' + (slots.length - 1) + '\u0000';
    }
    s = s.replace(/\$\$[\s\S]+?\$\$/g, hold);
    s = s.replace(/\\\[([\s\S]+?)\\\]/g, hold);
    s = s.replace(/\\\(([\s\S]+?)\\\)/g, hold);
    s = s.replace(/\$[^$\n]+\$/g, hold);
    return { text: s, slots: slots };
  }

  function restoreMath(s, slots) {
    return s.replace(/\u0000M(\d+)\u0000/g, function (_, i) {
      return escapeHtml(slots[Number(i)] || '');
    });
  }

  function inline(md) {
    var held = protectMath(md);
    var s = escapeHtml(held.text);
    s = s.replace(/!\[([^\]]*)\]\(([^)\s"']+)\)/g, '<img src="$2" alt="$1">');
    s = s.replace(/\[([^\]]+)\]\(([^)\s"']+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/__([^_\n]+)__/g, '<strong>$1</strong>');
    s = s.replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, '$1<em>$2</em>');
    s = s.replace(/(^|[^_\w])_([^_\n]+)_(?=[^_\w]|$)/g, '$1<em>$2</em>');
    s = s.replace(/~~([^~\n]+)~~/g, '<del>$1</del>');
    return restoreMath(s, held.slots);
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

  function render(src, emptyHtml) {
    if (!src || !String(src).trim()) {
      return emptyHtml || '';
    }
    var lines = String(src).replace(/\r\n/g, '\n').split('\n');
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

      if (/^\$\$/.test(L.trim())) {
        flushAll();
        var mathBuf = [];
        if (/^\$\$.*\$\$\s*$/.test(L.trim())) {
          mathBuf.push(L.trim());
          i++;
        } else {
          mathBuf.push(L);
          i++;
          while (i < lines.length && !/\$\$\s*$/.test(lines[i])) {
            mathBuf.push(lines[i]);
            i++;
          }
          if (i < lines.length) {
            mathBuf.push(lines[i]);
            i++;
          }
        }
        out.push('<p>' + escapeHtml(mathBuf.join('\n')) + '</p>');
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

  global.QdqcMd = { render: render, escapeHtml: escapeHtml };
})(typeof window !== 'undefined' ? window : this);
