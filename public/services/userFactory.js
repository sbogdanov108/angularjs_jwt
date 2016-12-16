(function() {
  'use strict';

  angular
    .module('app')
    .factory('UserFactory', function UserFactory($http, API_URL, AuthTokenFactory, $q) {
      return {
        login : login,
        logout: logout,
        getUser
      };

      /* Запрос к api для получение токена */
      function login(username, password) {
        return $http.post(API_URL + '/login', {
          username: username,
          password: password
        })
        .then(function success(response) {
          /* При успешном получении токена сохраняем его в Local Storage */
          AuthTokenFactory.setToken(response.data.token);

          return response;
        });
      }

      /* Выход */
      function logout() {
        /* Удаляем токен из Local Storage */
        AuthTokenFactory.setToken();
      }

      /* Получить инфу об юзере */
      function getUser() {
        if(AuthTokenFactory.getToken()) {
          return $http.get(API_URL + '/me');
        }
        else {
          return $q.reject({data: 'Нет токена'});
        }
      }
    });
})();