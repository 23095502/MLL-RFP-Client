export class RFPDetailsController {
  constructor($http, $stateParams, $timeout, Upload) {

    'ngInject';

    this.routes = [];
    this.routes = []
    this.resetRoute();
    this.$http = $http;
    this.$stateParams = $stateParams;
    this.Upload = Upload;
    this.isServiceTypeODC;
    this.statename_option = [];
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
    (this.iswarehousing === 'Y') ? this.iswarehousing = true: this.iswarehousing = false;

    //GET RFP DETAILS

    $http({
      method: 'GET',
      url: `http://59.160.18.222/RFPRest/RFPRestService.svc/getrfproutebyid/${$stateParams.rfpid}`
    }).then((res) => {

      this.routes = res.data;

      $timeout(function() {
        let div1HeadWidth = _.map(document.querySelectorAll('.thead-div1 th'), (th) => (th.offsetWidth));
        let div3BodyWidth = _.map(document.querySelectorAll('.tbody-div3 td'), (td) => (td.offsetWidth));

        let finalFrozenWidth = _.chain(div3BodyWidth)
          .map((item, i) => Math.max(item, div1HeadWidth[i]))
          .reject((item) => (_.isNaN(item)))
          .value();

        //Fix width for div1 (left head) & div3 (left body)
        let div1Head = document.querySelectorAll('.thead-div2 th');
        let div3Body = document.querySelectorAll('.tbody-div4 td');

        _.each(finalFrozenWidth, (list, key) => {
          div1Head[key].children[0].style.width = finalFrozenWidth[key] + 'px';
          div3Body[key].children[0].style.width = finalFrozenWidth[key] + 'px';
        });


        let div2HeadWidth = _.map(document.querySelectorAll('.thead-div2 th'), (th) => (th.offsetWidth));
        let div4BodyWidth = _.map(document.querySelectorAll('.tbody-div4 td'), (td) => (td.offsetWidth));
        let finalWidth = _.chain(div4BodyWidth)
          .map((item, i) => Math.max(item, div2HeadWidth[i]))
          .reject((item) => (_.isNaN(item)))
          .value();


        //Fix width for div2 (right head) & div4 (right body)
        let div2Head = document.querySelectorAll('.thead-div2 th');
        let div4Body = document.querySelectorAll('.tbody-div4 td');

        _.each(finalWidth, (list, key) => {
          div2Head[key].children[0].style.width = finalWidth[key] + 'px';
          div4Body[key].children[0].style.width = finalWidth[key] + 'px';
        });
      }, 500);

    }, (err) => {
      console.error(err);
    });
    //GET RFP DETAILS

    //GET LOCATIONS

    $http({
      method: 'GET',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/location/0'
    }).then((res) => {
      this.locationname_option = res.data;
    }, (err) => {
      console.error(err);
    });
    //GET LOCATIONS

    //GET STATES
    $http({
      method: 'GET',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/state/0'
    }).then((res) => {
      this.statename_option = res.data;
    }, (err) => {
      console.error(err);
    });

    this.state = {
      "STATEID": null,
      "STATENAME": null,
      "STATECODE": null
    };
    //GET STATES

    //GET VEHICLETYPE
    this.vehicletypename_option = [];
    $http({
      method: 'GET',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/vehicletypes/0'
    }).then((res) => {
      this.vehicletypename_option = res.data;
    }, (err) => {
      console.error(err);
    });
    //GET VEHICLETYPE

    //GET PACKAGINGTYPE
    this.isPACKAGETYPEID_option = _.map(['', 'Pallet', 'Corrugated Boxes', 'Bags', 'Trolley', 'Loose'], (i, d) => ({
      name: d,
      val: i
    }));

    //GET SERVICETYPE
    this.isSERVICETYPE_option = _.map(['FTL', 'ODC', 'Surface Exp', 'PTL Conventional', 'Fixed Vehicle', 'Air Express'], (i) => ({
      name: i,
      val: i
    }));
    //GET SERVICETYPE

    document.getElementsByClassName('tbody-div4')[0].addEventListener('scroll', function(e) {
      //console.log(e.target.scrollTop);
      // console.dir(document.querySelector('.tbody-div3 table'));
      document.querySelector('.tbody-div3 table').style.top = `-${e.target.scrollTop}px`;
      document.querySelector('.thead-div2 table').style.left = `-${e.target.scrollLeft}px`;
    });
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
      "BACKHAUL": null,
      "CUSTTARGETRATE": 0,
      "DISTANCE": 0,
      "FREQUENCY": 0,
      "FROMLOCATION": 0,
      "FROMLOCATIONNAME": '',
      "FROMSTATE": '',
      "FROMSTATEID": 0,
      "ISLOADUNLOADCHARG": 'Y',
      "ISROUNDTRIP": 'Y',
      "LOADINGUNLOADINGTIME": 0,
      "LOCATIONNAME": '',
      "MHEREQUIREMENT": 'NA',
      "NOOFTRIPS": 0,
      "OTHERREQUIREMENT": 'NA',
      "PACKAGETYPEID": this.isPACKAGETYPEID_option[0].val,
      "PACKDIMENSION": 'NA',
      "RFPDURATION": 0,
      "RFPID": 1,
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
    this.route.RFPID = 0;
    this.route.RFPVOLUME = 0;
    this.route.SEARCH1 = '';
    this.route.SEARCH2 = '';
    this.route.SEARCH3 = '';
    this.route.CREATEDBY = 1;
    this.route.CREATEDON = '2016-03-01';

    this.routes.push(angular.copy(this.route));
    this.resetRoute();
    this.editingIndex = null;
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
  }

  delete() {

    this.route.MODE = 'DELETE';
    this.routes[this.editingIndex] = this.route;
    this.editingIndex = null;
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


    var newfilterRoutes = '{"rfproute":' + JSON.stringify(filterRoutes) + '}';

    var req = {
      method: 'POST',
      url: 'http://59.160.18.222/RFPRest/RFPRestService.svc/routeupdate',
      headers: {
        'Content-Type': 'application/json'
      },

      data: newfilterRoutes
    }

    this.$http(req).then(function(r) {
      //console.log(r);
      alert('Data Saved SUccessfully...');
    }, function(e) {
      console.error(e);
    });

  }

  uploadFile(file) {

    this.Upload.upload({
      url: `http://59.160.18.222/RFPRoute/RFPImportRoute.svc/rfprouteupload/1/Routeupload/1`,
      data: {
        file: file
      }
    }).then(function(resp) {
      console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
    }, function(resp) {
      console.log('Error status: ' + resp.status);
    }, function(evt) {
      var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    });
  }

  map(id, list, idMatcher, nameKey) {
    if (_.isInteger(id) && list.length > 0) {
      return _.filter(list, (item) => (item[idMatcher] === id))[0][nameKey];
    } else {
      return '-';
    }
  }

}
