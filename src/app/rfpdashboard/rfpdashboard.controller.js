export class RFPDashboardController {
  constructor($http, $state) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;

    $http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/getrfplist/getall')
      .then((res) => {
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



    this.dashboarddata = []

  }

  click(id) {
     this.$state.go('rfpoutputdetails',{rfpId:id});
  }

  CreateRFP(){
     this.$state.go("rfpoverall");
  }
}
