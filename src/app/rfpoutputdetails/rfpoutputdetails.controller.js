export class RFPOutputController {
  constructor($http, $stateParams) {
    'ngInject';

    $http.get(`http://59.160.18.222/RFPRest/RFPRestService.svc/gettrans/${$stateParams.rfpId}`)
      .then((res) => {
        this.outputdata = res.data;
        this.nameoutputdata = this.outputdata[0];
        this.fromLocationOptions = _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
        this.routesGroupByLocation = _.groupBy(this.outputdata, 'FROMLOCATIONNAME');

        _.each(this.routesGroupByLocation, (vehiclelist, key) => {
          this.routesGroupByLocation[key] = _.uniqBy(vehiclelist, 'VEHICLETYPENAME');
        });

        this.filterOption = {
          FROMLOCATIONNAME: this.fromLocationOptions[0].FROMLOCATIONNAME,
          VEHICLETYPENAME: this.fromLocationOptions[0].VEHICLETYPENAME
        };

        this.vehicleTypeOptions = this.routesGroupByLocation[this.filterOption.FROMLOCATIONNAME];

      }, (err) => {
        console.error(err);
      });

    this.outputdata = [];
    this.$http = $http;

    this.inproxiparam = {
      "ORIGIN": "Kalwa",
      "ORIGINSTATE": "Maharashtra",
      "DESTINATION": "KUNDLI",
      "DESTINATIONSTATE": "Haryana",
      "VEHICLETYPE": "Container 4.5 MT 14 FT",
      "DISTANCE": 100,
      "NOOFTRIPS": 0
    }

    this.apptrans = {
      "RFPID":1,
      "BANAME":"IVC",
      "APPROVEDAMOUNT":5000,
      "FROMLOCATIONID":1,
      "TOLOCATIONID":2,
      "FROMSTATEID":20,
      "TOSTATEID":10,
      "VEHICLETYPEID":2,
      "ACTIVE":"A",
      "CREATEDBY":"1",
      "CREATEDON":"2016-01-01 00:00:00"
    }

    this.urlMaps = {
      'contract': 'http://59.160.18.222/bacontract/Service.svc/getproximitybadata',
      'backhaul': 'http://59.160.18.222/bacontract/Service.svc/dvprdata',
      'rfphistory': 'http://59.160.18.222/RFPTool/RFPRestService.svc/rfphistory',
      'cleansheet': ''
    }

    this.gridData = [];

  }

  ClearFilter() {
    this.filterOption = undefined;
  }

  getArray() {
    return _.map(this.outputdata, (v) => (_.pick(v, ['CUSTOMERNAME', 'CASHACCOUNTID', 'FROMLOCATIONNAME'])));
  }

  showModal(colname, table, clickedColName) {

    this.selectedLane = table;
    this.rowClickedColName = clickedColName;

    /*
    this.inproxiparam.ORIGIN = this.filterOption.FROMLOCATIONNAME;
    this.inproxiparam.ORIGINSTATE = this.outputdata[0].FROMSTATE;
    this.inproxiparam.DESTINATION = this.outputdata[0].TOLOCATIONNAME;
    this.inproxiparam.DESTINATIONSTATE = this.outputdata[0].TOSTATE;
    this.inproxiparam.VEHICLETYPE = this.filterOption.VEHICLETYPENAME;
    this.inproxiparam.DISTANCE = this.outputdata[0].DISTANCE;
    this.inproxiparam.NOOFTRIPS = this.outputdata[0].NOOFTRIPS;
    console.log(this.inproxiparam);
    */

    var newfilterRoutes = '{"inproxiparam":' + JSON.stringify(this.inproxiparam) + '}';

    this.TOLOCATIONNAME = table.TOLOCATIONNAME;
    this.CONTRACTRATE = table.CONTRACTRATE;

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/bacontract/Service.svc/getproximitybadata',
      //url: this.urlMaps[colname],
      headers: {
        'Content-Type': 'application/json'
      },

      data: newfilterRoutes
    }

    this.$http(req).then((res) => {
    this.gridData = res.data.getproximitybadataResult;
    }, (err) => {
      console.error(err);
    });


    $('#myModalOutputDetails').modal();

  }


  submit(){

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

    var newRFPOutputDetails = '{"apptrans":' + JSON.stringify(revisedOutput) + '}';

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/apptrans',
      headers: {
        'Content-Type': 'application/json'
      },

      data: newRFPOutputDetails
    }

    this.$http(req).then((res) => {
    console.log(res.data);
    //console.log(this.gridData);
    }, (err) => {
      console.error(err);
    });

  }


  updateContractRate(popupGridData){

    this.CONTRACTRATE = popupGridData.FREIGHTRATE;
    this.selectedLane[this.rowClickedColName] = popupGridData.FREIGHTRATE;
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

  }

}
