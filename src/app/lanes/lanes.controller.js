export class LanesController {
  constructor($state, $stateParams, $timeout, masterService, apiService) {
    'ngInject';
    this.routes = [];
    this.routes = [];
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.isServiceTypeODC = undefined;
    this.statename_option = [];
    this.isSERVICETYPE_option = [];
    this._api = apiService;
    this.$state = $state;
    this.locationname_option = [];
    this.vehicletype = {
      VEHICLETYPEID: null,
      VEHICLETYPENAME: null,
    };
    this.location = {
      LOCATIONID: null,
      LOATIONNAME: null,
    };
    this.iswarehousing = $stateParams.iswarehousing;
    this.iswarehousing === 'Y' ? this.iswarehousing = true : this.iswarehousing = false;
    this.getRPFRoutes();
    this.state = {
      STATEID: null,
      STATENAME: null,
      STATECODE: null,
    };
    this.locationname_option = masterService.getLocations();
    this.statename_option = masterService.getStates();
    this.vehicletypename_option = masterService.getVehicleTypes();
    this.isPACKAGETYPEID_option = this.prepareForDropdown(['', 'Pallet', 'Corrugated Boxes', 'Bags', 'Trolley', 'Loose']);
    this.isSERVICETYPE_option = this.prepareForDropdown(['FTL', 'ODC', 'Surface Exp', 'PTL Conventional', 'Fixed Vehicle', 'Air Express']);
    document.getElementsByClassName('tbody-div4')[0].addEventListener('scroll', (e) => {
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

  adjustScrollableTable() {
    const div1HeadWidth = _.map(document.querySelectorAll('.thead-div1 th'),
      (th) => (th.innerText.length * 10));
    const div3BodyWidth = _.map(document.querySelectorAll('.tbody-div3 tr')[0].getElementsByTagName('td'),
      (td) => (td.innerText.length * 7));
    const div2HeadWidth = _.map(document.querySelectorAll('.thead-div2 th'),
      (th) => (th.innerText.length * 10));
    const div4BodyWidth = _.map(document.querySelectorAll('.tbody-div4 tr')[0].getElementsByTagName('td'),
      (td) => (td.innerText.length * 7));
    const finalFrozenWidth = _.chain(div3BodyWidth)
      .map((item, i) => Math.max(item, div1HeadWidth[i]))
      .reject((item) => (_.isNaN(item)))
      .value();
    const finalWidth = _.chain(div4BodyWidth)
      .map((item, i) => Math.max(item, div2HeadWidth[i]))
      .reject((item) => (_.isNaN(item)))
      .value();
    const div1Head = document.querySelectorAll('.thead-div1 th');
    const div3Body = document.querySelectorAll('.tbody-div3 td');
    const div2Head = document.querySelectorAll('.thead-div2 th');
    const div4Body = document.querySelectorAll('.tbody-div4 td');
    _.each(finalFrozenWidth, (list, key) => {
      div1Head[key].children[0].style.width = `${finalFrozenWidth[key]}px`;
      div3Body[key].children[0].style.width = `${finalFrozenWidth[key]}px`;
    });
    _.each(finalWidth, (list, key) => {
      div2Head[key].children[0].style.width = `${finalWidth[key]}px`;
      div4Body[key].children[0].style.width = `${finalWidth[key]}px`;
    });
  }

  prepareForDropdown(list) {
    return _.map(list, (i) => ({
      name: i,
      val: i,
    }));
  }

  changePackageDimension() {
    this.isServiceTypeODC = this.route.SERVICETYPE === 'ODC';
  }

  resetRoute() {
    this.route = {
      ACTIVE: 'Y',
      APPROVEDAMOUNT: 0,
      AVERAGELOAD: 0,
      BACKHAUL: 0,
      CUSTTARGETRATE: 0,
      DISTANCE: 0,
      FREQUENCY: 0,
      FROMLOCATION: 0,
      FROMLOCATIONNAME: '',
      FROMSTATE: '',
      FROMSTATEID: 0,
      ISLOADUNLOADCHARG: 'N',
      ISROUNDTRIP: 'N',
      LOADINGUNLOADINGTIME: 0,
      LOCATIONNAME: '',
      MHEREQUIREMENT: 'NA',
      NOOFTRIPS: 0,
      OTHERREQUIREMENT: 'NA',
      PACKAGETYPEID: 1,
      PACKDIMENSION: 'NA',
      RFPDURATION: 0,
      RFPID: this.$stateParams.rfpid,
      RFPVOLUME: 0,
      SERVICETYPE: this.isSERVICETYPE_option[0].val,
      STACKINGNORMS: '',
      TOLOCATION: 0,
      TOLOCATIONNAME: '',
      TOSTATE: '',
      TOSTATEID: 0,
      VEHICLETYPEID: 0,
      VEHICLETYPENAME: '',
      MODE: 'INSERT',
      SEARCH1: '',
      SEARCH2: '',
      SEARCH3: '',
      DIRTY: false,
    };
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
    this.$timeout(this.adjustScrollableTable);
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
    this.$timeout(this.adjustScrollableTable);
    $('#myModal').modal('hide');
  }

  delete() {
    this.route.MODE = 'DELETE';
    this.routes[this.editingIndex] = this.route;
    this.editingIndex = null;
    this.$timeout(this.adjustScrollableTable);
    $('#myModal').modal('hide');
  }

  submitData() {
    const filterRoutes = _.chain(this.routes).filter(o => o.DIRTY)
      .map((route) => {
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
    const newfilterRoutes = {
      rfproute: filterRoutes,
    };
    this._api.post('routeupdate', newfilterRoutes).then(() => {
      this._api.get(`apiupdate/${this.$stateParams.rfpid}`).then(() => {
        this.$state.go('dashboard');
      }, (err) => {
        console.error(err);
      });
    }, (e) => {
      console.error(e);
    });
  }

  uploadBlobOrFile(blobOrFile) {
    const client = new XMLHttpRequest();
    client.open('POST', `http://59.160.18.222/RFPRoute/RFPImportRoute.svc/rfprouteupload/${this.$stateParams.rfpid}/Routeupload/1`, false);
    client.setRequestHeader('Content-Type', 'multipart/form-data');
    client.onreadystatechange = () => {
      if (client.readyState === 4 && client.status === 200) {
        this.getRPFRoutes();
        $('#myModalBrowse').modal('hide');
      }
    };
    client.send(blobOrFile);
  }

  map(id, list, idMatcher, nameKey) {
    if (_.isInteger(id) && list.length > 0) {
      return _.filter(list, (item) => (item[idMatcher] === id))[0][nameKey];
    }
    return '-';
  }

  showModal() {
    this.resetRoute();
    this.editingIndex = null;
    $('#myModal').modal();
  }
}
