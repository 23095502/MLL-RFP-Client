export class LoginController {
  constructor($state, authService) {
    'ngInject';
    this.$state = $state;
    this.auth = authService;

  }

  authenticate() {
    this.auth.login(this.username, this.password).then((r)=>{
      //console.log(r);
    });
    //this.$state.go('dashboard');
  }

  isLogin(){
    return 'loginbody';
  }
}
