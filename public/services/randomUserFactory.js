(function() {
  'use strict';

  angular
    .module('app')
    .factory('RandomUserFactory', function RandomUserFactory($http, API_URL) {
      return {
        getUser: getUser
      };

      /* Запрос к api на получение случайного юзера */
      function getUser() {
        return $http.get(API_URL + '/random-user');
      }
    });
})();