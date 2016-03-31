export class MarketRateController {
  constructor($state, $stateParams, $timeout, Upload, masterService, apiService, toaster, $filter, $http) {
    'ngInject';

    this.$http = $http;
    this._api = apiService;
    this.toaster = toaster;
    this.$filter = $filter;

    this.statename_option = [];
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
        "VehicleType1": '',
        "Rate1": 0,
        "VehicleType2": '',
        "Rate2": 0,
        "VehicleType3": '',
        "Rate3": 0,
        "VehicleType4": '',
        "Rate4": 0,
        "VehicleType5": '',
        "Rate5": 0,
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
        "VehicleType": '',
        "Rate": 0,
        "VehicleType1": this.marketrate.VehicleType1,
        "Rate1": this.marketrate.Rate1,
        "VehicleType2": this.marketrate.VehicleType2,
        "Rate2": this.marketrate.Rate2,
        "VehicleType3": this.marketrate.VehicleType3,
        "Rate3": this.marketrate.Rate3,
        "VehicleType4": this.marketrate.VehicleType4,
        "Rate4": this.marketrate.Rate4,
        "VehicleType5": this.marketrate.VehicleType5,
        "Rate5": this.marketrate.Rate5,
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
    //client.open('POST', `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/marketrate/mrate/1`, false);
    client.open('POST', `http://localhost:64760/RFPROUTE/RFPImportRoute.svc/marketrate/mrate/1`, false);
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

  exportMarketRate() {
    this._api.get(`expmarketrate`)
        .then((res) => {
          // window.open(res.data);
          console.log(res.data);
           },
              (err) => { console.error(err); });
  }


}

