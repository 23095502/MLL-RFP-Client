export class RFPDashboardController {
  constructor ($http) {
    'ngInject';
this.$http = $http;

     $http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/getrfpbyrfpid/2')
      .then((res) => {
        this.dashboarddata = res.data;
        console.table(this.dashboarddata)

      }, (err) => {
        console.error(err);
      });



    this.dashboarddata = []

  }
}
