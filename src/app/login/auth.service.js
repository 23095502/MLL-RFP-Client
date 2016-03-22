export class authService {
  constructor($q, $state, apiService, $window) {
    'ngInject';
    this.$q = $q;
    this.$state = $state;
    this._api = apiService;
    this.$window = $window;
    this.userInfo = {};
    this.authenticated = false;
  }

  login(username, password) {
    var deferred = this.$q.defer();

    this._api.get(`login/${username}/${password}`).then((result) => {
      this.authenticated = true;
      this.userInfo = result.data[0];
      this.$window.sessionStorage.userInfo = JSON.stringify(this.userInfo);
      //console.log(this.$window.sessionStorage.userInfo);
      deferred.resolve(this.userInfo);

    }, (error)=> {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  getUserInfo() {
    return this.userInfo;
  }

  isAuthenticated() {

    //console.log(this.$window.sessionStorage.userInfo.length);
    if(this.$window.sessionStorage.userInfo.length > 0) {
      return true;
    } else {
      return false;
    }

    //return this.authenticated;
  }

  signout() {
    this.authenticated = false;
    this.$window.sessionStorage.userInfo = null;
    this.$state.go('login');
  }
}
