export class authService {
  constructor($q, $state, apiService, $window) {
    'ngInject';
    this.$q = $q;
    this.$state = $state;
    this._api = apiService;
    this.$window = $window;
    this.userInfo = {};
    this.authenticated = false;
    this.authFailedMsg = '';
  }

  login(username, password) {
    var deferred = this.$q.defer();

    this._api.get(`login/${username}/${password}`).then((result) => {

      if (result.data.length > 0) {
        this.authenticated = true;
        this.userInfo = result.data[0];
        //this.$window.sessionStorage.userInfo = JSON.stringify(this.userInfo);
        this.$window.sessionStorage.userInfo = angular.toJson(this.userInfo);
        deferred.resolve(this.userInfo);
      }
      else {
        this.authFailedMsg = 'Username or Password is incorrect.';
      }

    }, (error) => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  getUserInfo() {
    return this.userInfo;
  }

  isAuthenticated() {

    //console.log(this.$window.sessionStorage.userInfo);
    if (this.$window.sessionStorage.userInfo != undefined && this.$window.sessionStorage.userInfo != '') {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }

    return this.authenticated;
  }

  signout() {
    this.authenticated = false;
    this.$window.sessionStorage.userInfo = '';
    this.$state.go('login');
  }
}
