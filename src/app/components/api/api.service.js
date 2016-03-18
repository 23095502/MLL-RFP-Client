export class apiService {
  constructor($http) {
    'ngInject';

    this.$http = $http;
    this._host = 'http://59.160.18.222';
    this._baseURL = `${this._host}/RFPRest/RFPRestService.svc`;

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

  post(url, data, isFullURL) {
    this._requestTemplate.method = 'POST';
    this._requestTemplate.url = isFullURL ? url : `${this._baseURL}/${url}`;
    this._requestTemplate.data = data;
    return this.$http(this._requestTemplate);
  }

  getHost() {
    return this._host;
  }
}