export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('rfpoverall', {
      url: '/rfpoverall',
      templateUrl: 'app/rfpoverall/rfpoverall.html',
      controller: 'RFPOverallController',
      controllerAs: 'rfpdetails'
    })
    .state('rfpdetails', {
      url: '/rfpdetails',
      templateUrl: 'app/rfpdetails/rfpdetails.html',
      controller: 'RFPDetailsController',
      controllerAs: 'rfp'
    });

  $urlRouterProvider.otherwise('/');
}
