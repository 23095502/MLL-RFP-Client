export class RFPDetailsController {
  constructor($http) {
    'ngInject';

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/GetRFPRoute/5/BYCUSTOMERID',
      headers: {
        'Content-Type': 'application/JSON'
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
    }


        $http(req).then((response) => {
          this.routes = response.data.getrfprouteResult;
        }, function(response) {
          console.log(error);
        });


    /*$http(req).then(function() {
      console.log('Hi')
    }, function() {});*/
  }

}
