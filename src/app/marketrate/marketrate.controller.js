export class MarketRateController {
  constructor($state, $stateParams, $timeout, Upload, masterService, apiService, toaster, $filter) {
    'ngInject';

    this.routes = [];
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.statename_option = [];
    this._api = apiService;
    this.$state = $state;
    this.toaster = toaster;
    this.$filter = $filter;

    this.locationname_option = [];
    this.vehicletype = {
      "VEHICLETYPEID": null,
      "VEHICLETYPENAME": null
    };
    this.location = {
      "LOCATIONID": null,
      "LOCATIONNAME": null
    };

    this.state = {
      "STATEID": null,
      "STATENAME": null,
      "STATECODE": null
    };

    this.locationname_option = masterService.getLocations();
    this.statename_option = masterService.getStates();
    this.vehicletypename_option = masterService.getVehicleTypes();

    this.add();
  }


  add() {
    this.marketrate = {
        "OriginCity": '',
        "OriginState": '',
        "DestinationCity": '',
        "DestinationState": '',
        "VehicleType": '',
        "Rate": 0,
        "CreatedBy": 1,
        "RateDate" : new Date()
    }

  }

  map(id, list, idMatcher, nameKey) {
    if (_.isInteger(id) && list.length > 0) {
      return _.filter(list, (item) => (item[idMatcher] === id))[0][nameKey];
    } else {
      return '-';
    }
  }

// for submit data ...
  addMarketRate() {
    var marketRateData = {
      "marketrate": {
        "OriginCity": this.marketrate.OriginCity,
        "OriginState": this.marketrate.OriginState,
        "DestinationCity": this.marketrate.DestinationCity,
        "DestinationState": this.marketrate.DestinationState,
        "VehicleType": this.marketrate.VehicleType,
        "Rate": this.marketrate.Rate,
        "CreatedBy": 1,
        "RateDate" : this.$filter('date')(new Date(this.marketrate.RateDate), 'yyyy-MM-dd 00:00:00')
      }
    };

    //console.log('Hi');
    console.log(marketRateData);

    this._api.post('marketrate', marketRateData).then((response) => {
       console.log(response);
      this.toaster.success('Market Rate saved successfully');
      this.add();
    }, (error) => {
      console.log(error);
      // this.toaster.error(`${error.status} : ${error.statusText}`);
    });
  }

  //import file market rate

  uploadBlobOrFile(blobOrFile) {

    console.log(blobOrFile.length);
    var client = new XMLHttpRequest();
    client.open('POST', `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/marketrate/mrate/1`, false);
    //client.open('POST', `http://localhost:52019/RFPImport/RFPImportRoute.svc/baquote/${this.$stateParams.rfpId}/baquote/1}`, false);
    //client.setRequestHeader('Content-length', blobOrFile.length);
    client.setRequestHeader("Content-Type", "multipart/form-data");

    /* Check the response status */
    client.onreadystatechange = () => {
      console.log("rdystate: " + client.readyState + " status: " + client.status + " Text: " + client.statusText);
      if (client.readyState == 4 && client.status == 200) {
        console.log(client.responseText);
        //===========================
         // this.getMarketRateData();
        //===========================
        $('#myModalBrowse').modal('hide');
      }
    }

    //this.toaster.success('Lanes saved successfully');
    /* Send to server */
    client.send(blobOrFile);

  }

  /*getMarketRateData(){

  }*/

}

