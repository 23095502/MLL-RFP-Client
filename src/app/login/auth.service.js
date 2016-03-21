export class authService {
  constructor($q, apiService, $window) {
    'ngInject';
    this.$q = $q;
    this._api = apiService;
    this.$window = $window;
    this.userInfo = {};
    this.authenticated = true;
  }

  login() {
    var deferred = this.$q.defer();

    console.log('login');

    this._api.get('login/ADMIN/pass,123').then(function (result) {
      console.log(result);
      this.userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      this.$window.sessionStorage.userInfo = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    }, function (error) {
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
