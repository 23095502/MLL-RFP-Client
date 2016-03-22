export class LanesController {
  constructor($state, $stateParams, $timeout, masterService, apiService) {

    'ngInject';

    this.routes = [];
    this.routes = [];
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.isServiceTypeODC;
    this.statename_option = [];
    this.isSERVICETYPE_option = [];
    this._api = apiService;
    this.$state = $state;

    this.locationname_option = [];
    this.vehicletype = {
      "VEHICLETYPEID": null,
      "VEHICLETYPENAME": null
    };
    this.location = {
      "LOCATIONID": null,
      "LOCATIONNAME": null
    };

    this.iswarehousing = $stateParams.iswarehousing;
    (this.iswarehousing === 'Y') ? this.iswarehousing = true : this.iswarehousing = false;

    //===========================
    //Get all RFP routes by RFP ID
    this.getRPFRoutes();
    //===========================

    this.state = {
      "STATEID": null,
      "STATENAME": null,
      "STATECODE": null
    };

    this.locationname_option = masterService.getLocations();
    this.statename_option = masterService.getStates();
    this.vehicletypename_option = masterService.getVehicleTypes();
    this.isPACKAGETYPEID_option = this.prepareForDropdown(['', 'Pallet', 'Corrugated Boxes', 'Bags', 'Trolley', 'Loose']);
    this.isSERVICETYPE_option = this.prepareForDropdown(['FTL', 'ODC', 'Surface Exp', 'PTL Conventional', 'Fixed Vehicle', 'Air Express']);

    document.getElementsByClassName('tbody-div4')[0].addEventListener('scroll', function (e) {
      document.querySelector('.tbody-div3 table').style.top = `-${e.target.scrollTop}px`;
      document.querySelector('.thead-div2 table').style.left = `-${e.target.scrollLeft}px`;
    });

    this.resetRoute();
  }

  getRPFRoutes() {
    this._api.get(`getrfproutebyid/${this.$stateParams.rfpid}`).then((res) => {
      this.routes = res.data;
      this.$timeout(this.adjustScrollableTable);
    }, (err) => {
      console.error(err);
    });
  }

  init() {

  }

  adjustScrollableTable() {
    let div1HeadWidth = _.map(document.querySelectorAll('.thead-div1 th'), (th) => (th.innerText.length * 10));
    let div3BodyWidth = _.map(document.querySelectorAll('.tbody-div3 tr')[0].getElementsByTagName('td'), (td) => (td.innerText.length * 7));
    let div2HeadWidth = _.map(document.querySelectorAll('.thead-div2 th'), (th) => (th.innerText.length * 10));
    let div4BodyWidth = _.map(document.querySelectorAll('.tbody-div4 tr')[0].getElementsByTagName('td'), (td) => (td.innerText.length * 7));

    let finalFrozenWidth = _.chain(div3BodyWidth)
      .map((item, i) => Math.max(item, div1HeadWidth[i]))
      .reject((item) => (_.isNaN(item)))
      .value();

    let finalWidth = _.chain(div4BodyWidth)
      .map((item, i) => Math.max(item, div2HeadWidth[i]))
      .reject((item) => (_.isNaN(item)))
      .value();

    //Fix width for div1 (left head) & div3 (left body)
    let div1Head = document.querySelectorAll('.thead-div1 th');
    let div3Body = document.querySelectorAll('.tbody-div3 td');

    //Fix width for div2 (right head) & div4 (right body)
    let div2Head = document.querySelectorAll('.thead-div2 th');
    let div4Body = document.querySelectorAll('.tbody-div4 td');

    //-----------------------------
    _.each(finalFrozenWidth, (list, key) => {
      div1Head[key].children[0].style.width = finalFrozenWidth[key] + 'px';
      div3Body[key].children[0].style.width = finalFrozenWidth[key] + 'px';
    });

    _.each(finalWidth, (list, key) => {
      //console.log(div2Head[key].children[0]);
      div2Head[key].children[0].style.width = finalWidth[key] + 'px';
      div4Body[key].children[0].style.width = finalWidth[key] + 'px';
    });
    //-----------------------------
  }

  prepareForDropdown(list) {
    return _.map(list, (i) => ({
      name: i,
      val: i
    }));
  }

  changePackageDimension() {
    if (this.route.SERVICETYPE == 'ODC') {
      this.isServiceTypeODC = true;
    } else {
      this.isServiceTypeODC = false;
    }
  }

  resetRoute() {
    this.route = {
      "ACTIVE": 'Y',
      "APPROVEDAMOUNT": 0,
      "AVERAGELOAD": 0,
      "BACKHAUL": 0,
      "CUSTTARGETRATE": 0,
      "DISTANCE": 0,
      "FREQUENCY": 0,
      "FROMLOCATION": 0,
      "FROMLOCATIONNAME": '',
      "FROMSTATE": '',
      "FROMSTATEID": 0,
      "ISLOADUNLOADCHARG": 'N',
      "ISROUNDTRIP": 'N',
      "LOADINGUNLOADINGTIME": 0,
      "LOCATIONNAME": '',
      "MHEREQUIREMENT": 'NA',
      "NOOFTRIPS": 0,
      "OTHERREQUIREMENT": 'NA',
      "PACKAGETYPEID": 1,
      "PACKDIMENSION": 'NA',
      "RFPDURATION": 0,
      "RFPID": this.$stateParams.rfpid,
      "RFPVOLUME": 0,
      "SERVICETYPE": this.isSERVICETYPE_option[0].val,
      "STACKINGNORMS": '',
      "TOLOCATION": 0,
      "TOLOCATIONNAME": '',
      "TOSTATE": '',
      "TOSTATEID": 0,
      "VEHICLETYPEID": 0,
      "VEHICLETYPENAME": '',
      "MODE": 'INSERT',
      "SEARCH1": '',
      "SEARCH2": '',
      "SEARCH3": '',
      "DIRTY": false
    }
  }

  add() {
    this.route.DIRTY = true;
    this.route.ACTIVE = 'A';
    this.route.APPROVEDAMOUNT = 0;
    this.route.AVERAGELOAD = 'NA';
    this.route.BACKHAUL = 0;
    this.route.DISTANCE = 0;
    this.route.FREQUENCY = 'NA';
    this.route.ISLOADUNLOADCHARG = 'N';
    this.route.LOCATIONNAME = '';
    this.route.MHEREQUIREMENT = 'NA';
    this.route.PACKDIMENSION = 'NA';
    this.route.RFPID = this.$stateParams.rfpid;
    this.route.RFPVOLUME = 0;
    this.route.SEARCH1 = '';
    this.route.SEARCH2 = '';
    this.route.SEARCH3 = '';
    this.route.CREATEDBY = 1;
    this.route.CREATEDON = '2016-03-01';

    this.routes.push(angular.copy(this.route));
    this.resetRoute();
    this.editingIndex = null;

    //---------------------
    //set width to route grid columns
    this.$timeout(this.adjustScrollableTable);
    //---------------------
    $('#myModal').modal('hide');
  }

  edit(route, index) {
    this.route = angular.copy(route);
    this.route.DIRTY = true;
    this.route.SEARCH1 = '';
    this.route.SEARCH2 = '';
    this.route.SEARCH3 = '';
    this.route.MODE = 'INSERT';
    this.route.CREATEDBY = 1;
    this.route.CREATEDON = '2016-03-01';
    this.editingIndex = index;
    $('#myModal').modal();
  }

  save() {
    this.routes[this.editingIndex] = this.route;
    this.editingIndex = null;
    //---------------------
    //set width to route grid columns
    this.$timeout(this.adjustScrollableTable);
    //---------------------
    $('#myModal').modal('hide');
  }

  delete() {

    this.route.MODE = 'DELETE';
    this.routes[this.editingIndex] = this.route;
    this.editingIndex = null;
    //---------------------
    //set width to route grid columns
    this.$timeout(this.adjustScrollableTable);
    //---------------------
    $('#myModal').modal('hide');
  }

  submitData() {

    var filterRoutes = _.chain(this.routes).filter((o) => {
      return o.DIRTY;
    }).map((route) => {
      delete route.$$hashKey;
      delete route.DIRTY;
      delete route.FROMLOCATIONNAME;
      delete route.LOCATIONNAME;
      delete route.PACKAGETYPENAME;
      delete route.RESULT;
      delete route.TOLOCATIONNAME;
      delete route.FROMSTATE;
      delete route.TOSTATE;
      delete route.VEHICLETYPENAME;
      return route;
    }).value();

    var newfilterRoutes = {
      rfproute: filterRoutes
    };
    /*var req = {
     method: 'POST',
     url: 'http://115.113.135.239/RFPRest/RFPRestService.svc/routeupdate',
     headers: {
     'Content-Type': 'application/json'
     },
     data: newfilterRoutes
     };*/

    this._api.post('routeupdate', newfilterRoutes).then((r) => {
      this._api.get(`apiupdate/${this.$stateParams.rfpid}`).then((res) => {
        this.$state.go('dashboard');
      }, (err) => {
        console.error(err);
      });

    }, (e) => {
      console.error(e);
    });

  }

  uploadBlobOrFile(blobOrFile) {

    var client = new XMLHttpRequest();
    client.open('POST', `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/rfprouteupload/${this.$stateParams.rfpid}/Routeupload/1`, false);
    //client.open('POST', `http://localhost:52202/RFPImport/Service.svc/Upload/RFPUpload/${this.$stateParams.rfpid}`, false);
    //client.setRequestHeader('Content-length', blobOrFile.length);
    client.setRequestHeader("Content-Type", "multipart/form-data");

    /* Check the response status */
    client.onreadystatechange = () => {
      //console.log(document.readyState);
      console.log("rdystate: " + client.readyState + " status: " + client.status + " Text: " + client.statusText);
      if (client.readyState == 4 && client.status == 200) {
        console.log(client.responseText);
        //===========================
        //Get all RFP routes by RFP ID
        this.getRPFRoutes();
        //===========================
        $('#myModalBrowse').modal('hide');
      }
    }

    /* Send to server */
    client.send(blobOrFile);
  }

  /*  uploadFile(file) {

   this.Upload.upload({
   //url: `http://115.113.135.239/RFPRoute/RFPImportRoute.svc/rfprouteupload/${this.$stateParams.rfpid}/Routeupload/1`,
   url: `http://localhost:52202/RFPImport/Service.svc/Upload/RFPUpload/${this.$stateParams.rfpid}`,
   data: {},
   file: file
   }).then(function(resp) {
   console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
   }, function(resp) {
   console.log('Error status: ' + resp.status);
   }, function(evt) {
   var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
   console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
   });
   }*/

  map(id, list, idMatcher, nameKey) {
    if (_.isInteger(id) && list.length > 0) {
      return _.filter(list, (item) => (item[idMatcher] === id))[0][nameKey];
    } else {
      return '-';
    }
  }

  showModal() {

    this.resetRoute();
    this.editingIndex = null;
    $('#myModal').modal();

  }

}
