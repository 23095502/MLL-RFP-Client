export class apiService {
  constructor($http) {
    'ngInject';

    this.$http = $http;
    this._baseURL = 'http://59.160.18.222/RFPRest/RFPRestService.svc';

    this._requestTemplate = {
      method: '',
      url: '',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {}
    };
  }

  get(url) {
    this._requestTemplate.method = 'GET';
    this._requestTemplate.url = `${this._baseURL}/${url}`;
    return this.$http(this._requestTemplate);
  }

  post(url, data) {
    this._requestTemplate.method = 'POST';
    this._requestTemplate.url = `${this._baseURL}/${url}`;
    this._requestTemplate.data = data;
    return this.$http(this._requestTemplate);
  }
}
