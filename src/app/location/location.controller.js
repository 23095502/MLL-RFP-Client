export class LocationController {
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


  }

  uploadLoc(fileloc) {
    this.loading = false;

    this.uploadProgress(fileloc, fileloc.size);
    var client = new XMLHttpRequest();
    client.open(
      'POST',
      `http://localhost:59406/RFPImport/RFPImportRoute.svc/locupload/locupload/1`,
      false);
    client.setRequestHeader("Content-Type", "multipart/form-data");
    client.onreadystatechange =
      () => {

        console.log("rdystate: " + client.readyState + " status: " +
          client.status + " Text: " + client.statusText);
        if (client.readyState == 4 && client.status == 200) {
          var response = angular.fromJson(client.responseText);
          console.log(response);
          if (response.ErrorMessage != '') {
            this.er = response.ErrorMessage;
            alert(`${response.ErrorMessage}`);
          } else {
            this.suc = response.SuccessMessage;
            alert(`${response.SuccessMessage}`);
          }
          this.loading = true;
        }
      }

    client.send(fileloc);
  }

  uploadProgress(fName, fSize) {
    this.progressPercentage = Math.min(100, parseInt(100.0 * 677964 / fSize));
  }

}
