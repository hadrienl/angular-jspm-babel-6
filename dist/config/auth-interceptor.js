'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authInterceptorModule = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AuthInterceptor($window, $location, $q, $injector) {
  return {
    responseError: function responseError(rejection) {
      var $state = $injector.get('$state');
      if (401 === rejection.status) {
        var hostV1 = $location.host().replace('.v2', ''),
            currentUrl = $state.href($state.next.name, $state.toParams);
        $window.location = '//' + hostV1 + '/login?back=' + currentUrl + '&backv=2';
      }

      return $q.reject(rejection);
    }
  };
}
AuthInterceptor.$inject = ['$window', '$location', '$q', '$injector'];

var authInterceptorModule = exports.authInterceptorModule = _angular2.default.module(_constants.appName + '.auth-interceptor', []).factory('AuthInterceptor', AuthInterceptor);
//# sourceMappingURL=auth-interceptor.js.map
