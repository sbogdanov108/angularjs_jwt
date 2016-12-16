(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', function MainCtrl(RandomUserFactory, UserFactory) {
      var vm = this;
      vm.getRandomUser = getRandomUser;
      vm.login = login;
      vm.logout = logout;

      /* Получаем инфу о юзере */
      UserFactory.getUser()
        .then(function success(response) {
          vm.user = response.data;
        }, handleError);

      /* Получаем инфу о рандомном юзере */
      function getRandomUser() {
        RandomUserFactory.getUser()
          .then(function success(response) {
            vm.randomUser = response.data;
          }, handleError);
      }

      /* Логин */
      function login(username, password) {
        UserFactory.login(username, password)
          .then(function success(response) {
            vm.user = response.data.user;
          }, handleError);
      }

      /* Выход */
      function logout() {
        UserFactory.logout();
        vm.user = null;
      }

      /* Обработка ошибок */
      function handleError(response) {
        console.log('Error: ' + response.data);
      }
    });
})();