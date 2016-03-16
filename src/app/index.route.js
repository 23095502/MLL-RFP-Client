export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/rfpdashboard/rfpdashboard.html',
      controller: 'RFPDashboardController',
      controllerAs: 'rfpdash'
    })

  .state('rfpoverall', {
    url: '/rfpoverall',
    templateUrl: 'app/rfpoverall/rfpoverall.html',
    controller: 'RFPOverallController',
    controllerAs: 'rfpdetails'
  })

  .state('rfpcustomer', {
    url: '/rfpcustomer',
    templateUrl: 'app/rfpcustomer/rfpcustomer.html',
    controller: 'RFPCustomerController',
    controllerAs: 'rfpcustomermaster'
  })

  .state('rfpdetails', {
    url: '/rfpdetails/:rfpid/:iswarehousing',
    templateUrl: 'app/rfpdetails/rfpdetails.html',
    controller: 'RFPDetailsController',
    controllerAs: 'rfplanes'
  })

  .state('rfpdashboard', {
    url: '/rfpdashboard',
    templateUrl: 'app/rfpdashboard/rfpdashboard.html',
    controller: 'RFPDashboardController',
    controllerAs: 'rfpdash'
  })

  .state('rfpoutputdetails', {
    url: '/rfpoutputdetails/:rfpId',
    templateUrl: 'app/rfpoutputdetails/rfpoutputdetails.html',
    controller: 'RFPOutputController',
    controllerAs: 'rfpoutput'
  })


  $urlRouterProvider.otherwise('/');
}
