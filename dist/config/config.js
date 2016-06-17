'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigComponent = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _constants = require('./constants');

var _decorators = require('./decorators');

var _authInterceptor = require('./auth-interceptor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConfigComponent = exports.ConfigComponent = _angular2.default.module(_constants.appName + '.config', [_decorators.DecoratorsModule.name, _authInterceptor.authInterceptorModule.name]).config(function ($httpProvider) {
  return $httpProvider.interceptors.push('AuthInterceptor');
});
//# sourceMappingURL=config.js.map
