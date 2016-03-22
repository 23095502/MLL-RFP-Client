export function runBlock($rootScope, $state, authService, masterService) {
  'ngInject';
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

    //console.log('authenticate:' + toState.authenticate);
    //console.log('isAuthenticated():' + authService.isAuthenticated());
    if (toState.authenticate && !authService.isAuthenticated()) {

      $rootScope.returnToState = toState.url;
      $rootScope.returnToStateParams = toParams;

      $state.transitionTo('login');
      event.preventDefault();
    } else {
      masterService.init();
    }
  });

}
