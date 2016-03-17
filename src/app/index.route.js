export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

  .state('rfpoverall', {
    url: '/create/overall',
    templateUrl: 'app/rfpoverall/rfpoverall.html',
    controller: 'RFPOverallController',
    controllerAs: 'rfpdetails'
  })

  .state('customer', {
    url: '/customer',
    templateUrl: 'app/customer/customer.html',
    controller: 'CustomerController',
    controllerAs: 'cust'
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

  .state('login', {
    url: '/',
    templateUrl: 'app/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login'
  })

  .state('rfpoutputdetails', {
    url: '/output/:rfpId',
    templateUrl: 'app/rfpoutputdetails/rfpoutputdetails.html',
    controller: 'RFPOutputController',
    controllerAs: 'rfpoutput'
  })


  $urlRouterProvider.otherwise('/');
}
