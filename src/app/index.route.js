export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

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
    url: '/create/lanes/:rfpid/:iswarehousing',
    templateUrl: 'app/rfpdetails/rfpdetails.html',
    controller: 'RFPDetailsController',
    controllerAs: 'rfplanes'
  })

  .state('dashboard', {
    url: '/dashboard',
    templateUrl: 'app/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dash'
  })

  .state('rfplogin', {
    url: '/',
    templateUrl: 'app/rfplogin/rfplogin.html',
    controller: 'RFPLoginControler',
    controllerAs: 'rfplogin'
  })

  .state('rfpoutputdetails', {
    url: '/output/:rfpId',
    templateUrl: 'app/rfpoutputdetails/rfpoutputdetails.html',
    controller: 'RFPOutputController',
    controllerAs: 'rfpoutput'
  })


  $urlRouterProvider.otherwise('/');
}
