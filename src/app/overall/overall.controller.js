export class OverallController {
  constructor($state, $filter, masterService, apiService, toaster) {
    'ngInject';

    this.$filter = $filter;
    this.$state = $state;
    this._master = masterService;
    this._api = apiService;
    this.toaster = toaster;

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

  }

  init() {

    this.CUSTOMERNAME_option = this._master.getCustomers();

    this.AGEOFTRUCK_option = _.times(10, (i) => ({
      name: i,
      val: i
    }));
    this.DISTRIBUTIONTYPE_option = _.map(['Primary', 'Secondary', 'Distribution'], (i) => ({
      name: i,
      val: i
    }));
    this.ISMULTIDROP_option = [{
      name: 'Yes',
      val: 'Y'
    }, {
      name: 'No',
      val: 'N'
    }];
    this.ISHUBORWHREQ_option = [{
      name: 'Yes',
      val: 'Y'
    }, {
      name: 'No',
      val: 'N'
    }];
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
    this.OPPRDOMAIN_option = _.map(['Inbound', 'Outbound'], (i) => ({
      name: i,
      val: i
    }));

    var dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    this.overall = {
      "RFPID": 0,
      "RFPCODE": '',
      "RFPDATE": new Date(),
      "CUSTOMERID": 0,
      "INDUSTRYTYPEID": 1,
      "RFPAMOUNT": 0,
      "STARTDATE": new Date(),
      "RFPOWNER": 1,
      "CURRENTSTAGINGOWNER": 1,
      "DIESELRATE": 0,
      "AGEOFTRUCK": this.AGEOFTRUCK_option[4].val,
      "RFPDESC": '',
      "DUEDATE": dueDate,
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
      "CREATEDON": new Date(),
      "ADDRESS": '',
      "CONTACTPERSON": '',
      "CONTACTNO": '',
      "CASHACCOUNTID": '',
      "TOTALSPEND": 0,
      "PROXIDISTANCE": 10
    };

    this.customer = {
      "cust": {
        "CUSTOMERID": 0,
        "CUSTOMERCODE": '',
        "CUSTOMERNAME": '',
        "ADDRESS": '',
        "CONTACTPERSON": '',
        "CONTACTNO": 0,
        "CASHACCOUNTID": '',
        "TOTALSPEND": '',
        "EMAIL": '',
        "ACTIVE": "A",
        "MODE": "INSERT",
        "CREATEDBY": 5,
        "CREATEDON": new Date()
      }
    };
  }


  resetNewCustomer() {

    this.newCustomer.CUSTOMERID = 0;
    this.newCustomer.CUSTOMERCODE = '';
    this.newCustomer.CUSTOMERNAME = '';
    this.newCustomer.ADDRESS = '';
    this.newCustomer.CONTACTPERSON = '';
    this.newCustomer.CONTACTNO = '';
    this.newoppCustomer.CASHACCOUNTID = '';
    this.newCustomer.TOTALSPEND = '';
    this.newCustomer.EMAIL = '';

  }

  addCustomer() {

    var customer = {

      "cust": {
        "CUSTOMERID": this.newCustomer.CUSTOMERID,
        "CUSTOMERCODE": this.newCustomer.CUSTOMERCODE,
        "CUSTOMERNAME": this.newCustomer.CUSTOMERNAME,
        "ADDRESS": this.newCustomer.ADDRESS,
        "CONTACTPERSON": this.newCustomer.CONTACTPERSON,
        "CONTACTNO": this.newCustomer.CONTACTNO,
        "CASHACCOUNTID": this.newoppCustomer.CASHACCOUNTID,
        "TOTALSPEND": this.newCustomer.TOTALSPEND,
        "EMAIL": this.newCustomer.EMAIL,
        "ACTIVE": "A",
        "MODE": "INSERT",
        "CREATEDBY": 5,
        "CREATEDON": new Date()
      }

    };

    var customerURL = 'updtcustomer';

    this._api.post(customerURL, customer).then((response) => {

      var lastID = parseInt(response.data.updtcustomerResult);
      this._master.refreshPromise().then((response) => {
        this._master.refresh(response);
        this.CUSTOMERNAME_option = this._master.getCustomers();
        this.selectedOption = _.find(this.CUSTOMERNAME_option, ['CUSTOMERID', lastID]);

        this.toaster.success('Customer ' + this.newCustomer.CUSTOMERNAME + ' added successfully');
      }, (error) => {
        this.toaster.error(`${error.status} : ${error.statusText}`);
      });

    }, (error) => {
      this.toaster.error(`${error.status} : ${error.statusText}`);
    });

    this.resetNewCustomer();
    $('#myModal').modal('hide');

  }

  addRfpHeader() {

    var rfpHeader = {
      "rfpupdt": {
        "RFPID": 0,
        "RFPCODE": this.overall.RFPCODE,
        //"RFPDATE": this.$filter('date')(new Date(this.overall.RFPDATE), 'yyyy-MM-dd 00:00:00'), //this.overall.RFPDATE,
        //"RFPDATE": this.$filter('date')(new Date(this.overall.RFPDATE), 'yyyy-MM-dd 00:00:00'),
        "RFPDATE": this.$filter('date')(new Date(this.selectedOppOption.OPPORTUNITYENTRY_DATE), 'yyyy-MM-dd 00:00:00'),
        //"CUSTOMERID": this.customer.CUSTOMERID,
        //"CUSTOMERID": this.selectedOption.CUSTOMERID,
        "CUSTOMERID": this.selectedCustOption.CUSTOMERID,
        "INDUSTRYTYPEID": this.overall.INDUSTRYTYPEID,
        //"RFPAMOUNT": this.overall.RFPAMOUNT,
        "RFPAMOUNT": this.selectedOppOption.EST_OPP_REVENUE,
        //"STARTDATE": "2016-01-01 00:00:00",
        "STARTDATE": this.$filter('date')(new Date(this.selectedOppOption.OPPORTUNITYENTRY_DATE), 'yyyy-MM-dd 00:00:00'),
        "RFPOWNER": this.overall.RFPOWNER,
        "CURRENTSTAGINGOWNER": this.overall.CURRENTSTAGINGOWNER,
        "DIESELRATE": this.overall.DIESELRATE,
        "AGEOFTRUCK": this.overall.AGEOFTRUCK,
        //"RFPDESC": this.overall.RFPDESC,
        "RFPDESC": this.selectedOppOption.OPP_DESC,
        //"DUEDATE": this.$filter('date')(new Date(this.overall.DUEDATE), 'yyyy-MM-dd 00:00:00'), //this.overall.DUEDATE,
        "DUEDATE": this.$filter('date')(new Date(this.selectedOppOption.ESTPROPOSALSUBMISSION_DATE), 'yyyy-MM-dd 00:00:00'),
        "PRODUCTDESC": this.overall.PRODUCTDESC,
        //"CASHOPPID": this.overall.CASHOPPID,
        "CASHOPPID": this.CASHOPPID,
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
        "CREATEDON": this.$filter('date')(new Date(this.overall.CREATEDON), 'yyyy-MM-dd 00:00:00'),
        //"ADDRESS": this.customer.ADDRESS,
        // "CONTACTPERSON": this.customer.CONTACTPERSON,
        // "CONTACTNO": this.customer.CONTACTNO,
        //"CASHACCOUNTID": this.customer.CASHACCOUNTID,
        //"TOTALSPEND": this.customer.TOTALSPEND,
        /*"ADDRESS": this.selectedOption.ADDRESS,
        "CONTACTPERSON": this.selectedOption.CONTACTPERSON,
        "CONTACTNO": this.selectedOption.CONTACTNO,
        "CASHACCOUNTID": this.selectedOption.CASHACCOUNTID,
        "TOTALSPEND": this.selectedOption.TOTALSPEND,*/
        "ADDRESS": this.selectedCustOption.ADDRESS,
        "CONTACTPERSON": this.selectedCustOption.CONTACTPERSON,
        "CONTACTNO": this.selectedCustOption.CONTACTNO,
        "CASHACCOUNTID": this.selectedCustOption.CASHACCOUNTID,
        "TOTALSPEND": this.selectedCustOption.TOTALSPEND,
        "PROXIDISTANCE": this.overall.PROXIDISTANCE
      }
    };

    var rfpHeaderURL = 'rfp/INSERT';
    //this.toaster.success('RFP details for ' + this.customer.CUSTOMERNAME + ' added successfully');

    this._api.post(rfpHeaderURL, rfpHeader).then((response) => {
      this.$state.go('lanes', {
        rfpid: response.data.rfpResult[0].RFPID,
        iswarehousing: this.overall.ISHUBORWHREQ
      });

    }, (error) => {
      //console.log(error);
      this.toaster.error(`${error.status} : ${error.statusText}`);
    });

  }

  selectedCasshAccount() {

    var casshAccID = this.CASHACCOUNTID;

    this._master.refreshPromise().then((response) => {
      this._master.refresh(response);
      this.CUSTOMERNAME_option = this._master.getCustomers();
      this.selectedOption = _.find(this.CUSTOMERNAME_option, ['CASHACCOUNTID', casshAccID]);
    }, (error) => {
      this.toaster.error(`${error.status} : ${error.statusText}`);
    });
  }

  selectedCasshOpp() {

    var casshOppID = this.CASHOPPID;

    this._master.refreshPromise().then((response) => {
      this._master.refresh(response);
      this.Opportunities_option = this._master.getOpportunities();
      this.Customers_option = this._master.getCustomers();

      this.selectedOppOption = _.find(this.Opportunities_option, ['OPP_ID', casshOppID]);
      if(this.selectedOppOption !=  undefined || this.selectedOppOption != null)
      {
        var casshAccID = this.selectedOppOption.ACC_ID;
        this.selectedCustOption = _.find(this.Customers_option, ['CASHACCOUNTID', casshAccID]);
      }
      else
      {

      }


    }, (error) => {
      this.toaster.error(`${error.status} : ${error.statusText}`);
    });
  }

}
