import angular from 'angular';
import {appName} from './constants';

function AuthInterceptor ($window, $location, $q, $injector) {
  return {
    responseError: function (rejection) {
      let $state = $injector.get('$state');
      if (401 === rejection.status) {
        let hostV1 = $location.host().replace('.v2', ''),
          currentUrl = $state.href($state.next.name, $state.toParams);
        $window.location = `//${hostV1}/login?back=${currentUrl}&backv=2`;
      }

      return $q.reject(rejection);
    }
  };
}
AuthInterceptor.$inject = ['$window', '$location', '$q', '$injector'];

export let authInterceptorModule = angular.module(`${appName}.auth-interceptor`, [])
.factory('AuthInterceptor', AuthInterceptor);
