'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _angular = require('angular');

var _angular2 = _interopRequireDefault(_angular);

var _config = require('./config/config');

var _main = require('./components/main/main');

var _decorators = require('./config/decorators');

var _constants = require('./config/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// App modules

console.log(_main.MainComponent);
// Core


var app = _angular2.default.module(_constants.appName, [_decorators.DecoratorsModule.name, _config.ConfigComponent.name, _main.MainComponent.name]);

_angular2.default.element(document).ready(function () {
  _angular2.default.bootstrap(document, [_constants.appName]);
});

exports.app = app;
//# sourceMappingURL=app.js.map
