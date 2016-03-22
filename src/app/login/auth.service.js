export class authService {
  constructor($q, apiService, $window) {
    'ngInject';
    this.$q = $q;
    this._api = apiService;
    this.$window = $window;
    this.userInfo = {};
    this.authenticated = false;
  }

  login(username, password) {
    var deferred = this.$q.defer();

    this._api.get(`login/${username}/${password}`).then((result) => {
      //console.log('Name: ' + username);
      //console.log(username);
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
}
