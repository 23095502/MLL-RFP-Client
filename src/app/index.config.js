export function config ($logProvider, $httpProvider, toasterConfig) {
  'ngInject';

  $logProvider.debugEnabled(true);
  toasterConfig.timeout = 3000;

  // http://stackoverflow.com/questions/33660712/angularjs-post-fails-response-for-preflight-has-invalid-http-status-code-404
  /*$httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};*/

}
