import angular from 'angular';

// App modules
import {ConfigComponent} from './config/config';

import {MainComponent} from './components/main/main';

// Core
import {DecoratorsModule} from './config/decorators';
import {appName} from './config/constants';

var app = angular.module(appName, [
  DecoratorsModule.name,
  ConfigComponent.name,

  MainComponent.name
]);

angular.element(document).ready(function() {
  angular.bootstrap(document, [appName]);
});

export {app};
