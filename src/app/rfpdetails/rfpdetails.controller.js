export class RFPDetailsController {
  constructor($http) {
    'ngInject';

    //GET RFP DETAILS
    this.routes = [];
    $http({
      method: 'GET',
      //url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/getrfproutebyid/2'
      url: 'http://172.32.0.101/RFPRest/RFPRestService.svc/getrfproutebyid/1'
    }).then((res) => {
      this.routes = res.data;
      //console.log(res.data);
    }, (err) => {
      console.error(err);
    });

    //GET RFP DETAILS


    //GET LOCATIONS
    this.locationname_option = [];
    $http({
      method: 'GET',
      //url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/GetLocations?locationid=0&locationcode=HYD&locationname=HYDERABAD&active=A&createdby=1&createdon=2016-03-01&mode=GETALL'
      url: 'http://172.32.0.101/RFPRest/RFPRestService.svc/location/0'
    }).then((res) => {
      this.locationname_option = res.data;
    }, (err) => {
      console.error(err);
    });

    this.location = {
      "LOCATIONID": null,
      "LOCATIONNAME": null
    };
    //GET LOCATIONS

    //GET STATES
    this.statename_option = [];
    $http({
      method: 'GET',
      //url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/GetState?stateid=0&statecode=HYD&statename=HYDERABAD&active=A&createdby=1&createdon=2016-03-01&mode=GETALL'
      url: 'http://172.32.0.101/RFPRest/RFPRestService.svc/state/0'
    }).then((res) => {
      this.statename_option = res.data;
    }, (err) => {
      console.error(err);
    });

    this.state = {
      "STATEID": null,
      "STATENAME": null
    };
    //GET STATES

    //GET SERVICETYPE
    this.isSERVICETYPE_option = _.map(['PTL', 'FTL', 'PTL Conventional'], (i) => ({ name : i, val : i}));
    //GET SERVICETYPE

    //GET
    //this.isROUNDTRIP_option = _.map(['PTL', 'FTL'], (i) => ({ name : i, val : i}));
    //GET LOCATIONS


    this.routes = []
    this.resetRoute();
    this.$http = $http;
  }

  resetRoute() {
    this.route = {
      "ACTIVE": null,
      "APPROVEDAMOUNT": null,
      "AVERAGELOAD": null,
      "BACKHAUL": null,
      "CUSTTARGETRATE": null,
      "DISTANCE": null,
      "FREQUENCY": null,
      "FROMLOCATION": null,
      "FROMLOCATIONNAME": null,
      "FROMSTATE": null,
      "FROMSTATEID": null,
      "ISLOADUNLOADCHARG": null,
      "ISROUNDTRIP": null,
      "LOADINGUNLOADINGTIME": null,
      "LOCATIONNAME": null,
      "MHEREQUIREMENT": null,
      "NOOFTRIPS": null,
      "OTHERREQUIREMENT": null,
      "PACKAGETYPEID": null,
      "PACKDIMENSION": null,
      "RFPDURATION": null,
      "RFPID": null,
      "RFPVOLUME": null,
      "SERVICETYPE": null,
      "STACKINGNORMS": null,
      "TOLOCATION": null,
      "TOLOCATIONNAME": null,
      "TOSTATE": null,
      "TOSTATEID": null,
      "VEHICLETYPEID": null,
      "VEHICLETYPENAME": null,
      "DIRTY": false
    }
  }

  add() {
    this.route.DIRTY = true;
    this.route.ACTIVE = 'A';
    this.route.VEHICLETYPEID = 1;
    this.route.APPROVEDAMOUNT = 0;
    this.route.AVERAGELOAD = 'NA';
    this.route.BACKHAUL = 0;
    //this.route.CUSTTARGETRATE = 10000.00;
    this.route.DISTANCE = 0;
    this.route.FREQUENCY = 'NA';
    this.route.ISLOADUNLOADCHARG = 'N';
    //this.route.ISROUNDTRIP = 'N';
    //this.route.VEHICLETYPENAME = '';
    //this.route.LOADINGUNLOADINGTIME = 0;
    this.route.LOCATIONNAME = '';
    this.route.MHEREQUIREMENT = 'NA';
    //this.route.NOOFTRIPS = 0;
    //this.route.SERVICETYPE = this.route.SERVICETYPE;
    this.route.OTHERREQUIREMENT = 'NA';
    //this.route.PACKAGETYPEID = 0;
    this.route.PACKDIMENSION = 'NA';
    //this.route.RFPDURATION = 0;
    this.route.RFPID = 0;
    this.route.RFPVOLUME = 0;
    //this.route.STACKINGNORMS = 'NA';

    this.routes.push(angular.copy(this.route));
    this.resetRoute();
    this.editingIndex = null;
  }
  edit(route, index) {
    this.route = angular.copy(route);
    this.route.DIRTY = true;
    this.editingIndex = index;
    $('#myModal').modal();
  }

  save() {
    this.routes[this.editingIndex] = this.route;
    this.editingIndex = null;
    this.route = {
      "ACTIVE": "A",
      "APPROVEDAMOUNT": 5,
      "AVERAGELOAD": "NA",
      "BACKHAUL": 5,
      "CUSTTARGETRATE": "100000.00",
      "DISTANCE": 5,
      "FREQUENCY": "NA",
      "FROMLOCATION": 1,
      "FROMLOCATIONNAME": "MUMBAI",
      "FROMSTATE": null,
      "FROMSTATEID": 0,
      "ISLOADUNLOADCHARG": "N",
      "ISROUNDTRIP": "N",
      "LOADINGUNLOADINGTIME": 5,
      "LOCATIONNAME": null,
      "MHEREQUIREMENT": "NA",
      "NOOFTRIPS": 3,
      "OTHERREQUIREMENT": "NA",
      "PACKAGETYPEID": 5,
      "PACKDIMENSION": "NA",
      "RFPDURATION": 5,
      "RFPID": 10,
      "RFPVOLUME": 5,
      "SERVICETYPE": "EXP",
      "STACKINGNORMS": "NA",
      "TOLOCATION": 1,
      "TOLOCATIONNAME": "MUMBAI",
      "TOSTATE": null,
      "TOSTATEID": 0,
      "VEHICLETYPEID": 1,
      "VEHICLETYPENAME": "INDICA",
      "DIRTY": false
    }
  }

  submitData() {

    var filterRoutes = _.filter(this.routes, function(o) {
      return o.DIRTY;
    });

  }


  updateLocationName(direction) {
    this.route[`${direction}LOCATIONNAME`] = _.filter(this.locationname_option, (loc) => (this.route[`${direction}LOCATION`] === loc.LOCATIONID))[0].LOCATIONNAME;
  }

  updateStateName(direction) {
        this.route[`${direction}STATE`] = _.filter(this.statename_option, (st) => (this.route[`${direction}STATEID`] === st.STATEID))[0].STATENAME;
   // this.route[`${direction}STATE`] = _.filter(this.statename_option, (st) => (this.route[`${direction}STATEID`] === st.STATEID))[0].FROMSTATE;
  }

  /*
  updateServiceType(){
    //this.route.SERVICETYPE = this.route.PACKAGETYPEID;
    console.log(this.route.SERVICETYPE);
  }
  */

}
