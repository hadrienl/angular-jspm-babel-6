'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _decoratorsModule = require('./decorators/decorators-module');

Object.defineProperty(exports, 'DecoratorsModule', {
  enumerable: true,
  get: function get() {
    return _decoratorsModule.DecoratorsModule;
  }
});

var _decoratorsAngular = require('./decorators/decorators-angular');

Object.keys(_decoratorsAngular).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _decoratorsAngular[key];
    }
  });
});

var _decoratorsRouter = require('./decorators/decorators-router');

Object.keys(_decoratorsRouter).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _decoratorsRouter[key];
    }
  });
});
//# sourceMappingURL=decorators.js.map
