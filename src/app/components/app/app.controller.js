export class AppController {
  constructor(authService) {
    'ngInject';

    this.auth = authService;
  }

  isLoggedin () {
    return this.auth.isAuthenticated();
  }

  loginBody () {

    //console.log('authenticated: ' + this.auth.authenticated);

    if(this.auth.authenticated){
      return 'isloggedin';
    }
  }

  signOutUser(){
    this.auth.signout();
  }

}
