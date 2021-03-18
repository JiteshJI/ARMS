(function (window) {
  window.__env = window.__env || {};

  window.__env.production = true;
  window.__env.baseUrl = window.location.origin;
  window.__env.apiUrl = window.location.origin + '/api';
}(this));
