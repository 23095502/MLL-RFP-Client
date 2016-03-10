export class RFPDetailsController {
  constructor() {
    'ngInject';


    this.routes = [{
      fromCity: 'Kalwa',
      fromState: 'Maharashtra',
      toCity: 'Delhi',
      toState: 'Kalwa',
      oneWay: 'One way',
      serviceType: 'LTL',
      vehicleType: '16Mt Tauras',
      transitTime: '12 Days',
      productDescription: 'Lorem',
      packagingType: 'Corrugated Boxes',
      stack: 'Lon'
    }, {
      fromCity: 'Kalwa',
      fromState: 'Maharashtra',
      toCity: 'Delhi',
      toState: 'Kalwa',
      oneWay: 'One way',
      serviceType: 'LTL',
      vehicleType: '16Mt Tauras',
      transitTime: '12 Days',
      productDescription: 'Lorem',
      packagingType: 'Corrugated Boxes',
      stack: 'Lon'
    }, {
      fromCity: 'Kalwa',
      fromState: 'Maharashtra',
      toCity: 'Delhi',
      toState: 'Kalwa',
      oneWay: 'One way',
      serviceType: 'LTL',
      vehicleType: '16Mt Tauras',
      transitTime: '12 Days',
      productDescription: 'Lorem',
      packagingType: 'Corrugated Boxes',
      stack: 'Lon'
    }]

    this.rfpdetails = {
          "RFPID":1,
          "FROMLOCATION":"1",
          "TOLOCATION":"1",
          "FROMSTATEID":"1",
          "TOSTATEID":"1",
          "VEHICLETYPEID":"1",
          "SERVICETYPE":"EXP",
          "APPROVEDAMOUNT":5,
          "ACTIVE":"A",
          "RFPVOLUME":5,
          "RFPDURATION":5,
          "LOADINGUNLOADINGTIME":5,
          "DISTANCE":5,
          "BACKHAUL":5,
          "PACKAGETYPEID":5,
          "PACKDIMENSION":"NA",
          "STACKINGNORMS":"NA",
          "CUSTTARGETRATE":"NA",
          "ISLOADUNLOADCHARG":"NA",
          "AVERAGELOAD":"NA",
          "FREQUENCY":"NA",
          "MHEREQUIREMENT":"NA",
          "OTHERREQUIREMENT":"NA",
          "NOOFTRIPS":3,
          "ISROUNDTRIP":"N",
          "SEARCH1":"6",
          "SEARCH2":"6",
          "SEARCH3":"6",
          "CREATEDBY":"1",
          "CREATEDON":"2016-01-01 00:00:00"
    }

  }

}