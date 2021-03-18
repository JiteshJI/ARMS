// Overrides for other environments should go in environments/env.{env}.js
(function (window) {
  window.__env = window.__env || {};

  window.__env.production = false;
  window.__env.baseUrl = window.location.origin;
  window.__env.apiUrl = window.location.origin + '/api';
}(this));
