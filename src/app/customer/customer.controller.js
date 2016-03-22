export class CustomerController {
  constructor($http) {
    'ngInject';

    this.$http = $http;
    this.customer = []
    this.resetCustomer();


    $http.get('http://115.113.135.239/RFPRest/RFPRestService.svc/customer/0')
      .then((res) => {
        this.customer = res.data;
      }, (err) => {
        console.error(err);
      });
  }

  resetCustomer() {
    this.customer = {
      "ACTIVE": null,
      "ADDRESS": null,
      "CASHACCOUNTID": null,
      "CONTACTNO": null,
      "CONTACTPERSON": null,
      "CUSTOMERCODE": this.customer.CUSTOMERCODE,
      "CUSTOMERID": null,
      "CUSTOMERNAME": null,
      "EMAIL": null,
      "TOTALSPEND": null
    }
  }

  add() {

    var req = {
      method: 'POST',
      url: 'http://115.113.135.239/RFPRest/RFPRestService.svc/customer/1',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "cust": {
          "CUSTOMERID": this.customer.CUSTOMERID,
          "CUSTOMERCODE": this.customer.CUSTOMERCODE,
          "CUSTOMERNAME": this.customer.CUSTOMERNAME,
          "ADDRESS": this.customer.ADDRESS,
          "CONTACTPERSON": this.customer.CONTACTPERSON,
          "CONTACTNO": this.customer.CONTACTNO,
          "CASHACCOUNTID": this.customer.CASHACCOUNTID,
          "TOTALSPEND": this.customer.TOTALSPEND,
          "EMAIL": this.customer.EMAIL,
          "ACTIVE": "A",
          "MODE": "INSERT",
          "CREATEDBY": 5,
          "CREATEDON": "2016-01-01 00:00:00"
        }
      }

    };

    this.$http(req).then((response) => {}, (response) => {
      console.log(error)
    });
  }

  submitcustomerdata() {

    var req = {
      method: 'POST',
      url: 'http://115.113.135.239/RFPRest/RFPRestService.svc/customer/1',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "rfpupdt": {
          "ACTIVE": "A",
          "ADDRESS": "MUMBAI",
          "CASHACCOUNTID": "",
          "CONTACTNO": "9967288729",
          "CONTACTPERSON": "SANJAY KUMAR",
          "CUSTOMERCODE": "pop",
          "CUSTOMERID": 1,
          "CUSTOMERNAME": "PRAVEEN INDUSTRIES",
          "EMAIL": "sanjay.kumar@reliance.com",
          "TOTALSPEND": 0.00
        }
      }

    }
  }
}
