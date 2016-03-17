export class RFPDashboardController {
  constructor($http, $state, apiService) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
    this.dashboarddata = [];

    apiService.get('getrfplist/getall').then((res) => {
      var data = res.data;
      data = _.map(data, (row) => {
        row.RFPDATE = new Date(row.RFPDATE);
        row.DUEDATE = new Date(row.DUEDATE);
        return row;
      })
      this.dashboarddata = data;
    }, (err) => {
      console.error(err);
    });
  }

  click(id) {
    this.$state.go('rfpoutputdetails', {
      rfpId: id
    });
  }

  CreateRFP() {
    this.$state.go("rfpoverall");
  }
}
