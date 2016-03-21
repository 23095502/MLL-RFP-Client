export class LoginController {
  constructor($state, toaster) {
    'ngInject';
    this.$state = $state;
  }

  gotoDashboard() {
    this.$state.go('dashboard');
  }

  isLogin(){
    return 'loginbody';
  }
}
