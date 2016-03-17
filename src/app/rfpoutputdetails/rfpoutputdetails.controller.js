export class RFPOutputController {
  constructor($http, $stateParams) {
    'ngInject';

    //$http.get(`http://172.32.0.101/RFPRest/RFPRestService.svc/gettrans/${$stateParams.rfpId}`)
    $http.get(`http://172.32.0.101/RFPRest/RFPRestService.svc/gettrans/${$stateParams.rfpId}`)
      .then((res) => {
        this.outputdata = res.data;
        console.log(res.data);
        this.nameoutputdata = this.outputdata[0];
        this.fromLocationOptions = _.uniqBy(this.outputdata, 'FROMLOCATIONNAME');
        this.vehicleTypeOptions = _.uniqBy(this.outputdata, 'VEHICLETYPENAME');
        console.log(this.outputdata);
      }, (err) => {
        console.error(err);
      });

    this.outputdata = [];
    this.filterOption;

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
      'contract': 'http://172.32.0.101/bacontract/Service.svc/getproximitybadata',
      'backhaul': 'http://172.32.0.101/bacontract/Service.svc/dvprdata',
      'rfphistory': 'http://172.32.0.101/RFPTool/RFPRestService.svc/rfphistory',
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


  showModal(colname, table) {

    this.selectedLane = table;


    //this.inproxiparam = angular.copy(inproxiparam);
/*
    this.inproxiparam.ORIGIN = ;
    this.inproxiparam.ORIGINSTATE = table.ORIGINSTATE;
    this.inproxiparam.DESTINATION = table.SEARCH2;
    this.inproxiparam.DESTINATIONSTATE = table.DESTINATIONSTATE;
    this.inproxiparam.VEHICLETYPE = table.VEHICLETYPE;
    this.inproxiparam.DISTANCE = table.DISTANCE;
    this.inproxiparam.NOOFTRIPS = table.NOOFTRIPS;

    console.log(this.inproxiparam);
*/

    //this.inproxiparam.ORIGIN = table.TOLOCATIONNAME;
/*
    this.inproxiparam.ORIGIN = this.filterOption.FROMLOCATIONNAME;
    this.inproxiparam.ORIGINSTATE = this.outputdata[0].FROMSTATE;
    this.inproxiparam.DESTINATION = this.outputdata[0].TOLOCATIONNAME;
    this.inproxiparam.DESTINATIONSTATE = this.outputdata[0].TOSTATE;
    this.inproxiparam.VEHICLETYPE = this.filterOption.VEHICLETYPENAME;
    this.inproxiparam.DISTANCE = this.outputdata[0].DISTANCE;
    this.inproxiparam.NOOFTRIPS = this.outputdata[0].NOOFTRIPS;
*/
    console.log(this.inproxiparam);

    var newfilterRoutes = '{"inproxiparam":' + JSON.stringify(this.inproxiparam) + '}';

    this.TOLOCATIONNAME = table.TOLOCATIONNAME;
    this.CONTRACTRATE = table.CONTRACTRATE;

    var req = {
      method: 'POST',
      url: 'http://172.32.0.101/bacontract/Service.svc/getproximitybadata',
      //url: this.urlMaps[colname],
      headers: {
        'Content-Type': 'application/json'
      },

      data: newfilterRoutes
    }

    this.$http(req).then((res) => {
    this.gridData = res.data.getproximitybadataResult;
    console.log(this.gridData);
    }, (err) => {
      console.error(err);
    });

    $('#myModalOutputDetails').modal();

  }

  submit(){

    var revisedOutput = _.chain(this.outputdata).map((output) => {

      output.CREATEDBY = 1;
      output.CREATEDON = '2016-03-01';

      delete output.$$hashKey;
      delete output.ADDRESS;
      delete output.AVERAGELOAD;
      delete output.BACKHAUL;
      delete output.BACKHAULAVL;
      delete output.BACKHAULPERCENT;
      delete output.BAQUOTE;
      delete output.CASHACCOUNTID;
      delete output.CLEANSHEETRATE;
      delete output.CONTACTNO;
      delete output.CONTACTPERSON;
      delete output.CONTRACTRATE;
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
      delete output.MARKETRATE;
      delete output.MHEREQUIREMENT;
      delete output.NOOFTRIPS;
      delete output.OTHERREQUIREMENT;
      delete output.PACKAGETYPEID;
      delete output.PACKAGETYPENAME;
      delete output.PACKDIMENSION;
      delete output.PVSRFPRATE;
      delete output.RESULT;
      delete output.RFPDURATION;
      delete output.RFPVOLUME;
      delete output.SERVICETYPE;
      delete output.SHIPXRATE;
      delete output.STACKINGNORMS;
      delete output.TOLOCATIONNAME;
      delete output.TOSTATE;
      delete output.TOSTATECODE;
      delete output.TOTALSPEND;
      delete output.VEHICLETYPENAME;

    /*
    {
      "RFPID"
      "BANAME"
      "APPROVEDAMOUNT"
      "FROMLOCATIONID"
      "TOLOCATIONID"
      "FROMSTATEID"
      "TOSTATEID"
      "VEHICLETYPEID"
      "ACTIVE"
      "CREATEDBY"
      "CREATEDON"
    }
    */


      return output;
    }).value();

    /*
    var newRFPOutputDetails = '{"apptrans":' + JSON.stringify(revisedOutput) + '}';

    var req = {
      method: 'POST',
      url: 'http://172.32.0.101/RFPRest/RFPRestService.svc/apptrans',
      //url: this.urlMaps[colname],
      headers: {
        'Content-Type': 'application/json'
      },

      data: newRFPOutputDetails
    }

    this.$http(req).then((res) => {
    console.log(res.data);
    console.log(this.gridData);
    }, (err) => {
      console.error(err);
    });
    */

  }

  updateContractRate(popupGridData){

    this.CONTRACTRATE = popupGridData.FREIGHTRATE;
    this.selectedLane.CONTRACTRATE = popupGridData.FREIGHTRATE;

  }

}
