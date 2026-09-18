/* 文章评论：访客/登录显隐与表单文案；列表由服务端列表装配渲染 */
(function () {
  'use strict';

  function isLoggedIn() {
    return !!document.querySelector(
      'header.topnav a[href="/_mg/logout"], header.topnav a[href*="logout"]'
    );
  }

  function tuneForm() {
    var mount = document.getElementById('comment-form-mount');
    var formBox = mount
      ? mount.querySelector('.site-form')
      : document.querySelector('.site-form form[action*="comment"], form[action="/_form/comment"]');
    if (!formBox) {
      formBox = document.querySelector('main .site-form');
    }
    if (!formBox) return null;
    formBox.classList.add('comment-compose');
    var form = formBox.tagName === 'FORM' ? formBox : formBox.querySelector('form');
    if (!form) return null;
    var btn = form.querySelector('button[type="submit"]');
    if (btn) btn.textContent = '发表评论';
    var cancel = form.querySelector('.actions a');
    if (cancel) cancel.hidden = true;
    var ta = form.querySelector('textarea[name="body"]');
    if (ta) {
      ta.setAttribute('placeholder', '写下你的想法…');
      ta.setAttribute('rows', '4');
      ta.setAttribute('aria-label', '评论内容');
    }
    return form;
  }

  function init() {
    var sec = document.querySelector('.post-comments');
    if (!sec) return;

    var guest = document.getElementById('comment-guest');
    var mount = document.getElementById('comment-form-mount');
    if (isLoggedIn()) {
      if (guest) guest.hidden = true;
      if (mount) mount.hidden = false;
      tuneForm();
    } else {
      if (guest) guest.hidden = false;
      if (mount) mount.hidden = true;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
