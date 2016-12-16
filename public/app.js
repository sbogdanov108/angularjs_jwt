(function() {
  'use strict';

  angular
    .module('app', [], function config($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor'); // Добавляем созданный interceptor
    })

    .constant('API_URL', 'http://localhost:3000');
})();