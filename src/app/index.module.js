/* global malarkey:false, moment:false */

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { OverallController } from './overall/overall.controller';
import { CustomerController } from './customer/customer.controller';
import { LoginController } from './login/login.controller';
import { DashboardController } from './dashboard/dashboard.controller';
import { OutputController } from './output/output.controller';
import { LanesController } from './lanes/lanes.controller';
import { apiService } from '../app/components/api/api.service';
import { masterService } from '../app/components/master/master.service';


angular.module('mllRfpClient', ['ui.router', 'ngFileUpload','toaster'])
  .config(config)
  .config(routerConfig)
  .run(runBlock)
  .controller('OverallController', OverallController)
  .controller('CustomerController', CustomerController)
  .controller('LoginController', LoginController)
  .controller('DashboardController', DashboardController)
  .controller('OutputController', OutputController)
  .controller('LanesController', LanesController)
  .service('apiService', apiService)
  .service('masterService', masterService);
