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
      'BACKHAULAVL': 'dvprdataResult'
    };

    this.getTransactionData();
  }

  getTransactionData() {

    this._api.get(`gettrans/${this.$stateParams.rfpId}`).then((res) => {
      this.outputdata = res.data;
      this.nameoutputdata = this.outputdata[0];
      this.fromLocationOptions = _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
      this.routesGroupByLocation = _.groupBy(this.outputdata, 'FROMLOCATIONNAME');

      _.each(this.routesGroupByLocation, (vehiclelist, key) => {
        this.routesGroupByLocation[key] = _.uniqBy(vehiclelist, 'VEHICLETYPENAME');

        /*
        _.each(this.outputdata, (key, value) =>{
          var l1ratevalue = this.outputdata[value].L1RATE;
          console.log(l1ratevalue);
        })
        */
      });

      this.filterOption = {
        FROMLOCATIONNAME: this.fromLocationOptions[0].FROMLOCATIONNAME,
        VEHICLETYPENAME: this.fromLocationOptions[0].VEHICLETYPENAME
      };

      this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];

    }, (err) => {
      console.error(err);
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

    /*
    this.inproxiparam.ORIGIN = this.filterOption.FROMLOCATIONNAME;
    this.inproxiparam.ORIGINSTATE = this.outputdata[index].FROMSTATE;
    this.inproxiparam.DESTINATION = this.outputdata[index].TOLOCATIONNAME;
    this.inproxiparam.DESTINATIONSTATE = this.outputdata[index].TOSTATE;
    this.inproxiparam.VEHICLETYPE = this.filterOption.VEHICLETYPENAME;
    this.inproxiparam.DISTANCE = this.outputdata[index].PROXIDISTANCE;
    this.inproxiparam.NOOFTRIPS = this.outputdata[index].NOOFTRIPS;
    */

    this.inproxiparam.ORIGIN = this.filterOption.FROMLOCATIONNAME;
    this.inproxiparam.ORIGINSTATE = table.FROMSTATE;
    this.inproxiparam.DESTINATION = table.TOLOCATIONNAME;
    this.inproxiparam.DESTINATIONSTATE = table.TOSTATE;
    this.inproxiparam.VEHICLETYPE = this.filterOption.VEHICLETYPENAME;
    this.inproxiparam.DISTANCE = 10;
    this.inproxiparam.NOOFTRIPS = table.NOOFTRIPS;

    this.gridData = [];
    var newfilterRoutes = {
      inproxiparam: this.inproxiparam
    };

    this.TOLOCATIONNAME = table.TOLOCATIONNAME;
    this.CONTRACTRATE = table[clickedColName];
    this.colName = headerColName;
    this.modalHeaderName = modalHeaderName;

    this._api.post(this.urlMaps[colname], newfilterRoutes, true).then((res) => {
      this.gridData = res.data[this.responseKeys[clickedColName]];
    }, (err) => {
      console.error(err);
    });

    $('#myModalOutputDetails').modal();
  }

  submit() {

    var revisedOutput = _.chain(this.outputdata).map((output) => {

      output.MODE = 'APIRATE';
      output.CREATEDBY = 1;
      output.CREATEDON = '2016-03-01';
      delete output.$$hashKey;
      delete output.ADDRESS;
      delete output.AVERAGELOAD;
      delete output.BACKHAUL;
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
      delete output.LOADINGUNLOADINGTIME;
      delete output.MHEREQUIREMENT;
      delete output.NOOFTRIPS;
      delete output.OTHERREQUIREMENT;
      delete output.PACKAGETYPEID;
      delete output.PACKAGETYPENAME;
      delete output.PACKDIMENSION;
      delete output.RESULT;
      delete output.RFPDURATION;
      delete output.RFPVOLUME;
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

    this._api.post('apptrans', newOutputDetails).then((res) => {
      this.getTransactionData();
    }, (err) => {
      console.error(err);
    });

    this.toaster.success('Changes saved successfully');

  }


  updateContractRate(popupGridData) {
    this.CONTRACTRATE = popupGridData.FREIGHTRATE;
    this.selectedLane[this.rowClickedColName] = popupGridData.FREIGHTRATE;
    $('#myModalOutputDetails').modal('hide');
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
    this._api.get('exportrfpout/1').then((res) => {
      window.open(res.data);
    }, (err) => {
      console.error(err);
    });
  }

  checkBackhaul() {

  }

  closeModal() {
    $('#myModalOutputDetails').modal('hide');
  }

}
