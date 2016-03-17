export function runBlock ($log, masterService) {
  'ngInject';
  $log.debug('runBlock end');
  masterService.init();
}
