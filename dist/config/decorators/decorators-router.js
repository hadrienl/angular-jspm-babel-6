'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.state = state;
exports.component = component;

var _decoratorsModule = require('./decorators-module');

var _decoratorsAngular = require('./decorators-angular');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Specify a state route
 * @state('app.foo', {
 *   url: '/foo',
 *   template: `<p>Hello World</p>`,
 *   templateUrl: 'url.html',
 *   resolve: {
 *     bar: (Service) => Service.getSomething()
 *   }
 * })
 * class MyController {
 *   constructor () {
 *     // this.bar is set \o/
 *   }
 *  }
 */
function state(stateName) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function decorate(Target) {
    var inject = Target.$inject || [];
    if (opts.resolve) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(opts.resolve)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var service = _step.value;

          inject.push(service);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    _decoratorsModule.DecoratorsModule.config(function ($stateProvider) {
      $stateProvider.state(stateName, {
        url: opts.url,
        template: opts.template,
        templateUrl: opts.templateUrl,
        resolve: opts.resolve,
        controller: [].concat(_toConsumableArray(inject), [function () {
          for (var _len = arguments.length, deps = Array(_len), _key = 0; _key < _len; _key++) {
            deps[_key] = arguments[_key];
          }

          var controller = new (Function.prototype.bind.apply(Target, [null].concat(deps)))();
          if (opts.resolve) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = Object.keys(opts.resolve)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _service = _step2.value;

                controller[_service] = deps[inject.indexOf(_service)];
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
          return controller;
        }]),
        controllerAs: 'ctrl'
      });
    });
  };
}

/**
 * Specify a component which would be displayed on a state route
 * @component('app.foo', {
 *  url: '/foo',
 *  resolve: {
 *    bar: () => 'bar'
 *  },
 *  templateUrl: 'path/to/foo.html',
 *  // template: '<p>{{ ctrl.bar }}</p>'
 *  scope: {
 *    bar: '='
 *  }
 * })
 * class MyDirective {
 *  link () {
 *    // this.bar === 'bar'
 *  }
 * }
 */
function component(stateName) {
  var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function decorate(Target) {
    var tag = classNameToDirective((0, _decoratorsAngular.getTargetName)(Target)),
        template = '<' + tag + insertResolves(opts.resolve) + '></' + tag + '>';

    state(stateName, {
      url: opts.url,
      template: template,
      resolve: opts.resolve
    })(function () {});

    if (opts.resolve) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.keys(opts.resolve)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var service = _step3.value;

          if (!opts.scope) {
            opts.scope = {};
          }
          if (!opts.scope[service]) {
            opts.scope[service] = '=';
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    (0, _decoratorsAngular.directive)(opts)(Target);
  };
}

function classNameToDirective(str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase();
}

function insertResolves(resolves) {
  var output = '';

  if (resolves) {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = Object.keys(resolves)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var key = _step4.value;

        output += ' ' + key + '="ctrl.' + key + '"';
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4.return) {
          _iterator4.return();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  }

  return output;
}
//# sourceMappingURL=decorators-router.js.map
