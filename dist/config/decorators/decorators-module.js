'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DecoratorsModule = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _angularUiRouter = require('angular-ui-router');

var _angularUiRouter2 = _interopRequireDefault(_angularUiRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DecoratorsModule = exports.DecoratorsModule = _angular2.default.module('decorators', [_angularUiRouter2.default]);

DecoratorsModule.run(function (_$injector_) {
  DecoratorsModule.$injector = _$injector_;
});
//# sourceMappingURL=decorators-module.js.map
