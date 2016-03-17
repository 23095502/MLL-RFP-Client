export class masterService {
  constructor(apiService) {
    'ngInject';

    this._master = {};
    this._api = apiService;
  }

  init() {

    if (_.isUndefined(sessionStorage.master)) {

      this._api.get('mstlist/RFPAPI').then((res) => {
        this._master = res.data[0];
        console.log(this._master);
        sessionStorage.master = JSON.stringify(this._master);
      }, (err) => {
        console.error(err);
      });

    } else {

      this._master = JSON.parse(sessionStorage.master);

    }

    console.log(this._master);

  }

  getCustomers() {
    return this._master.CustomerList;
  }

  getLocations() {
    return this._master.LocationList;
  }

  getPackageTypes() {
    return this._master.PackageTypeList;
  }

  getStates() {
    return this._master.StateList;
  }

  getVehicleTypes() {
    return this._master.VehicleTypeList;
  }

}
