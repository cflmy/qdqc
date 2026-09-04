/* 自研登录页：从 /_auth/login 取 CSRF，再 POST 到同一端点进入 /desk */
(function () {
  'use strict';

  var LOGIN_API = '/_auth/login';

  function parseCsrf(html) {
    if (!html) return '';
    var m =
      html.match(/name=["']_csrf["']\s*value=["']([^"']+)["']/i) ||
      html.match(/value=["']([^"']+)["']\s*name=["']_csrf["']/i);
    return m ? m[1] : '';
  }

  function parseFlashErr(html) {
    if (!html) return '';
    var m = html.match(/class=["'][^"']*flash[^"']*err[^"']*["'][^>]*>([^<]+)</i);
    return m ? m[1].replace(/\s+/g, ' ').trim() : '';
  }

  function friendlyErr(raw) {
    var s = String(raw || '');
    if (/Too many failed/i.test(s)) {
      return '尝试次数过多，请约 15 分钟后再试（或重启站点进程清除限制）。';
    }
    if (/Invalid username or password/i.test(s)) {
      return '用户名或密码错误。';
    }
    if (/Invalid or missing CSRF/i.test(s)) {
      return '登录令牌失效，请刷新页面后重试。';
    }
    return s || '登录失败，请重试。';
  }

  function ensureCsrfInput(form, token) {
    var input = form.querySelector('input[name="_csrf"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = '_csrf';
      form.appendChild(input);
    }
    input.value = token;
    return input;
  }

  function fetchCsrf() {
    // 不要用 redirect:'manual'：同域重定向时 body 可能为空，导致永远拿不到令牌
    return fetch(LOGIN_API, { credentials: 'same-origin', cache: 'no-store' }).then(function (resp) {
      if (!resp.ok) throw new Error('登录服务不可用（' + resp.status + '）。');
      return resp.text();
    }).then(function (html) {
      var token = parseCsrf(html);
      if (!token) throw new Error('无法获取登录令牌，请刷新后重试。');
      return token;
    });
  }

  function init() {
    var form = document.getElementById('desk-login-form');
    var errEl = document.getElementById('desk-login-err');
    if (!form) return;

    form.setAttribute('method', 'post');
    form.setAttribute('action', LOGIN_API);

    function showErr(msg) {
      if (!errEl) return;
      errEl.textContent = msg || '';
      errEl.hidden = !msg;
    }

    function alreadyAuthed() {
      return fetch('/desk', { credentials: 'same-origin', redirect: 'manual' })
        .then(function (resp) {
          return resp.status === 200;
        })
        .catch(function () {
          return false;
        });
    }

    function goDesk() {
      window.location.replace('/desk');
    }

    // 预取令牌，缩短提交等待
    fetchCsrf()
      .then(function (token) {
        ensureCsrfInput(form, token);
      })
      .catch(function () {
        /* 提交时再试 */
      });

    alreadyAuthed().then(function (ok) {
      if (ok) goDesk();
    });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      showErr('');
      var fd = new FormData(form);
      var username = String(fd.get('username') || '').trim();
      var password = String(fd.get('password') || '');
      if (!username || !password) {
        showErr('请填写用户名与密码。');
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      var existing = form.querySelector('input[name="_csrf"]');
      var tokenPromise = existing && existing.value ? Promise.resolve(existing.value) : fetchCsrf();

      tokenPromise
        .then(function (csrf) {
          ensureCsrfInput(form, csrf);
          var body = new URLSearchParams();
          body.set('username', username);
          body.set('password', password);
          body.set('_csrf', csrf);
          return fetch(LOGIN_API, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
            redirect: 'manual'
          });
        })
        .then(function (resp) {
          // 成功：303/302 → /desk；失败多为 200 + flash.err（切勿把 200 当成功）
          if (resp.status >= 300 && resp.status < 400) {
            goDesk();
            return null;
          }
          return resp.text().then(function (html) {
            var flash = parseFlashErr(html);
            throw new Error(friendlyErr(flash || '用户名或密码错误。'));
          });
        })
        .catch(function (err) {
          showErr((err && err.message) || '登录失败，请重试。');
          if (btn) btn.disabled = false;
          // 令牌可能已失效，清掉以便下次重取
          var input = form.querySelector('input[name="_csrf"]');
          if (input) input.value = '';
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
