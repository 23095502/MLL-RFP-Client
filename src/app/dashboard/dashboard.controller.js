export class DashboardController {
  constructor($http, $state, apiService, masterService) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
    this.rfps = [];
    this._api = apiService;
    this._master = masterService;

  }

  init() {

    this._api.get('getrfplist/getall').then((res) => {
      var rfps = res.data;
      console.log(rfps);
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
    this.$state.go('output', {
      rfpId: id
    });
  }

  createRFP() {
    this.$state.go('overall');
  }

}
