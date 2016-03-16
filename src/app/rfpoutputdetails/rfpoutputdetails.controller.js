export class RFPOutputController {
  constructor($http, $stateParams) {
    'ngInject';

    $http.get(`http://59.160.18.222/RFPRest/RFPRestService.svc/gettrans/${$stateParams.rfpId}`)
      .then((res) => {
        this.outputdata = res.data;
        this.nameoutputdata = this.outputdata[0];
        this.fromLocationOptions = _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
        this.routesGroupByLocation = _.groupBy(this.outputdata, 'FROMLOCATIONNAME');

        _.each(this.routesGroupByLocation, (objectlist, key) => {
          this.routesGroupByLocation[key] = _.uniqBy(objectlist, 'VEHICLETYPENAME');

        });



        this.filterOption = {
          FROMLOCATIONNAME: this.fromLocationOptions[0].FROMLOCATIONNAME,
          VEHICLETYPENAME: this.fromLocationOptions[0].VEHICLETYPENAME
        };


        this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];

      }, (err) => {
        console.error(err);
      });

    this.outputdata = [];
    this.$http = $http;

  }

  changeLocation() {
    this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];
    this.filterOption.VEHICLETYPENAME = this.vehicleTypeOptions[0].VEHICLETYPENAME;
  }
}
