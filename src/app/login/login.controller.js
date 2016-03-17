export class LoginController {
  constructor($state) {
    'ngInject';
    this.$state = $state;
  }

  gotoDashboard() {
    this.$state.go('dashboard');
  }
}
