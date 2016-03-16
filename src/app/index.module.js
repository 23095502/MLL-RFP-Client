/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { GithubContributorService } from '../app/components/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/components/webDevTec/webDevTec.service';
import { NavbarDirective } from '../app/components/navbar/navbar.directive';
import { MalarkeyDirective } from '../app/components/malarkey/malarkey.directive';
import { RFPOverallController } from './rfpoverall/rfpoverall.controller';
import { RFPCustomerController } from './rfpcustomer/rfpcustomer.controller';
import { RFPDashboardController } from './rfpdashboard/rfpdashboard.controller';
import { RFPOutputController } from './rfpoutputdetails/rfpoutputdetails.controller';
import { RFPDetailsController } from './rfpdetails/rfpdetails.controller';

angular.module('mllRfpClient', ['ui.router', 'toastr', 'ngCsv'])
  .constant('malarkey', malarkey)
  .constant('moment', moment)
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .service('githubContributor', GithubContributorService)
  .service('webDevTec', WebDevTecService)
  .controller('RFPOverallController', RFPOverallController)
  .controller('RFPCustomerController', RFPCustomerController)
  .controller('RFPDashboardController', RFPDashboardController)
  .controller('RFPOutputController', RFPOutputController)
  .directive('acmeNavbar', NavbarDirective)
  .directive('acmeMalarkey', MalarkeyDirective)
  .controller('RFPDetailsController', RFPDetailsController);
