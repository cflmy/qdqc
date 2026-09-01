/* 自研登录页：POST /admin/login 后进入 /desk，避免暴露内置 /admin 壳 */
(function () {
  'use strict';

  function init() {
    var form = document.getElementById('desk-login-form');
    var errEl = document.getElementById('desk-login-err');
    if (!form) return;

    function showErr(msg) {
      if (!errEl) return;
      errEl.textContent = msg;
      errEl.hidden = !msg;
    }

    function parseCsrf(html) {
      var m = html.match(/name="_csrf"\s+value="([^"]+)"/);
      return m ? m[1] : '';
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

    function fetchCsrf() {
      return fetch('/admin/login', { credentials: 'same-origin', redirect: 'manual' })
        .then(function (resp) {
          if (resp.status >= 300 && resp.status < 400) {
            return fetch('/admin/login', { credentials: 'same-origin' }).then(function (r) {
              return r.text();
            });
          }
          return resp.text();
        })
        .then(parseCsrf);
    }

    function submitLogin(username, password, csrf) {
      var body = new URLSearchParams();
      body.set('username', username);
      body.set('password', password);
      body.set('_csrf', csrf);
      return fetch('/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        redirect: 'manual'
      });
    }

    function goDesk() {
      window.location.replace('/desk');
    }

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
          if (!csrf) throw new Error('无法获取登录令牌，请刷新后重试。');
          return submitLogin(username, password, csrf);
        })
        .then(function (resp) {
          if (resp.status >= 300 && resp.status < 400) {
            goDesk();
            return;
          }
          if (resp.status === 200) {
            return resp.text().then(function (html) {
              if (/Invalid username or password/i.test(html)) {
                throw new Error('用户名或密码错误。');
              }
              goDesk();
            });
          }
          throw new Error('登录失败（HTTP ' + resp.status + '）。');
        })
        .catch(function (e) {
          showErr(e && e.message ? e.message : '登录失败，请稍后重试。');
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
