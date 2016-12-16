(function() {
  'use strict';

  angular
    .module('app')
    .factory('AuthInterceptor', function AuthInterceptor(AuthTokenFactory) {
      return {
        request: addToken
      };

      /* Добавить к запросу заголовок с токеном */
      function addToken(config) {
        var token = AuthTokenFactory.getToken();

        if(token) {
          config.headers = config.headers || {};
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      }
    });
})();