export class DashboardController {
  constructor($http, $state, apiService, masterService, toaster) {
    'ngInject';
    this.$http = $http;
    this.$state = $state;
    this.rfps = [];
    this._api = apiService;
    this._master = masterService;
    this.toaster = toaster;
  }

  init() {

    this._api.get('getrfplist/getall').then((res) => {
      var rfps = res.data;
      rfps = _.map(rfps, (rfp) => {
        rfp.RFPDATE = new Date(rfp.RFPDATE);
        rfp.DUEDATE = new Date(rfp.DUEDATE);
        return rfp;

      });
      this.rfps = rfps;
    }, (err) => {
      this.toaster.Error('Error Connection time out');
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
