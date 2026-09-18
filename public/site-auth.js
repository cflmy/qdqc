/* 前台登录 / 注册：站点风格表单 → 框架 POST /login|/register */
(function () {
  'use strict';

  function parseCsrf(html) {
    if (!html) return '';
    var m =
      html.match(/name=["']csrf-token["']\s*content=["']([^"']+)["']/i) ||
      html.match(/content=["']([^"']+)["']\s*name=["']csrf-token["']/i) ||
      html.match(/name=["']_csrf["']\s*value=["']([^"']+)["']/i) ||
      html.match(/value=["']([^"']+)["']\s*name=["']_csrf["']/i);
    return m ? m[1] : '';
  }

  function csrfFromDoc() {
    var el = document.querySelector('meta[name="csrf-token"]');
    if (el) {
      var v = el.getAttribute('content') || '';
      if (v) return v;
    }
    var input = document.querySelector('input[name="_csrf"]');
    return input && input.value ? input.value : '';
  }

  function parseFlashErr(html) {
    if (!html) return '';
    var m = html.match(/class=["'][^"']*flash[^"']*err[^"']*["'][^>]*>([^<]+)</i);
    return m ? m[1].replace(/\s+/g, ' ').trim() : '';
  }

  function friendlyErr(raw) {
    var s = String(raw || '');
    if (/Too many failed/i.test(s)) {
      return '尝试次数过多，请约 15 分钟后再试。';
    }
    if (/Invalid username or password/i.test(s)) {
      return '用户名或密码错误。';
    }
    if (/Username.*password/i.test(s) || /required/i.test(s)) {
      return '请填写有效的用户名（≥2）与密码（≥4）。';
    }
    if (/already|exists|taken|存在/i.test(s)) {
      return '该用户名已被注册，请换一个。';
    }
    if (/Invalid or missing CSRF/i.test(s)) {
      return '登录令牌失效，请刷新页面后重试。';
    }
    if (/Failed to fetch|NetworkError|Load failed/i.test(s)) {
      return '无法连接服务，请检查网络后重试。';
    }
    return s || '操作失败，请重试。';
  }

  function qs(name) {
    try {
      return new URLSearchParams(window.location.search).get(name) || '';
    } catch (e) {
      return '';
    }
  }

  function safeNext(raw) {
    var next = String(raw || '').trim();
    if (!next || next.charAt(0) !== '/' || next.indexOf('//') === 0) return '';
    return next;
  }

  function ensureCsrf(form, token) {
    var input = form.querySelector('input[name="_csrf"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = '_csrf';
      form.appendChild(input);
    }
    input.value = token;
  }

  function ensureNext(form, next) {
    if (!next) return;
    var input = form.querySelector('input[name="next"]');
    if (!input) {
      input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'next';
      form.appendChild(input);
    }
    input.value = next;
  }

  function fetchCsrf(endpoint) {
    return fetch(endpoint, {
      credentials: 'same-origin',
      cache: 'no-store',
      redirect: 'follow'
    }).then(function (resp) {
      return resp.text().then(function (html) {
        return { resp: resp, html: html, token: parseCsrf(html) };
      });
    });
  }

  function initLogin() {
    var form = document.getElementById('site-login-form');
    var errEl = document.getElementById('site-auth-err');
    if (!form) return;

    var endpoint = form.getAttribute('action') || '/login';
    var next = safeNext(qs('next'));

    function showErr(msg) {
      if (!errEl) return;
      errEl.textContent = msg || '';
      errEl.hidden = !msg;
    }

    var boot = csrfFromDoc();
    if (boot) ensureCsrf(form, boot);
    ensureNext(form, next);
    if (!boot) {
      fetchCsrf(endpoint)
        .then(function (pack) {
          if (pack.token) ensureCsrf(form, pack.token);
        })
        .catch(function () {});
    }
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

      var tokenPromise = Promise.resolve(csrfFromDoc()).then(function (tok) {
        if (tok) return { token: tok };
        return fetchCsrf(endpoint);
      });

      tokenPromise
        .then(function (pack) {
          if (!pack.token) throw new Error('无法获取登录令牌，请刷新后重试。');
          ensureCsrf(form, pack.token);
          ensureNext(form, next);
          var body = new URLSearchParams();
          body.set('username', username);
          body.set('password', password);
          body.set('_csrf', pack.token);
          if (next) body.set('next', next);
          return fetch(endpoint, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
            cache: 'no-store',
            redirect: 'follow'
          });
        })
        .then(function (resp) {
          var path = '';
          try {
            path = new URL(resp.url || '', window.location.origin).pathname || '';
          } catch (e) {}
          if (resp.redirected || (path && path !== '/login' && path.indexOf('/login') !== 0)) {
            window.location.replace(resp.url || next || '/');
            return null;
          }
          return resp.text().then(function (html) {
            var flash = parseFlashErr(html);
            throw new Error(friendlyErr(flash || '用户名或密码错误。'));
          });
        })
        .catch(function (err) {
          showErr(friendlyErr((err && err.message) || '登录失败'));
          if (btn) btn.disabled = false;
        });
    });
  }

  function initRegister() {
    var form = document.getElementById('site-register-form');
    var errEl = document.getElementById('site-auth-err');
    if (!form) return;

    var endpoint = form.getAttribute('action') || '/register';

    function showErr(msg) {
      if (!errEl) return;
      errEl.textContent = msg || '';
      errEl.hidden = !msg;
    }

    var boot = csrfFromDoc();
    if (boot) ensureCsrf(form, boot);
    if (!boot) {
      fetchCsrf(endpoint)
        .then(function (pack) {
          if (pack.token) ensureCsrf(form, pack.token);
        })
        .catch(function () {});
    }
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      showErr('');
      var fd = new FormData(form);
      var username = String(fd.get('username') || '').trim();
      var password = String(fd.get('password') || '');
      if (username.length < 2 || password.length < 4) {
        showErr('用户名至少 2 个字符，密码至少 4 个字符。');
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;

      var tokenPromise = Promise.resolve(csrfFromDoc()).then(function (tok) {
        if (tok) return { token: tok };
        return fetchCsrf(endpoint);
      });

      tokenPromise
        .then(function (pack) {
          if (!pack.token) throw new Error('无法获取注册令牌，请刷新后重试。');
          ensureCsrf(form, pack.token);
          var body = new URLSearchParams();
          body.set('username', username);
          body.set('password', password);
          body.set('_csrf', pack.token);
          return fetch(endpoint, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body.toString(),
            cache: 'no-store',
            redirect: 'follow'
          });
        })
        .then(function (resp) {
          var path = '';
          try {
            path = new URL(resp.url || '', window.location.origin).pathname || '';
          } catch (e) {}
          if (resp.redirected || (path && path !== '/register')) {
            window.location.replace(resp.url || '/');
            return null;
          }
          return resp.text().then(function (html) {
            var flash = parseFlashErr(html);
            throw new Error(friendlyErr(flash || '注册失败，请换一个用户名重试。'));
          });
        })
        .catch(function (err) {
          showErr(friendlyErr((err && err.message) || '注册失败'));
          if (btn) btn.disabled = false;
        });
    });
  }

  function init() {
    initLogin();
    initRegister();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
