/* 自研登录页：取 CSRF 后登录，成功进入 /desk */
(function () {
  'use strict';

  // 避免 /_auth 被广告拦截扩展误杀；与 index.mq.md 后台前缀一致
  var LOGIN_API = '/_mg/login';

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
    if (/Failed to fetch|NetworkError|Load failed/i.test(s)) {
      return '无法连接登录服务，请检查网络后重试。';
    }
    return s || '登录失败，请重试。';
  }

  /** 只认 pathname，避免 /login?next=/desk 被误判为已进入后台 */
  function isDeskPath(url) {
    try {
      var path = new URL(String(url || ''), window.location.origin).pathname || '';
      return /^\/desk(?:\/|$)/.test(path);
    } catch (e) {
      return false;
    }
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

  function alreadyAuthed() {
    // manual：未登录是 303，已登录是 200；不要 follow，否则会落到 /login?next=/desk
    return fetch('/desk', {
      credentials: 'same-origin',
      redirect: 'manual',
      cache: 'no-store'
    })
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

  function fetchCsrf() {
    // CSRF 页用 follow；已登录时会跟到 /desk，用 pathname 判断
    return fetch(LOGIN_API, {
      credentials: 'same-origin',
      cache: 'no-store'
    }).then(function (resp) {
      if (isDeskPath(resp.url)) {
        goDesk();
        return Promise.reject(new Error('__authed__'));
      }
      if (!resp.ok) throw new Error('登录服务不可用（' + resp.status + '）。');
      return resp.text();
    }).then(function (html) {
      var token = parseCsrf(html);
      if (token) return token;
      return alreadyAuthed().then(function (ok) {
        if (ok) {
          goDesk();
          return Promise.reject(new Error('__authed__'));
        }
        throw new Error('无法获取登录令牌，请刷新后重试。');
      });
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

    fetchCsrf()
      .then(function (token) {
        ensureCsrfInput(form, token);
      })
      .catch(function (err) {
        if (err && err.message === '__authed__') return;
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

      fetchCsrf()
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
            cache: 'no-store'
          });
        })
        .then(function (resp) {
          return alreadyAuthed().then(function (ok) {
            if (ok || isDeskPath(resp && resp.url)) {
              goDesk();
              return null;
            }
            return resp.text().then(function (html) {
              var flash = parseFlashErr(html);
              throw new Error(friendlyErr(flash || '用户名或密码错误。'));
            });
          });
        })
        .catch(function (err) {
          if (err && err.message === '__authed__') return;
          return alreadyAuthed().then(function (ok) {
            if (ok) {
              goDesk();
              return;
            }
            showErr(friendlyErr((err && err.message) || '登录失败，请重试。'));
            if (btn) btn.disabled = false;
            var input = form.querySelector('input[name="_csrf"]');
            if (input) input.value = '';
          });
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
