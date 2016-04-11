export class LoginController {
  constructor($state, $rootScope, authService, toaster) {
    'ngInject';
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.auth = authService;
    this.toaster = toaster;
    toaster.info('Hi');
  }

  authenticate() {

    this.auth.login(this.username, this.password).then((res) => {

      if (!!res) {
        if (this.$rootScope.returnToState === '/create/overall') {
          this.$state.transitionTo('overall');
        }
        else if (this.$rootScope.returnToState === '/create/lanes/:rfpid/:iswarehousing') {
          this.$state.go('lanes', {
            rfpid: this.$rootScope.returnToStateParams.rfpid,
            iswarehousing: this.$rootScope.returnToStateParams.iswarehousing
          });
        }
        else if (this.$rootScope.returnToState === '/output/:rfpId') {
          this.$state.go('output', {
            rfpid: this.$rootScope.returnToStateParams.rfpid
          });
        }
        else {
          this.$state.transitionTo('dashboard');
        }
      }
    });
  }

  resetMsg(){
      this.auth.authFailedMsg = '';
  }

  // isLogin() {
  //   return 'loginbody';
  // }
}
