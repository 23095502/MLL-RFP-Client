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
    return this.authenticated;
  }

  signout() {
    this.authenticated = false;
    this.$window.sessionStorage.userInfo = {};
    this.$state.go('login');
  }
}
