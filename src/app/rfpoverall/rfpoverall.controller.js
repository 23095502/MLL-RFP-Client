export class RFPOverallController {
  constructor($http, $state) {
    'ngInject';

    this.$http = $http;
    this.$state = $state;
    //-------------
    //Get All Cutomers
    this.getAllCustomers();
    //-------------
    this.CUSTOMERNAME_option = [];

    this.customer = {
      "CUSTOMERID": 0,
      "CUSTOMERCODE": null,
      "CUSTOMERNAME": null,
      "ADDRESS": null,
      "CONTACTPERSON": null,
      "CONTACTNO": null,
      "CASHACCOUNTID": null,
      "TOTALSPEND": null,
      "EMAIL": null,
      "ACTIVE": "A",
      "MODE": "INSERT",
      "CREATEDBY": 0,
      "CREATEDON": null
    };
    this.newCustomer = {
      "CUSTOMERID": 0,
      "CUSTOMERCODE": null,
      "CUSTOMERNAME": null,
      "ADDRESS": null,
      "CONTACTPERSON": null,
      "CONTACTNO": null,
      "CASHACCOUNTID": null,
      "TOTALSPEND": null,
      "EMAIL": null,
      "ACTIVE": "A",
      "MODE": "INSERT",
      "CREATEDBY": 0,
      "CREATEDON": null
    };
    this.AGEOFTRUCK_option = _.times(10, (i) => ({
      name: i,
      val: i
    }));
    this.DISTRIBUTIONTYPE_option = _.map(['Primary', 'Secondary', 'Distribution'], (i) => ({
      name: i,
      val: i
    }));
    /*this.ISHUBORWHREQ_option = _.map(['Yes', 'No'], (i) => ({
      name: i,
      val: i
    }));*/
    this.ISMULTIDROP_option = [{
      name: 'Yes',
      val: 'Y'
    }, {
      name: 'No',
      val: 'N'
    }]
    this.ISHUBORWHREQ_option = [{
      name: 'Yes',
      val: 'Y'
    }, {
      name: 'No',
      val: 'N'
    }]
    this.RATEUOM_option = _.map(['PTPK', 'Per trip', 'Per Kg', 'Per Km', 'Per month'], (i) => ({
      name: i,
      val: i
    }));

    this.PAYMENTTERM_option = _.map(['15', '30', '45', '60', '75', '90'], (i) => ({
      name: i,
      val: i
    }));

    this.CARGOTYPE_option = _.map(['Volumetric', 'Dense'], (i) => ({
      name: i,
      val: i
    }));
    //Inbound/outbound
    this.OPPRDOMAIN_option = _.map(['Inbound', 'Outbound'], (i) => ({
      name: i,
      val: i
    }));
    //Inbound/outbound
    this.overall = {
      "RFPID": 0,
      "RFPCODE": '',
      "RFPDATE": '1800-01-01 00:00:00',
      "CUSTOMERID": 0,
      "INDUSTRYTYPEID": 1,
      "RFPAMOUNT": 0,
      "STARTDATE": '1800-01-01 00:00:00',
      "RFPOWNER": 1,
      "CURRENTSTAGINGOWNER": 1,
      "DIESELRATE": 0,
      "AGEOFTRUCK": this.AGEOFTRUCK_option[4].val,
      "RFPDESC": '',
      "DUEDATE": '1800-01-01 00:00:00',
      "PRODUCTDESC": '',
      "CASHOPPID": '',
      "OPPRDOMAIN": '',
      "DISTRIBUTIONTYPE": '',
      "ISMULTIDROP": this.ISMULTIDROP_option[1].val,
      "ISHUBORWHREQ": this.ISHUBORWHREQ_option[1].val,
      "CARGOTYPE": '',
      "SEARCH1": '',
      "SEARCH2": '',
      "SEARCH3": '',
      "PAYMENTTERM": this.PAYMENTTERM_option[3].val,
      "RATEUOM": this.RATEUOM_option[1].val,
      "PENALITIES": '',
      "DETENTION": '',
      "ESCCLAUSE": '',
      "ACTIVE": 'A',
      "CREATEDBY": 5,
      "CREATEDON": '1800-01-01 00:00:00',
      "ADDRESS": '',
      "CONTACTPERSON": '',
      "CONTACTNO": '',
      "CASHACCOUNTID": '',
      "TOTALSPEND": '',
      "PROXIDISTANCE": 10
    };

  }

  getAllCustomers() {
    this.$http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/customer/0')
      .then((res) => {

        this.CUSTOMERNAME_option = res.data;
      }, (err) => {
        console.error(err);
      });
  }

  addCustomer() {

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/updtcustomer',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "cust": {
          "CUSTOMERID": this.newCustomer.CUSTOMERID,
          "CUSTOMERCODE": this.newCustomer.CUSTOMERCODE,
          "CUSTOMERNAME": this.newCustomer.CUSTOMERNAME,
          "ADDRESS": this.newCustomer.ADDRESS,
          "CONTACTPERSON": this.newCustomer.CONTACTPERSON,
          "CONTACTNO": this.newCustomer.CONTACTNO,
          "CASHACCOUNTID": this.newCustomer.CASHACCOUNTID,
          "TOTALSPEND": this.newCustomer.TOTALSPEND,
          "EMAIL": this.newCustomer.EMAIL,
          "ACTIVE": "A",
          "MODE": "INSERT",
          "CREATEDBY": 5,
          "CREATEDON": "2016-01-01 00:00:00"
        }
      }

    };

    this.$http(req).then((response) => {
      //-------------
      //Get All Cutomers
      this.getAllCustomers();
      //-------------
    }, (response) => {
      console.log(error)
    });

  }

  addRfpHeader() {

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/rfp/INSERT',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "rfpupdt": {
          "RFPID": 0,
          "RFPCODE": this.overall.RFPCODE,
          "RFPDATE": "2016-01-01 00:00:00", //this.overall.RFPDATE,
          "CUSTOMERID": this.customer.CUSTOMERID,
          "INDUSTRYTYPEID": this.overall.INDUSTRYTYPEID,
          "RFPAMOUNT": this.overall.RFPAMOUNT,
          "STARTDATE": "2016-01-01 00:00:00",
          "RFPOWNER": this.overall.RFPOWNER,
          "CURRENTSTAGINGOWNER": this.overall.CURRENTSTAGINGOWNER,
          "DIESELRATE": this.overall.DIESELRATE,
          "AGEOFTRUCK": this.overall.AGEOFTRUCK,
          "RFPDESC": this.overall.RFPDESC,
          "DUEDATE": "2016-01-01 00:00:00", //this.overall.DUEDATE,
          "PRODUCTDESC": this.overall.PRODUCTDESC,
          "CASHOPPID": this.overall.CASHOPPID,
          "OPPRDOMAIN": this.overall.OPPRDOMAIN,
          "DISTRIBUTIONTYPE": this.overall.DISTRIBUTIONTYPE,
          "ISMULTIDROP": this.overall.ISMULTIDROP,
          "ISHUBORWHREQ": this.overall.ISHUBORWHREQ,
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
          "CREATEDON": "2016-01-01 00:00:00",
          "ADDRESS": this.customer.ADDRESS,
          "CONTACTPERSON": this.customer.CONTACTPERSON,
          "CONTACTNO": this.customer.CONTACTNO,
          "CASHACCOUNTID": this.customer.CASHACCOUNTID,
          "TOTALSPEND": this.customer.TOTALSPEND,
          "PROXIDISTANCE": this.customer.PROXIDISTANCE
        }
      }

    }

    this.$http(req).then((response) => {

      this.$state.go('create/lanes/', {
        rfpid: response.data.rfpResult[0].RFPID,
        iswarehousing: this.overall.ISHUBORWHREQ
      });

    }, (error) => {
      console.log(error)
    });

  }

}
