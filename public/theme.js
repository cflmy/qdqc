/* 求道量子 · 黑白双色主题切换
 * 默认深色（黑），可切换浅色（白），选择持久化到 localStorage。
 * 本脚本由 <head> 中同步加载：解析到 <html> 标签即落下 data-theme，
 * 避免首屏亮/暗闪烁（FOUC）。切换按钮自动注入顶栏末尾。
 * 品牌图也随之切换：深色用白字版 logo.png，浅色用深字版 logo-light.png。 */
(function () {
  'use strict';

  var KEY = 'mq-theme';

  function readStored() {
    var v = null;
    try { v = localStorage.getItem(KEY); } catch (e) { /* 隐私模式 */ }
    return v === 'light' ? 'light' : 'dark';
  }

  function applyLogo(dark) {
    var img = document.querySelector('.mq-img.brand-logo img');
    if (!img) return;
    var want = dark ? '/static/logo.png' : '/static/logo-light.png';
    if (img.getAttribute('src') !== want) img.src = want;
  }

  function apply(theme) {
    var dark = theme === 'dark';
    document.documentElement.setAttribute('data-theme', theme);
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
    apply(next);
  }

  // 首屏防闪烁：<head> 解析期间同步落下主题属性（此刻 <html> 已存在）
  apply(readStored());

  function mount() {
    var nav = document.querySelector('header.topnav');
    if (!nav || document.getElementById('theme-toggle')) return;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'theme-toggle';
    btn.className = 'theme-toggle';
    btn.title = '切换黑白主题';
    btn.addEventListener('click', toggle);
    nav.appendChild(btn);
    apply(readStored());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();