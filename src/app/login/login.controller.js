export class LoginController {
  constructor($state, toaster) {
    'ngInject';
    this.$state = $state;
   // toaster.info('Hi');
   // console.log(toaster);

  }

  gotoDashboard() {
    this.$state.go('dashboard');
  }

  isLogin(){
    return 'loginbody';
  }
}
