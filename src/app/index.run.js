export function runBlock($rootScope, $state, authService, masterService) {
  'ngInject';
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !authService.isAuthenticated()) {
      $state.transitionTo('login');
      event.preventDefault();
    }
  });
  masterService.init();
}
