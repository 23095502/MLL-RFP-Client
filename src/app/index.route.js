export function routerConfig($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider

    .state('overall', {
      url: '/create/overall',
      templateUrl: 'app/overall/overall.html',
      controller: 'OverallController',
      controllerAs: 'overall',
      authenticate: true
    })
    .state('customer', {
      url: '/customer',
      templateUrl: 'app/customer/customer.html',
      controller: 'CustomerController',
      controllerAs: 'cust',
      authenticate: true
    })
    .state('lanes', {
      url: '/create/lanes/:rfpid/:iswarehousing',
      templateUrl: 'app/lanes/lanes.html',
      controller: 'LanesController',
      controllerAs: 'lane',
      authenticate: true
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: 'app/dashboard/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dash',
      authenticate: true
    })
    .state('login', {
      url: '/',
      templateUrl: 'app/login/login.html',
      controller: 'LoginController',
      controllerAs: 'login',
      authenticate: false
    })
    .state('output', {
      url: '/output/:rfpId',
      templateUrl: 'app/output/output.html',
      controller: 'OutputController',
      controllerAs: 'output',
      authenticate: true
    })

    .state('marketrate', {
      url: '/marketrate',
      templateUrl: 'app/marketrate/marketrate.html',
      controller: 'MarketRateController',
      controllerAs: 'marketrate',
      authenticate: true
    });

  $urlRouterProvider.otherwise('/');
}
