(function() {
  'use strict';

  angular
    .module('app')
    .factory('AuthTokenFactory', function UserFactory($window) {
      var store = $window.localStorage;
      var key = 'auth-token';

      return {
        getToken: getToken,
        setToken: setToken
      };

      /* Получить токен из Local Storage */
      function getToken() {
        return store.getItem(key);
      }

      /* Создать или удалить токен из Local Storage */
      function setToken(token) {
        if(token) {
          store.setItem(key, token);
        }
        else {
          store.removeItem(key);
        }
      }
    });
})();