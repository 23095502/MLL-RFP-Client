export class DashboardController {
  constructor($http, $state, apiService) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
    this.rfps = [];

    apiService.get('getrfplist/getall').then((res) => {
      var rfps = res.data;
      rfps = _.map(rfps, (rfp) => {
        rfp.RFPDATE = new Date(rfp.RFPDATE);
        rfp.DUEDATE = new Date(rfp.DUEDATE);
        return rfp;
      })
      this.rfps = rfps;
    }, (err) => {
      console.error(err);
    });
  }

  click(id) {
    this.$state.go('rfpoutputdetails', {
      rfpId: id
    });
  }

  createRFP() {
    this.$state.go("rfpoverall");
  }
}
