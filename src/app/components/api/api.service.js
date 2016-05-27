export class apiService {
  constructor($http) {
    'ngInject';

    this.$http = $http;

    /*Dev*/
    //this._host = 'http://172.32.0.226';
    //this._host = 'http://115.113.135.239';
    /*Dev*/

    /*Test*/
    //this._host = 'http://172.32.0.101';
    //this._host = 'http://59.160.18.222';
    /*Test*/

    /*Live*/
    this._host = 'http://172.32.1.181';
    //this._host = 'http://115.112.53.170';
    /*Live*/

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
    console.log(this._requestTemplate.url);
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
