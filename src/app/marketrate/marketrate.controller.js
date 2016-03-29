export class MarketRateController {
  constructor($state, $stateParams, $timeout, Upload, masterService, apiService, toaster, $filter) {
    'ngInject';

    this.routes = [];
    this.$timeout = $timeout;
    this.$stateParams = $stateParams;
    this.statename_option = [];
    this._api = apiService;
    this.$state = $state;
    this.toaster = toaster;
    this.$filter = $filter;

    this.locationname_option = [];
    this.vehicletype = {
      "VEHICLETYPEID": null,
      "VEHICLETYPENAME": null
    };
    this.location = {
      "LOCATIONID": null,
      "LOCATIONNAME": null
    };

    this.state = {
      "STATEID": null,
      "STATENAME": null,
      "STATECODE": null
    };

    this.locationname_option = masterService.getLocations();
    this.statename_option = masterService.getStates();
    this.vehicletypename_option = masterService.getVehicleTypes();

      // document.getElementsByClassName('tbody-div4')[0].addEventListener('scroll', function(e) {
      // document.querySelector('.tbody-div3 table').style.top = `-${e.target.scrollTop}px`;
      // document.querySelector('.thead-div2 table').style.left = `-${e.target.scrollLeft}px`;
    // });

    this.add();
  }

  /*adjustScrollableTable() {

    var $div1HeadAll = document.querySelectorAll('.thead-div1 th');
    var $div2HeadAll = document.querySelectorAll('.thead-div2 th');
    var $div3BodyAll = document.querySelectorAll('.tbody-div3 tr');
    var $div4BodyAll = document.querySelectorAll('.tbody-div4 tr');

    if ($div3BodyAll.length > 0 && $div4BodyAll.length > 0) {

      let div1HeadWidth = _.map($div1HeadAll, (th) => (th.offsetWidth));
      let div3BodyWidth = _.map($div3BodyAll[0].getElementsByTagName('td'), (td) => (td.offsetWidth));
      let div2HeadWidth = _.map($div2HeadAll, (th) => (th.offsetWidth));
      let div4BodyWidth = _.map($div4BodyAll[0].getElementsByTagName('td'), (td) => (td.offsetWidth));

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
  }*/

  add() {
    this.marketrate = {
        "OriginCity": '',
        "OriginState": '',
        "DestinationCity": '',
        "DestinationState": '',
        "vehicletype": '',
        "Rate": 0,
        "Remarks" : '',
        "CREATEDBY": 1
    }

  }

  map(id, list, idMatcher, nameKey) {
    if (_.isInteger(id) && list.length > 0) {
      return _.filter(list, (item) => (item[idMatcher] === id))[0][nameKey];
    } else {
      return '-';
    }
  }

// for submit data ...
  addMarketRate() {
    var marketRateData = {
      "marketrate": {
        "OriginCity": this.marketrate.OriginCity,
        "OriginState": this.marketrate.OriginState,
        "DestinationCity": this.marketrate.DestinationCity,
        "DestinationState": this.marketrate.DestinationState,
        "VehicleType": this.marketrate.VehicleType,
        "Rate": this.marketrate.Rate,
        "Remarks" : '',
        "CreatedBy": 1
      }
    };

    //console.log('Hi');
    console.log(marketRateData);

    this._api.post('marketrate', marketRateData).then((response) => {
      // console.log(response);
      this.toaster.success('Market Rate saved successfully');
      this.add();
    }, (error) => {
      console.log(error);
      // this.toaster.error(`${error.status} : ${error.statusText}`);
    });
  }
}
