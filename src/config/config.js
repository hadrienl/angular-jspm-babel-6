import angular from 'angular';
import {appName} from './constants';

import {DecoratorsModule} from './decorators';
import {authInterceptorModule} from './auth-interceptor';

export let ConfigComponent = angular.module(`${appName}.config`, [
  DecoratorsModule.name,
  authInterceptorModule.name
])
.config($httpProvider => $httpProvider.interceptors.push('AuthInterceptor'));
