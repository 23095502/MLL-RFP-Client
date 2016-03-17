/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { RFPOverallController } from './rfpoverall/rfpoverall.controller';
import { RFPCustomerController } from './rfpcustomer/rfpcustomer.controller';
import { RFPLoginControler } from './rfplogin/rfplogin.controller';
import { RFPDashboardController } from './rfpdashboard/rfpdashboard.controller';
import { RFPOutputController } from './rfpoutputdetails/rfpoutputdetails.controller';
import { RFPDetailsController } from './rfpdetails/rfpdetails.controller';
import { apiService } from '../app/components/api/api.service';


angular.module('mllRfpClient', ['ui.router', 'ngFileUpload'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('RFPOverallController', RFPOverallController)
  .controller('RFPCustomerController', RFPCustomerController)
  .controller('RFPLoginControler', RFPLoginControler)
  .controller('RFPDashboardController', RFPDashboardController)
  .controller('RFPOutputController', RFPOutputController)
  .controller('RFPDetailsController', RFPDetailsController)
  .service('apiService', apiService);
