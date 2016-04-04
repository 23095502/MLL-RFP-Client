export class OutputController {
  constructor($stateParams, $state, apiService, toaster, Upload, $timeout) {
    'ngInject';

    this.$stateParams = $stateParams;
    this.$timeout = $timeout;
    this._api = apiService;
    this.gridData = [];
    this.outputdata = [];
    this.toaster = toaster;
    this.Upload =  Upload;

    this.inproxiparam =
    {
      "ORIGIN" : '',
      "ORIGINSTATE" : '',
      "DESTINATION" : '',
      "DESTINATIONSTATE" : '',
      "VEHICLETYPE" : '',
      "DISTANCE" : 0,
      "NOOFTRIPS" : 0
    }

    this.apptrans =
    {
      "RFPID" : 1,
      "BANAME" : "IVC",
      "APPROVEDAMOUNT" : 5000,
      "FROMLOCATIONID" : 1,
      "TOLOCATIONID" : 2,
      "FROMSTATEID" : 20,
      "TOSTATEID" : 10,
      "VEHICLETYPEID" : 2,
      "ACTIVE" : "A",
      "CREATEDBY" : "1",
      "CREATEDON" : "2016-01-01 00:00:00"
    }

    this.urlMaps = {
      'contract' :
          `${this._api.getHost()}/bacontract/Service.svc/getproximitybadata`,
      'backhaul' : `${this._api.getHost()}/bacontract/Service.svc/dvprdata`,
      'rfphistory' :
          `${this._api.getHost()}/RFPRest/RFPRestService.svc/rfphistory`,
      'cleansheet' : ''
    };

    this.responseKeys = {
      'CONTRACTRATE' : 'getproximitybadataResult',
      'PVSRFPRATE' : 'rfphistoryResult',
      'NOOFTRIPS' : 'dvprdataResult'
    };

    this.getTransactionData();
  }

  getTransactionData() {

    this._api.get(`gettrans/${this.$stateParams.rfpId}`)
        .then((res) => {
          this.outputdata = res.data;
          // this.outputdata.selectedOption = $scope.options[1];
          var newOutputData =
              _.each(this.outputdata,
                     (key, value) => {
                       var L1RATE = this.outputdata[value].L1RATE;
                       L1RATE = Math.round(L1RATE / 1000 * 100) / 100;
                       this.outputdata[value].L1RATE = L1RATE;

                       var L2RATE = this.outputdata[value].L2RATE;
                       L2RATE = Math.round(L2RATE / 1000 * 100) / 100;
                       this.outputdata[value].L2RATE = L2RATE;

                       var L3RATE = this.outputdata[value].L3RATE;
                       L3RATE = Math.round(L3RATE / 1000 * 100) / 100;
                       this.outputdata[value].L3RATE = L3RATE;

                       var L4RATE = this.outputdata[value].L4RATE;
                       L4RATE = Math.round(L4RATE / 1000 * 100) / 100;
                       this.outputdata[value].L4RATE = L4RATE;

                       var L5RATE = this.outputdata[value].L5RATE;
                       L5RATE = Math.round(L5RATE / 1000 * 100) / 100;
                       this.outputdata[value].L5RATE = L5RATE;

                       var APPROVEDAMOUNT =
                           this.outputdata[value].APPROVEDAMOUNT;
                       APPROVEDAMOUNT =
                           Math.round(APPROVEDAMOUNT / 1000 * 100) / 100;
                       this.outputdata[value].APPROVEDAMOUNT = APPROVEDAMOUNT;

                     })

                  if (this.outputdata[0].OPPRDOMAIN == 'Inbound') {
            // this.nameoutputdata = this.outputdata[0];
            this.LOCATIONNAME = this.outputdata.TOLOCATIONNAME;
            this.nameoutputdata = newOutputData[0];
            this.fromLocationOptions =
                _.uniqBy(this.outputdata, 'TOLOCATIONNAME');
            this.routesGroupByLocation =
                _.groupBy(this.outputdata, 'TOLOCATIONNAME');

            _.each(this.routesGroupByLocation, (vehiclelist, key) => {
              this.routesGroupByLocation[key] =
                  _.uniqBy(vehiclelist, 'VEHICLETYPENAME');
            });

            this.filterOption = {
              FROMLOCATIONNAME : this.fromLocationOptions[0].TOLOCATIONNAME,
              VEHICLETYPENAME : this.fromLocationOptions[0].VEHICLETYPENAME
            };

            this.vehicleTypeOptions =
                this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];
          }

          else {

            // this.nameoutputdata = this.outputdata[0];
            this.nameoutputdata = newOutputData[0];
            this.fromLocationOptions =
                _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
            this.routesGroupByLocation =
                _.groupBy(this.outputdata, 'FROMLOCATIONNAME');

            _.each(this.routesGroupByLocation, (vehiclelist, key) => {
              this.routesGroupByLocation[key] =
                  _.uniqBy(vehiclelist, 'VEHICLETYPENAME');
            });

            this.filterOption = {
              FROMLOCATIONNAME : this.fromLocationOptions[0].FROMLOCATIONNAME,
              VEHICLETYPENAME : this.fromLocationOptions[0].VEHICLETYPENAME
            };

            this.vehicleTypeOptions =
                this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];
          }

          // console.log(this.outputdata);

        }, (err) => { console.error(err); });
  }

  ClearFilter() { this.filterOption = undefined; }

  getArray() {
    return _.map(
        this.outputdata,
        (v) => (_.pick(
            v, [ 'CUSTOMERNAME', 'CASHACCOUNTID', 'FROMLOCATIONNAME' ])));
  }

  showModal(colname, table, clickedColName, headerColName, modalHeaderName) {

    this.selectedLane = table;
    this.rowClickedColName = clickedColName;

    this.inproxiparam.ORIGIN = this.filterOption.FROMLOCATIONNAME;

    if (this.outputdata[0].OPPRDOMAIN == 'Inbound') {
      this.inproxiparam.DESTINATION = table.FROMLOCATIONNAME;
      this.inproxiparam.DESTINATIONSTATE = table.FROMSTATE;
      this.inproxiparam.ORIGINSTATE = table.TOSTATE;

      var sourcecityid = table.TOLOCATION;
      var destcityid = table.FROMLOCATION;
      var sourcestateid = table.TOSTATEID;
      var deststateid = table.FROMSTATEID;
      var vehtypeid = table.VEHICLETYPEID;

    } else {

      var sourcecityid = table.FROMLOCATION;
      var destcityid = table.TOLOCATION;
      var sourcestateid = table.FROMSTATEID;
      var deststateid = table.TOSTATEID;
      var vehtypeid = table.VEHICLETYPEID;

      this.inproxiparam.ORIGINSTATE = table.FROMSTATE;
      this.inproxiparam.DESTINATION = table.TOLOCATIONNAME;
      this.inproxiparam.DESTINATIONSTATE = table.TOSTATE;
    }

    this.inproxiparam.VEHICLETYPE = this.filterOption.VEHICLETYPENAME;
    this.inproxiparam.DISTANCE = table.PROXIDISTANCE;
    this.inproxiparam.NOOFTRIPS = table.NOOFTRIPS;

    this.gridData = [];
    var newfilterRoutes = {inproxiparam : this.inproxiparam};



    if (this.outputdata[0].OPPRDOMAIN == 'Inbound') {
      this.TOLOCATIONNAME = table.FROMLOCATIONNAME;
    } else {
      this.TOLOCATIONNAME = table.TOLOCATIONNAME;
      // this.TOLOCATIONNAME = this.filterOption.FROMLOCATIONNAME;
    }
    this.CONTRACTRATE = table[clickedColName];
    this.colName = headerColName;
    this.modalHeaderName = modalHeaderName;


    if(headerColName == 'Market Rate')
    {
    this._api.get(`toptenmarketrates/${sourcecityid}/${sourcestateid}/${destcityid}/${deststateid}/${vehtypeid}`)
        .then((res) => {
          this.marketData = res.data.toptenmarketratesResult;
          //console.log(this.marketData);
        }, (err) => { console.error(err); });
    }
    else {

      this._api.post(this.urlMaps[colname], newfilterRoutes, true)
          .then((res) => {
            this.gridData = res.data[this.responseKeys[clickedColName]];
            //console.log(this.gridData);
          }, (err) => { console.error(err); });

    }

    if (clickedColName == 'NOOFTRIPS') {
      $('#myModalOutputDetailsForBackHaul').modal();
    } else if (clickedColName == 'PVSRFPRATE') {
      $('#myModalOutputDetailsForRFP').modal();
    }
    else if(clickedColName == 'MARKETRATE'){
      $('#myModalOutputDetailsForMarket').modal();
    }
    else {
      $('#myModalOutputDetails').modal();
    }
  }

  submit() {

    var revisedOutput = _.chain(this.outputdata)
                            .map((output) => {

                              output.L1RATE = output.L1RATE * 1000;
                              output.L2RATE = output.L2RATE * 1000;
                              output.L3RATE = output.L3RATE * 1000;
                              output.L4RATE = output.L4RATE * 1000;
                              output.L5RATE = output.L5RATE * 1000;
                              output.APPROVEDAMOUNT = output.APPROVEDAMOUNT * 1000;
                              output.MODE = 'APIRATE';
                              output.CREATEDBY = 1;
                              output.CREATEDON = '2016-03-01';
                              delete output.$$hashKey;
                              delete output.ADDRESS;
                              delete output.AVERAGELOAD;
                              delete output.BACKHAUL;
                              delete output.BAQUOTE;
                              delete output.BACKHAULPERCENT;
                              delete output.CASHACCOUNTID;
                              delete output.CONTACTNO;
                              delete output.CONTACTPERSON;
                              delete output.CUSTOMERNAME;
                              delete output.CUSTTARGETRATE;
                              delete output.DISTANCE;
                              delete output.FREQUENCY;
                              delete output.FROMLOCATIONNAME;
                              delete output.FROMSTATE;
                              delete output.FROMSTATECODE;
                              delete output.ISLOADUNLOADCHARG;
                              delete output.ISROUNDTRIP;
                              delete output.L1BANAME;
                              delete output.L2BANAME;
                              delete output.L3BANAME;
                              delete output.L4BANAME;
                              delete output.L5BANAME;
                              delete output.LOADINGUNLOADINGTIME;
                              delete output.MHEREQUIREMENT;
                              delete output.MODE;
                              delete output.NOOFTRIPS;
                              delete output.OTHERREQUIREMENT;
                              delete output.PACKAGETYPEID;
                              delete output.PACKAGETYPENAME;
                              delete output.PACKDIMENSION;
                              delete output.PROXIDISTANCE;
                              delete output.RESULT;
                              delete output.RFPDURATION;
                              delete output.RFPVOLUME;
                              delete output.SERVICETYPE;
                              delete output.STACKINGNORMS;
                              delete output.TOLOCATIONNAME;
                              delete output.TOSTATE;
                              delete output.TOSTATECODE;
                              delete output.TOTALSPEND;
                              delete output.VEHICLETYPENAME;
                              return output;
                            })
                            .value();

    var newOutputDetails = {apptrans : revisedOutput};

    console.log(newOutputDetails);

    this._api.post('apptrans', newOutputDetails)
        .then((res) => { this.getTransactionData(); },
              (err) => { console.error(err); });

    this.toaster.success('Changes saved successfully');
  }

  updateContractRate(popupGridData, colName) {

    console.log(popupGridData);

    if(colName == 'MARKET')
    {
      this.CONTRACTRATE = popupGridData.Rate;
      this.selectedLane[this.rowClickedColName] = popupGridData.Rate;
    }
    else {
        this.CONTRACTRATE = popupGridData.FREIGHTRATE;
        this.selectedLane[this.rowClickedColName] = popupGridData.FREIGHTRATE;
    }



    if (colName == 'REGULAR') {
      $('#myModalOutputDetails').modal('hide');
    }
    else if (colName == 'MARKET') {
      $('#myModalOutputDetailsForMarket').modal('hide');
    }
    else if (colName == 'RFP') {
      $('#myModalOutputDetailsForRFP').modal('hide');
    }
    else {
      $('#myModalOutputDetailsForBackHaul').modal('hide');
    }
  }

  changecolor(toMatch, approvedRate, flag) {

    let css = '';

    if(toMatch > 0 && flag === true) {
      css = 'value-available ';
    }

    if (toMatch >= approvedRate) {
      css = css + 'below';
    } else {
      css = css + 'above';
    }

    return css;
  }

  changeLocation() {
    this.vehicleTypeOptions =
        this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];
    this.filterOption.VEHICLETYPENAME =
        this.vehicleTypeOptions[0].VEHICLETYPENAME;
    this.outputdata[0].CLEANSHEETRATE =
        this.outputdata[0].CLEANSHEETRATE / 1000;
  }

  exportNormal() {
    this._api.get(`exportrfpout/${this.$stateParams.rfpId}`)
        .then((res) => { window.open(res.data); },
              (err) => { console.error(err); });
  }

  exportBAQuote() {
    this._api.get(`expbaquote/${this.$stateParams.rfpId}`)
        .then((res) => { window.open(res.data); },
              (err) => { console.error(err); });
  }

  uploadBlobOrFile(blobOrFile) {

    this.uploadProgress(blobOrFile, blobOrFile.size);
    var client = new XMLHttpRequest();
    client.open(
        'POST',
        `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/baquote/${this.$stateParams.rfpId}/baquote/1`,
        false);
    // client.open('POST',
    // `http://localhost:52019/RFPImport/RFPImportRoute.svc/baquote/${this.$stateParams.rfpId}/baquote/1}`,
    // false);
    // client.setRequestHeader('Content-length', blobOrFile.length);
    client.setRequestHeader("Content-Type", "multipart/form-data");
    client.onreadystatechange =
        () => {
          console.log("rdystate: " + client.readyState + " status: " +
                      client.status + " Text: " + client.statusText);
          if (client.readyState == 4 && client.status == 200)
          {
            var response = JSON.parse(client.responseText);

            //console.log(blobOrFile.size);


            if (response.ErrorMessage != '') {
              this.er = response.ErrorMessage;
              //console.log(`ErrorMessage: ${response.ErrorMessage}`);
              alert(`${response.ErrorMessage}`);
            } else {
              this.suc = response.SuccessMessage;
              //console.log(`SuccessMessage: ${response.SuccessMessage}`);
              alert(`${response.SuccessMessage}`);
            }
            //console.log(`NoOfRecordsUpdated: ${response.NoOfRecordsUpdated}`);

            this.getTransactionData();
            $('#myModalBrowse').modal('hide');
          }
        }
        // this.toaster.success('Lanes saved successfully');

        client.send(blobOrFile);
  }

  /*
  uploadBlobOrFile(blobOrFile){
        this.f = blobOrFile;
        if (blobOrFile) {
            blobOrFile.upload = this.Upload.upload({
              //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
              url: `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/baquote/${this.$stateParams.rfpId}/baquote/1`,
              data: {file: blobOrFile}
            });

            blobOrFile.upload.then(function (response) {
                blobOrFile.result = response.data;
                er = blobOrFile.result.ErrorMessage;
                console.log(blobOrFile.result);
            }, function (response) {
                if (response.status > 0)
                    var errorMsg = response.status + ': ' + response.data;
            }, function (evt) {
                blobOrFile.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
        /*
    this.uploadProgress(blobOrFile, blobOrFile.size);
    var client = new XMLHttpRequest();
    client.open(
        'POST',
        `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/baquote/${this.$stateParams.rfpId}/baquote/1`,
        false);
    client.setRequestHeader("Content-Type", "multipart/form-data");

    client.onreadystatechange =
        () => {

          if (client.readyState == 4 && client.status == 200)
          {
            var response = JSON.parse(client.responseText);
            if (response.ErrorMessage != '') {
              this.er = response.ErrorMessage;
            } else {
              this.suc = response.SuccessMessage;
            }
            this.getTransactionData();
          }
        }
        client.send(blobOrFile);
        */
        /*
  }
  */

  closeModal() { $('#myModalOutputDetails').modal('hide'); }

  showColumn(colName) {
    if (colName == 'BACKHAULAVL') {
      return true;
    } else {
      return false;
    }
  }

  updateProposedRate(route, key, value) {

    if (key == 'CONTRACTRATE' || key == 'SHIPXRATE' || key == "PVSRFPRATE") {
      route.APPROVEDAMOUNT = route[key] / 1000;
      route.BANAME = '';
    } else {
      route.APPROVEDAMOUNT = route[key];
      route.BANAME = route[value];
    }
  }

  locationFlag() { return TOLOCATIONNAME; }

  uploadProgress(fName, fSize, evt){
      this.progressPercentage = Math.min(100, parseInt(100.0 * 677964 / fSize));
  }
}
