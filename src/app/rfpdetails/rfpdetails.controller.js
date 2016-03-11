export class RFPDetailsController {
  constructor($http) {
    'ngInject';

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/getrfproute/5/BYCUSTOMERID',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "rfproute": {
          "RFPID": 3,
          "FROMLOCATION": "1",
          "TOLOCATION": "1",
          "FROMSTATEID": "1",
          "TOSTATEID": "1",
          "VEHICLETYPEID": "1",
          "SERVICETYPE": "EXP",
          "APPROVEDAMOUNT": 5,
          "ACTIVE": "A",
          "RFPVOLUME": 5,
          "RFPDURATION": 5,
          "LOADINGUNLOADINGTIME": 5,
          "DISTANCE": 5,
          "BACKHAUL": 5,
          "PACKAGETYPEID": 5,
          "PACKDIMENSION": "NA",
          "STACKINGNORMS": "NA",
          "CUSTTARGETRATE": 1000,
          "ISLOADUNLOADCHARG": "N",
          "AVERAGELOAD": "NA",
          "FREQUENCY": 1,
          "MHEREQUIREMENT": "NA",
          "OTHERREQUIREMENT": "N",
          "NOOFTRIPS": 3,
          "ISROUNDTRIP": "N",
          "SEARCH1": "6",
          "SEARCH2": "6",
          "SEARCH3": "6",
          "CREATEDBY": "1",
          "CREATEDON": "2016-01-01 00:00:00"
        }
      }
    };

    $http(req).then((response) => {
      this.routes = response.data.getrfprouteResult;
    }, (response) => {
      console.log(error)
    });


    this.routes = []
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
  add() {
    this.route.DIRTY = true;
    this.routes.push(angular.copy(this.route));
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
}
