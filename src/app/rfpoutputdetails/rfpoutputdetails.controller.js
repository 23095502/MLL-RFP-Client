export class RFPOutputController {
  constructor($http, $stateParams) {
    'ngInject';

    $http.get(`http://59.160.18.222/RFPRest/RFPRestService.svc/gettrans/${$stateParams.rfpId}`)
      .then((res) => {
        this.outputdata = res.data;
        this.nameoutputdata = res.data[0];
      }, (err) => {
        console.error(err);
      });

    this.outputdata = []
    this.$http = $http;

    this.outputdata = {
      "FROMLOCATIONNAME": null,
      "FROMSTATE": null
    };


  }
}
