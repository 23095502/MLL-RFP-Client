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

          //console.log(objectlist);
          // console.log(key);
        });



        this.filterOption = {
          FROMLOCATIONNAME: this.fromLocationOptions[0].FROMLOCATIONNAME,
          VEHICLETYPENAME: this.fromLocationOptions[0].VEHICLETYPENAME
        };

        // console.log(this.filterOption.FROMLOCATIONNAME);
        this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];
        // console.log(this.vehicleTypeOptions);
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

  getArray() {
    return _.map(this.outputdata, (v) => (_.pick(v, ['CUSTOMERNAME', 'CASHACCOUNTID', 'FROMLOCATIONNAME'])));
  }
}
