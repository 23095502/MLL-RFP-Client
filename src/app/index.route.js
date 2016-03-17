export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

  .state('overall', {
    url: '/create/overall',
    templateUrl: 'app/overall/overall.html',
    controller: 'OverallController',
    controllerAs: 'overall'
  })

  .state('customer', {
    url: '/customer',
    templateUrl: 'app/customer/customer.html',
    controller: 'CustomerController',
    controllerAs: 'cust'
  })

  .state('lanes', {
    url: '/create/lanes/:rfpid/:iswarehousing',
    templateUrl: 'app/lanes/lanes.html',
    controller: 'LanesController',
    controllerAs: 'lane'
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

  .state('output', {
    url: '/output/:rfpId',
    templateUrl: 'app/output/output.html',
    controller: 'OutputController',
    controllerAs: 'output'
  })


  $urlRouterProvider.otherwise('/');
}
