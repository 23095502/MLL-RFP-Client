export class LoginController {
  constructor($state, toaster) {
    'ngInject';
    this.$state = $state;
    this.toaster('hi');
  }

  gotoDashboard() {
    this.$state.go('dashboard');
  }

  isLogin(){
    return 'loginbody';
  }
}
