export class AppController {
  constructor(authService) {
    'ngInject';

    this.auth = authService;
  }

  isLoggedin () {
    return this.auth.isAuthenticated();
  }

  loginBody () {
    if(this.auth.authenticated){
      return 'isloggedin';
    }
  }

  signOutUser(){
    this.auth.signout();
  }

}
