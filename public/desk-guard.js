/* 前台入口：旧 /admin* 路径跳转到自研后台 /desk* */
(function () {
  'use strict';

  var p = window.location.pathname || '';
  var q = window.location.search || '';

  if (/^\/admin\/login\/?$/.test(p) || /^\/_auth\/login\/?$/.test(p)) {
    window.location.replace('/login' + q);
    return;
  }
  if (/^\/admin\/logout\/?$/.test(p)) {
    window.location.replace('/_auth/logout' + q);
    return;
  }

  var exact = {
    '/admin': '/desk',
    '/admin-publish': '/desk/posts',
    '/admin-edit': '/desk/posts',
    '/admin/posts': '/desk/posts',
    '/admin/columns': '/desk/columns',
    '/admin/news': '/desk/news',
    '/admin/post_tags': '/desk'
  };

  if (exact[p]) {
    window.location.replace(exact[p] + q);
    return;
  }

  var m = p.match(/^\/admin\/([^/]+)/);
  if (!m) return;

  var tableMap = {
    posts: '/desk/posts',
    columns: '/desk/columns',
    news: '/desk/news'
  };
  window.location.replace((tableMap[m[1]] || '/desk') + q);
})();
