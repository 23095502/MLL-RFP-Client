export class RFPDashboardController {
  constructor($http, $state) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;

    $http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/getrfplist/getall')
      .then((res) => {
        this.dashboarddata = res.data;


      }, (err) => {
        console.error(err);
      });



    this.dashboarddata = []

  }

  click() {
     this.$state.go("rfpoverall");
  }

  CreateRFP(){
     this.$state.go("rfpoverall");
  }
}
