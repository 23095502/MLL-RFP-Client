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

    this.AGEOFTRUCK_option = [{
      name: "5",
      val: "5"
    }, {
      name: "5",
      val: "6"
    }];

    this.ISMULTIDROP_option = [{
      name: "N",
      val: "N"
    }, {
      name: "Y",
      val: "Y"
    }];

    this.ISHUBORWHREQ_option = [{
      name: "6",
      val: "6"
    }, {
      name: "7",
      val: "7"
    }];

    this.RATEUOM_option = [{
      name: "9",
      val: "9"
    }, {
      name: "19",
      val: "19"
    }];

    this.CARGOTYPE_option = [{
      name: "23",
      val: "23"
    }, {
      name: "29",
      val: "29"
    }];

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
      "ISHUBORWHREQ": null,
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
    console.log(this.customer.CUSTOMERID)

    this.$http.get(`http://59.160.18.222/RFPRest/RFPRestService.svc/getrfpbycustomerid/${this.customer.CUSTOMERID}`)
      .then((res) => {
        console.log(res);
        this.overall = res.data[0];
      }, (err) => {
        console.error(err);
      });


  }


}
