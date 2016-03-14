export class RFPCustomerController {
  constructor($http) {
    'ngInject';

    $http.get('http://172.32.0.101/RFPRest/RFPRestService.svc/GetCustomers?customerid=0&customercode=&customername=&address=&email=&contactperson=&contactno=cashaccountid=CASH201600100&totalspend=0&active=A&createdby=1&createdon=2016-03-01&mode=GETALL')
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


  add() {

    this.customer.CUSTOMERCODE = "Wipro";
    this.customer.CUSTOMERNAME = 'Wipro Infotech';
    this.customer.ADDRESS = "Pune";
    this.customer.EMAIL = "praveenhart@wipro.com";
    this.customer.CONTACTPERSON = 'Praveen Kumar Singh';
    this.customer.CONTACTNO = 9967288728;
    this.customer.push(angular.copy(this.customer));
    this.resetRoute();
    this.editingIndex = null;
  }

  edit(customer, index) {
    this.customer = angular.copy(customer);
    this.editingIndex = index;
    $('#myModal').modal();
  }



submitcustomerdata() {
    console.log("Hello");
    var req = {
      method: 'POST',
      url: 'http://172.32.0.101/RFPRest/RFPRestService.svc/rfp/1/ManageCustomer',
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

    this.$http(req).then(function(response) {
      console.log(response)
    }, function(response) {
      console.log(error)
    });



  }
}
