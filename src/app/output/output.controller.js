export class OutputController {
  constructor($stateParams, $state, apiService, toaster) {
    'ngInject';

    this.$stateParams = $stateParams;
    this._api = apiService;
    this.gridData = [];
    this.outputdata = [];
    this.toaster = toaster;

    this.inproxiparam = {
      "ORIGIN": '',
      "ORIGINSTATE": '',
      "DESTINATION": '',
      "DESTINATIONSTATE": '',
      "VEHICLETYPE": '',
      "DISTANCE": 0,
      "NOOFTRIPS": 0
    }

    this.apptrans = {
      "RFPID": 1,
      "BANAME": "IVC",
      "APPROVEDAMOUNT": 5000,
      "FROMLOCATIONID": 1,
      "TOLOCATIONID": 2,
      "FROMSTATEID": 20,
      "TOSTATEID": 10,
      "VEHICLETYPEID": 2,
      "ACTIVE": "A",
      "CREATEDBY": "1",
      "CREATEDON": "2016-01-01 00:00:00"
    }

    this.urlMaps = {
      'contract': `${this._api.getHost()}/bacontract/Service.svc/getproximitybadata`,
      'backhaul': `${this._api.getHost()}/bacontract/Service.svc/dvprdata`,
      'rfphistory': `${this._api.getHost()}/RFPRest/RFPRestService.svc/rfphistory`,
      'cleansheet': ''
    };

    this.responseKeys = {
      'CONTRACTRATE': 'getproximitybadataResult',
      'PVSRFPRATE': 'rfphistoryResult',
      'NOOFTRIPS': 'dvprdataResult'
    };

    this.getTransactionData();
  }

  getTransactionData() {

    this._api.get(`gettrans/${this.$stateParams.rfpId}`).then((res) => {
      this.outputdata = res.data;

      var newOutputData = _.each(this.outputdata, (key, value) => {
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
        //var total = 55;
        //alert( L5RATE.toFixed(1) );
        this.outputdata[value].L5RATE = L5RATE;


        var APPROVEDAMOUNT = this.outputdata[value].APPROVEDAMOUNT;
        APPROVEDAMOUNT = Math.round(APPROVEDAMOUNT / 1000 * 100) / 100;
        this.outputdata[value].APPROVEDAMOUNT = APPROVEDAMOUNT;

      })

      //this.nameoutputdata = this.outputdata[0];
      this.nameoutputdata = newOutputData[0];
      this.fromLocationOptions = _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
      this.routesGroupByLocation = _.groupBy(this.outputdata, 'FROMLOCATIONNAME');

      _.each(this.routesGroupByLocation, (vehiclelist, key) => {
        this.routesGroupByLocation[key] = _.uniqBy(vehiclelist, 'VEHICLETYPENAME');

        console.log(this.outputdata);
      });

      this.filterOption = {
        FROMLOCATIONNAME: this.fromLocationOptions[0].FROMLOCATIONNAME,
        VEHICLETYPENAME: this.fromLocationOptions[0].VEHICLETYPENAME
      };

      this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];

    }, (err) => {
      //console.error(err);
      this.toaster.error(`${err.status} : ${err.statusText}`);
    });
  }

  ClearFilter() {
    this.filterOption = undefined;
  }

  getArray() {
    return _.map(this.outputdata, (v) => (_.pick(v, ['CUSTOMERNAME', 'CASHACCOUNTID', 'FROMLOCATIONNAME'])));
  }

  showModal(colname, table, clickedColName, headerColName, modalHeaderName) {

    this.selectedLane = table;
    this.rowClickedColName = clickedColName;

    this.inproxiparam.ORIGIN = this.filterOption.FROMLOCATIONNAME;
    this.inproxiparam.ORIGINSTATE = table.FROMSTATE;
    this.inproxiparam.DESTINATION = table.TOLOCATIONNAME;
    this.inproxiparam.DESTINATIONSTATE = table.TOSTATE;
    this.inproxiparam.VEHICLETYPE = this.filterOption.VEHICLETYPENAME;
    this.inproxiparam.DISTANCE = table.PROXIDISTANCE;
    //this.inproxiparam.NOOFTRIPS = table.NOOFTRIPS;
    this.inproxiparam.NOOFTRIPS = table.PROXIDISTANCE;

    this.gridData = [];
    var newfilterRoutes = {
      inproxiparam: this.inproxiparam
    };

    console.log(newfilterRoutes);

    this.TOLOCATIONNAME = table.TOLOCATIONNAME;
    this.CONTRACTRATE = table[clickedColName];
    this.colName = headerColName;
    this.modalHeaderName = modalHeaderName;

    this._api.post(this.urlMaps[colname], newfilterRoutes, true).then((res) => {
      this.gridData = res.data[this.responseKeys[clickedColName]];

    }, (err) => {
      //console.error(err);
      this.toaster.error(`${err.status} : ${err.statusText}`);
    });


    if (clickedColName == 'NOOFTRIPS') {

      $('#myModalOutputDetailsForBackHaul').modal();
    } else {

      $('#myModalOutputDetails').modal();
    }

  }

  submit() {

    var revisedOutput = _.chain(this.outputdata).map((output) => {

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
    }).value();

    var newOutputDetails = {
      apptrans: revisedOutput
    };

    console.log(newOutputDetails);

    this._api.post('apptrans', newOutputDetails).then((res) => {
      this.getTransactionData();
      console.log(res.data);
    }, (err) => {
      //console.error(err);
      this.toaster.error(`${err.status} : ${err.statusText}`);
    });

    this.toaster.success('Changes saved successfully');

  }


  updateContractRate(popupGridData, colName) {
    this.CONTRACTRATE = popupGridData.FREIGHTRATE;
    this.selectedLane[this.rowClickedColName] = popupGridData.FREIGHTRATE;

    if (colName == 'REGULAR') {
      $('#myModalOutputDetails').modal('hide');
    } else {
      $('#myModalOutputDetailsForBackHaul').modal('hide');
    }

  }

  changecolor(toMatch, approvedRate) {
    if (toMatch >= approvedRate) {
      return 'below';
    } else {
      return 'above';
    }
  }

  changeLocation() {

    this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];
    this.filterOption.VEHICLETYPENAME = this.vehicleTypeOptions[0].VEHICLETYPENAME;
    this.outputdata[0].CLEANSHEETRATE = this.outputdata[0].CLEANSHEETRATE / 1000;
  }


  export () {
    //this._api.get('exportrfpout/1').then((res) => {
    this._api.get(`exportrfpout/${this.$stateParams.rfpId}`).then((res) => {
      window.open(res.data);
    }, (err) => {
      //console.error(err);
      this.toaster.error(`${err.status} : ${err.statusText}`);
    });
  }

  exportBAQuote () {
    //this._api.get('expbaquote/1').then((res) => {
    this._api.get(`expbaquote/${this.$stateParams.rfpId}`).then((res) => {
      window.open(res.data);
    }, (err) => {
      console.error(err);
    });
  }

 //added by yogini

 uploadBlobOrFile(blobOrFile) {

    var client = new XMLHttpRequest();
    client.open('POST', `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/baquote/${this.$stateParams.rfpid}/baquote/1`, false);
    //client.open('POST', `http://localhost:52202/RFPImport/Service.svc/Upload/RFPUpload/${this.$stateParams.rfpid}`, false);
    //client.setRequestHeader('Content-length', blobOrFile.length);
    client.setRequestHeader("Content-Type", "multipart/form-data");

    /* Check the response status */
    client.onreadystatechange = () => {
      //console.log(document.readyState);
      console.log("rdystate: " + client.readyState + " status: " + client.status + " Text: " + client.statusText);
      if (client.readyState == 4 && client.status == 200) {
        console.log(client.responseText);
        //===========================
        //Get all RFP routes by RFP ID
        /*this.getRPFRoutes();
        //===========================
        this._api.get(`apiupdate/${this.$stateParams.rfpid}`).then((res) => {
          //this.$state.go('dashboard');
        }, (err) => {
          //console.error(err);
          this.toaster.error(`${err.status} : ${err.statusText}`);
        });*/
        //===========================
        $('#myModalBrowse').modal('hide');
      }
    }

    //this.toaster.success('Lanes saved successfully');
    /* Send to server */
    client.send(blobOrFile);
  }
//added by yogini

  checkBackhaul() {

  }

  closeModal() {
    $('#myModalOutputDetails').modal('hide');
  }

  showColumn(colName) {

    if (colName == 'BACKHAULAVL') {
      return true;
    } else {
      return false;
    }
  }

  updateProposedRate(route, key, value){
    if(key == 'CONTRACTRATE' || key == 'SHIPXRATE' || key == "PVSRFPRATE")
    {
      route.APPROVEDAMOUNT = route[key]/1000;
      route.BANAME = '';
    }
    else {
      route.APPROVEDAMOUNT = route[key];
      route.BANAME = route[value];
    }
  }

}
