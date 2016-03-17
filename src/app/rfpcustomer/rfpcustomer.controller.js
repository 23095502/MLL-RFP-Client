export class RFPCustomerController {
  constructor($http) {
    'ngInject';


    $http.get('http://59.160.18.222/RFPRest/RFPRestService.svc/customer/0')

      .then((res) => {
        this.customer = res.data;
      }, (err) => {
        console.error(err);
      });


    this.$http = $http;

    this.customer = []
    this.resetCustomer();

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


  // add() {

  //   this.rfpcustomermaster.customer.CUSTOMERCODE = null;
  //   this.customer.CUSTOMERNAME = 'Wipro Infotech';
  //   this.customer.ADDRESS = "Pune";
  //   this.customer.EMAIL = "praveenhart@wipro.com";
  //   this.customer.CONTACTPERSON = 'Praveen Kumar Singh';
  //   this.customer.CONTACTNO = 9967288728;
  //   this.customer.push(angular.copy(this.customer));
  //   // this.resetRoute();
  //   this.editingIndex = null;
  // }

  // edit(customer, index) {
  //   this.customer = angular.copy(customer);
  //   this.editingIndex = index;
  //   $('#myModal').modal();
  // }

  add() {

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/customer/1',
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

this.$http(req).then((response) => {

        //-------------
        //Get All Cutomers
        // this.getAllCustomers();
        //-------------
    }, (response) => {
      console.log(error)
    });
}

submitcustomerdata() {

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/customer/1',
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
