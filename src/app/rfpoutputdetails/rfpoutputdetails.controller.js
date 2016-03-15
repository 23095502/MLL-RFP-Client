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

   //GET From
    this.from_option = [];
    $http({
      method: 'GET',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/gettrans/1'
    }).then((res) => {
      this.from_option = res.data;
    }, (err) => {
      console.error(err);
    });

    this.from = {
      "FROMLOCATION": null,
      "FROMLOCATIONNAME": null
    };

    //GET From


  }
}
