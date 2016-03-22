export class LoginController {
  constructor($state, $rootScope, authService, toaster) {
    'ngInject';
    this.$state = $state;
    this.$rootScope = $rootScope;
    this.auth = authService;
  }

  authenticate() {
    this.auth.login(this.username, this.password).then((res) => {
      //console.log(!!res);
      if (!!res) {

        console.log(this.$rootScope.returnToState);
        console.log(this.$rootScope.returnToStateParams);

        if (this.$rootScope.returnToState === '/create/overall') {
          this.$state.transitionTo('overall');
        } else if (this.$rootScope.returnToState === '/create/lanes/:rfpid/:iswarehousing') {

          this.$state.go('lanes', {
            rfpid: this.$rootScope.returnToStateParams.rfpid,
            iswarehousing: this.$rootScope.returnToStateParams.iswarehousing
          });

        } else if (this.$rootScope.returnToState === '/output/:rfpId') {

          this.$state.go('output', {
            rfpid: this.$rootScope.returnToStateParams.rfpid
          });

        } else {
          this.$state.transitionTo('dashboard');
        }

      }
    });
    //this.$state.go('dashboard');
  }

  isLogin() {
    return 'loginbody';
  }
}
