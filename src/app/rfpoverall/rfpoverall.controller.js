export class RFPOverallController {
  constructor($http) {
    'ngInject';

<<<<<<< HEAD
    $http.get('http://172.32.0.101/RFPRest/RFPRestService.svc/GetCustomers?customerid=0&customercode=&customername=&address=&email=&contactperson=&contactno=&cashaccountid=&totalspend=0&active=A&createdby=1&createdon=2016-03-01&mode=GETALL')
=======
    $http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/customer/0')
>>>>>>> develop
      .then((res) => {
        this.CUSTOMERNAME_option = res.data;
        console.log(res.data);
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

    this.$http.get(`http://172.32.0.101/RFPRest/RFPRestService.svc/getrfpbycustomerid/${this.customer.CUSTOMERID}`)
      .then((res) => {
        this.overall = res.data[0];
        this.overall.STARTDATE = new Date(this.overall.STARTDATE);
        this.overall.DUEDATE = new Date(this.overall.DUEDATE);
      }, (err) => {
        console.error(err);
      });
  }

  addRfpHeader() {
    console.log("Hello");
    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/rfp/0/INSERT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "rfpupdt": {
          "RFPID": 0,
          "RFPCODE": this.overall.RFPCODE,
          "RFPDATE": "2016-01-01 00:00:00",
          "CUSTOMERID": this.customer.CUSTOMERID,
          "INDUSTRYTYPEID": this.overall.INDUSTRYTYPEID,
          "RFPAMOUNT": this.overall.RFPAMOUNT,
          "STARTDATE": "2016-01-01 00:00:00",
          "RFPOWNER": this.overall.RFPOWNER,
          "CURRENTSTAGINGOWNER": this.overall.CURRENTSTAGINGOWNER,
          "DIESELRATE": this.overall.DIESELRATE,
          "AGEOFTRUCK": this.overall.AGEOFTRUCK,
          "RFPDESC": this.overall.RFPDESC,
          "DUEDATE": "2016-01-01 00:00:00",
          "PRODUCTDESC": this.overall.PRODUCTDESC,
          "CASHOPPID": this.overall.CASHOPPID,
          "OPPRDOMAIN": this.overall.OPPRDOMAIN,
          "DISTRIBUTIONTYPE": this.overall.DISTRIBUTIONTYPE,
          "ISMULTIDROP": this.overall.ISMULTIDROP,
          "ISHUBORWHREQ": 'N',
          "CARGOTYPE": this.overall.CARGOTYPE,
          "SEARCH1": "6",
          "SEARCH2": "6",
          "SEARCH3": "6",
          "PAYMENTTERM": this.overall.PAYMENTTERM,
          "RATEUOM": this.overall.RATEUOM,
          "PENALITIES": this.overall.PENALITIES,
          "DETENTION": this.overall.DETENTION,
          "ESCCLAUSE": "6",
          "ACTIVE": "A",
          "CREATEDBY": "1",
          "CREATEDON": "2016-01-01 00:00:00"
        }
      }
    };
    this.$http(req).then(function(response) {
      // console.log(response)
    }, function(response) {
      // console.log(error)
    });

  }

}
