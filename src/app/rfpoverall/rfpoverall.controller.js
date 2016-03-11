export class RFPOverallController {
  constructor($http) {
    'ngInject';

    $http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/GetCustomers?customerid=0&customercode=&customername=&address=&email=&contactperson=&contactno=&cashaccountid=&totalspend=0&active=A&createdby=1&createdon=2016-03-01&mode=GETALL')
      .then((res) => {
        this.CUSTOMERNAME_option = res.data;
      }, (err) => {
        console.error(err);
      });

    this.$http = $http;



    this.CUSTOMERNAME_option = [];


    this.customer = {
      "ACTIVE": null,
      "ADDRESS": null,
      "CASHACCOUNTID": null,
      "CONTACTNO": null,
      "CONTACTPERSON": null,
      "CUSTOMERCODE": null,
      "CUSTOMERID": null,
      "CUSTOMERNAME": null,
      "EMAIL": null,
      "TOTALSPEND": 0.00
    };

    this.AGEOFTRUCK_option = _.times(10, (i) => ({
      name: i,
      val: i
    }));

    this.ISMULTIDROP_option = _.map(['Primary', 'Secondary', 'Distribution'], (i) => ({
      name: i,
      val: i
    }));

    this.ISHUBORWHREQ_option = _.map(['Yes', 'No'], (i) => ({
      name: i,
      val: i
    }));

    this.RATEUOM_option = _.map(['PTPK', 'Per trip', 'Per Kg', 'Per Km', 'Per month'], (i) => ({
      name: i,
      val: i
    }));

    this.CARGOTYPE_option = _.map(['Volumetric', 'Dense'], (i) => ({
      name: i,
      val: i
    }));



    this.overall = {
      "RFPID": null,
      "RFPCODE": null,
      "RFPDATE": null,
      "CUSTOMERID": null,
      "INDUSTRYTYPEID": null,
      "RFPAMOUNT": null,
      "STARTDATE": null,
      "RFPOWNER": null,
      "CURRENTSTAGINGOWNER": null,
      "DIESELRATE": null,
      "AGEOFTRUCK": null,
      "RFPDESC": null,
      "DUEDATE": null,
      "PRODUCTDESC": null,
      "CASHOPPID": null,
      "OPPRDOMAIN": null,
      "DISTRIBUTIONTYPE": null,
      "ISMULTIDROP": null,
      "ISHUBORWHREQ": this.ISHUBORWHREQ_option[1].val,
      "CARGOTYPE": null,
      "SEARCH1": null,
      "SEARCH2": null,
      "SEARCH3": null,
      "PAYMENTTERM": null,
      "RATEUOM": null,
      "PENALITIES": null,
      "DETENTION": null,
      "ESCCLAUSE": null,
      "ACTIVE": null,
      "CREATEDBY": null,
      "CREATEDON": null
    };

  }

  getRFP() {

    this.$http.get(`http://59.160.18.222/RFPRest/RFPRestService.svc/getrfpbycustomerid/${this.customer.CUSTOMERID}`)
      .then((res) => {
        console.log(res);
        this.overall = res.data.getrfpbycustomeridResult[0];
        this.overall.STARTDATE = new Date(this.overall.STARTDATE);
        this.overall.DUEDATE = new Date(this.overall.DUEDATE);
      }, (err) => {
        console.error(err);
      });


  }


}
