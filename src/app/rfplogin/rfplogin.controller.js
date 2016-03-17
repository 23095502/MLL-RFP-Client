export class RFPLoginControler {
  constructor($state) {
    'ngInject';
  this.$state = $state;

  }
   NextPage(){
     this.$state.go("rfpdashboard");
  }
}
