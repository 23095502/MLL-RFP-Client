export class RFPOutputController {
  constructor($http, $stateParams) {
    'ngInject';

    $http.get(`http://59.160.18.222/RFPRest/RFPRestService.svc/gettrans/${$stateParams.rfpId}`)
      .then((res) => {
        this.outputdata = res.data;
        this.nameoutputdata = this.outputdata[0];
        this.fromLocationOptions = _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
        this.vehicleTypeOptions = _.uniqBy(this.outputdata, 'VEHICLETYPENAME');
      }, (err) => {
        console.error(err);
      });

    this.outputdata = [];
    this.filterOption;

    this.$http = $http;

  }

  ClearFilter(){
      this.filterOption = undefined;
  }
}
