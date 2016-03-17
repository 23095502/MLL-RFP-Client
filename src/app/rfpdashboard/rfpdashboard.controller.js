export class RFPDashboardController {
  constructor($http, $state, apiService) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
    this.dashboarddata = [];

    apiService.get('getrfplist/getall').then((res) => {
      this.dashboarddata = res.data;
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
