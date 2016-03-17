/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { RFPOverallController } from './rfpoverall/rfpoverall.controller';
import { RFPCustomerController } from './rfpcustomer/rfpcustomer.controller';
import { LoginController } from './login/login.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { RFPOutputController } from './rfpoutputdetails/rfpoutputdetails.controller';
import { RFPDetailsController } from './rfpdetails/rfpdetails.controller';
import { apiService } from '../app/components/api/api.service';
import { masterService } from '../app/components/master/master.service';


angular.module('mllRfpClient', ['ui.router', 'ngFileUpload'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('RFPOverallController', RFPOverallController)
  .controller('RFPCustomerController', RFPCustomerController)
  .controller('LoginController', LoginController)
  .controller('DashboardController', DashboardController)
  .controller('RFPOutputController', RFPOutputController)
  .controller('RFPDetailsController', RFPDetailsController)
  .service('apiService', apiService)
  .service('masterService', masterService);
