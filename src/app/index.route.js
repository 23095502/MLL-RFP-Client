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
    url: '/create/overall',
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
    url: '/create/lanes/:rfpid',
    templateUrl: 'app/rfpdetails/rfpdetails.html',
    controller: 'RFPDetailsController',
    controllerAs: 'rfplanes'
  })

  .state('rfpdashboard', {
    url: '/dashboard',
    templateUrl: 'app/rfpdashboard/rfpdashboard.html',
    controller: 'RFPDashboardController',
    controllerAs: 'rfpdash'
  })

  .state('rfpoutputdetails', {
    url: '/output/:rfpId',
    templateUrl: 'app/rfpoutputdetails/rfpoutputdetails.html',
    controller: 'RFPOutputController',
    controllerAs: 'rfpoutput'
  })


  $urlRouterProvider.otherwise('/');
}
