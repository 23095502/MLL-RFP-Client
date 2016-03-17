export function config ($logProvider, toastrConfig, $httpProvider) {
  'ngInject';
  // Enable log
  $logProvider.debugEnabled(true);

  // http://stackoverflow.com/questions/33660712/angularjs-post-fails-response-for-preflight-has-invalid-http-status-code-404
  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  // Set options third-party lib
  toastrConfig.allowHtml = true;
  toastrConfig.timeOut = 3000;
  toastrConfig.positionClass = 'toast-top-right';
  toastrConfig.preventDuplicates = true;
  toastrConfig.progressBar = true;
}
